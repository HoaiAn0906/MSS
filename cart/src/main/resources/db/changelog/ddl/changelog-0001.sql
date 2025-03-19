--liquibase formatted sql

--changeset hoaian:init-cart
create sequence cart_item_seq start with 1 increment by 50;
CREATE TABLE cart_item
(
    customer_id      VARCHAR(255) NOT NULL,
    product_id       BIGINT       NOT NULL,
    quantity         INTEGER      NOT NULL,
    created_by       VARCHAR(255),
    created_on       TIMESTAMP(6),
    last_modified_by VARCHAR(255),
    last_modified_on TIMESTAMP(6),
    CONSTRAINT pk_cart_item PRIMARY KEY (customer_id, product_id)
);