package org.mss.order.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.mss.order.model.enumeration.OrderStatus;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private ZonedDateTime createdFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private ZonedDateTime createdTo;

    @JsonProperty
    private String warehouse;

    @JsonProperty
    private String productName;

    @JsonProperty
    private List<OrderStatus> orderStatus;

    @JsonProperty
    private String billingPhoneNumber;

    @JsonProperty
    private String email;

    @JsonProperty
    private String billingCountry;

    @JsonProperty
    private int pageNo;

    @JsonProperty
    private int pageSize;
}
