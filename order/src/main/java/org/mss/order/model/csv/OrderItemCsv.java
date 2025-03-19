package org.mss.order.model.csv;

import org.mss.commonlibrary.csv.BaseCsv;
import org.mss.commonlibrary.csv.anotation.CsvColumn;
import org.mss.commonlibrary.csv.anotation.CsvName;
import org.mss.order.model.enumeration.DeliveryStatus;
import org.mss.order.model.enumeration.OrderStatus;
import org.mss.order.model.enumeration.PaymentStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@CsvName(fileName = "Orders")
@SuperBuilder
@Getter
@Setter
public class OrderItemCsv extends BaseCsv {

    @CsvColumn(columnName = "Order status")
    private OrderStatus orderStatus;

    @CsvColumn(columnName = "Payment status")
    private PaymentStatus paymentStatus;

    @CsvColumn(columnName = "Email")
    private String email;

    @CsvColumn(columnName = "Phone")
    private String phone;

    @CsvColumn(columnName = "Order total")
    private BigDecimal totalPrice;

    @CsvColumn(columnName = "Shipping status")
    private DeliveryStatus deliveryStatus;

    @CsvColumn(columnName = "Created on")
    private ZonedDateTime createdOn;
}