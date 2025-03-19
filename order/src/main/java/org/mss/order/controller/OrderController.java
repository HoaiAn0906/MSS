package org.mss.order.controller;

import org.mss.commonlibrary.csv.CsvExporter;
import org.mss.order.model.csv.OrderItemCsv;
import org.mss.order.model.enumeration.OrderStatus;
import org.mss.order.model.request.OrderRequest;
import org.mss.order.service.OrderService;
import org.mss.order.viewmodel.order.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/storefront/orders")
    public ResponseEntity<OrderVm> createOrder(@Valid @RequestBody OrderPostVm orderPostVm) {
        OrderVm orderVm = orderService.createOrder(orderPostVm);
        return ResponseEntity.ok(orderVm);
    }

    @PutMapping("/storefront/orders/status")
    public ResponseEntity<PaymentOrderStatusVm> updateOrderPaymentStatus(
        @Valid @RequestBody PaymentOrderStatusVm paymentOrderStatusVm
    ) {
        PaymentOrderStatusVm orderStatusVm = orderService.updateOrderPaymentStatus(paymentOrderStatusVm);
        return ResponseEntity.ok(orderStatusVm);
    }

    @GetMapping("/storefront/orders/completed")
    public ResponseEntity<OrderExistsByProductAndUserGetVm> checkOrderExistsByProductIdAndUserIdWithStatus(
            @RequestParam Long productId) {
        return ResponseEntity.ok(orderService.isOrderCompletedWithUserIdAndProductId(productId));
    }

    @GetMapping("/storefront/orders/my-orders")
    public ResponseEntity<List<OrderGetVm>> getMyOrders(@RequestParam String productName,
                                                        @RequestParam(required = false) OrderStatus orderStatus) {
        return ResponseEntity.ok(orderService.getMyOrders(productName, orderStatus));
    }

    @GetMapping("/backoffice/orders/{id}")
    public ResponseEntity<OrderVm> getOrderWithItemsById(@PathVariable long id) {
        return ResponseEntity.ok(orderService.getOrderWithItemsById(id));
    }

    @GetMapping("/storefront/orders/checkout/{id}")
    public ResponseEntity<OrderGetVm> getOrderWithCheckoutId(@PathVariable String id) {
        return ResponseEntity.ok(orderService.findOrderVmByCheckoutId(id));
    }

    @GetMapping("/backoffice/orders")
    public ResponseEntity<OrderListVm> getOrders(
            @RequestParam(value = "createdFrom", defaultValue = "#{new java.util.Date(1970-01-01)}", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) ZonedDateTime createdFrom,
            @RequestParam(value = "createdTo", defaultValue = "#{new java.util.Date()}", required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) ZonedDateTime createdTo,
            @RequestParam(value = "productName", defaultValue = "", required = false) String productName,
            @RequestParam(value = "orderStatus", defaultValue = "", required = false) List<OrderStatus> orderStatus,
            @RequestParam(value = "billingPhoneNumber", defaultValue = "", required = false) String billingPhoneNumber,
            @RequestParam(value = "email", defaultValue = "", required = false) String email,
            @RequestParam(value = "billingCountry", defaultValue = "", required = false) String billingCountry,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize
    ) {

        return ResponseEntity.ok(orderService.getAllOrder(
                Pair.of(createdFrom, createdTo),
                productName,
                orderStatus,
                Pair.of(billingCountry, billingPhoneNumber),
                email,
                Pair.of(pageNo, pageSize))
        );
    }

    @GetMapping("/backoffice/orders/latest/{count}")
    public ResponseEntity<List<OrderBriefVm>> getLatestOrders(@PathVariable int count) {
        return ResponseEntity.ok(orderService.getLatestOrders(count));
    }

    @PostMapping("/backoffice/orders/csv")
    public ResponseEntity<byte[]> exportCsv(@RequestBody OrderRequest orderRequest) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=" + CsvExporter.createFileName(OrderItemCsv.class));
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        var csvBytes = orderService.exportCsv(orderRequest);
        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
    }
}
