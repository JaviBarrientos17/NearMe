create table nm_product
(
    id_product                int unsigned auto_increment
        primary key,
    id_supplier               int unsigned                                                                                    null,
    id_category               int unsigned                                                                   default 0        not null,
    id_subcategory            int unsigned                                                                   default 0        null,
    quantity                  smallint                                                                       default 0        not null,
    price                     decimal(10, 3)                                                                 default 0.000000 not null,
    reference                 varchar(64)                                                                                     null,
    active                    tinyint(1) unsigned                                                            default 0        not null,
    show_price                tinyint(1)                                                                     default 1        not null,
    product_order             int(155)                                                                                        not null,
    date_add                  timestamp                                                           default current_timestamp() not null,
    img_urld                  varchar(255)                                                                                    not null,


    CONSTRAINT FK_ID_Product_SUPPLOIER FOREIGN KEY (id_supplier) REFERENCES nm_supplier(id_supplier),
    CONSTRAINT FK_ID_CATEGORY_PRODUCT FOREIGN KEY (id_category) REFERENCES nm_category(id_category)
);
