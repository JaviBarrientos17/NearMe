create table nm_account
(
    id_account      int unsigned auto_increment
        primary key,
    email           varchar(255)                          not null,
    passwd          varchar(255)                          not null,
    last_passwd_gen timestamp default current_timestamp() not null,
    user_type       tinyint   default -1                  not null
);

create index customer_email
    on nm_account (email);

create table nm_customer
(
    id_customer         int unsigned auto_increment
        primary key,
    id_account          int unsigned                                    null,
    name                varchar(25)                                     not null,
    firstname           varchar(25)                                     not null,
    lastname            varchar(25)                                     not null,
    telf                int(25)                                         not null,
    id_gender           smallint unsigned                               not null,
    newsletter          tinyint(1) unsigned default 0                   not null,
    newsletter_date_add datetime                                        null,
    active              tinyint(1) unsigned default 0                   not null,
    date_add            datetime            default current_timestamp() not null,
    constraint FK_ID_customer_account
        foreign key (id_account) references nm_account (id_account)
);

create table nm_fixfeature
(
    id_fix_feature int unsigned auto_increment
        primary key,
    id_attribute   int unsigned not null,
    type           varchar(255) null,
    style          varchar(255) null
);

create table nm_category
(
    id_category      int unsigned auto_increment
        primary key,
    id_parent        int unsigned                  not null,
    active           tinyint(1) unsigned default 0 not null,
    is_root_category tinyint(1)          default 0 not null,
    category_color   varchar(255)                  not null,
    id_fix_feature   int unsigned                  null,
    constraint FK_ID_Category_Fix_Features
        foreign key (id_fix_feature) references nm_fixfeature (id_fix_feature)
);

create index category_parent
    on nm_category (id_parent);

create table nm_supplier
(
    id_supplier     int unsigned auto_increment
        primary key,
    id_account      int unsigned                                    null,
    contact_mails   varchar(255)                                    not null,
    passwd          varchar(255)                                    not null,
    last_passwd_gen timestamp           default current_timestamp() not null,
    active          tinyint(1) unsigned default 0                   not null,
    date_add        datetime            default current_timestamp() not null,
    constraint FK_ID_SUPPLIER_ACCOUNT
        foreign key (id_account) references nm_account (id_account)
);

create table nm_product
(
    id_product                int unsigned auto_increment
        primary key,
    id_supplier               int unsigned                                    null,
    id_category               int unsigned        default 0                   not null,
    id_shop_default           int unsigned                                    null,
    on_sale                   tinyint(1) unsigned default 0                   not null,
    isbn                      varchar(32)                                     null,
    quantity                  smallint            default 0                   not null,
    minimal_quantity          int unsigned        default 1                   not null,
    low_stock_alert           tinyint(1)          default 0                   not null,
    price_showPrice           decimal(20, 6)      default 0.000000            not null,
    commission                decimal(20, 6)      default 0.000000            not null,
    tax                       decimal(20, 6)      default 0.000000            not null,
    additional_shipping_cost  decimal(20, 2)      default 0.00                not null,
    reference                 varchar(64)                                     null,
    supplier_reference        varchar(64)                                     null,
    location                  varchar(64)                                     null,
    width                     decimal(20, 6)      default 0.000000            not null,
    height                    decimal(20, 6)      default 0.000000            not null,
    depth                     decimal(20, 6)      default 0.000000            not null,
    weight                    decimal(20, 6)      default 0.000000            not null,
    active                    tinyint(1) unsigned default 0                   not null,
    available_date            date                                            null,
    show_price                tinyint(1)          default 1                   not null,
    date_add                  datetime                                        not null,
    origin_country            varchar(200)                                    null,
    product_order             int(155)                                        not null,
    product_nutritional_facts varchar(10000)                                  not null,
    firts_upload              timestamp           default current_timestamp() not null,
    meta_keywords             varchar(255)                                    null,
    constraint FK_ID_CATEGORY_PRODUCT
        foreign key (id_category) references nm_category (id_category),
    constraint FK_ID_Product_SUPPLOIER
        foreign key (id_supplier) references nm_supplier (id_supplier)
);

create table nm_order_detail
(
    id_order                      int unsigned auto_increment
        primary key,
    id_customer                   int unsigned                               not null,
    id_supplier                   int unsigned                               not null,
    id_product                    int unsigned                               not null,
    product_attribute_id          int unsigned                               null,
    id_customization              int unsigned   default 0                   null,
    product_name                  varchar(255)                               not null,
    product_quantity              int unsigned   default 0                   not null,
    product_price                 decimal(20, 6) default 0.000000            not null,
    reduction_percent             decimal(10, 2) default 0.00                not null,
    reduction_amount              decimal(20, 6) default 0.000000            not null,
    reduction_amount_tax_incl     decimal(20, 6) default 0.000000            not null,
    reduction_amount_tax_excl     decimal(20, 6) default 0.000000            not null,
    product_quantity_discount     decimal(20, 6) default 0.000000            not null,
    product_reference             varchar(64)                                null,
    product_supplier_reference    varchar(64)                                null,
    product_weight                decimal(20, 6)                             not null,
    discount_quantity_applied     tinyint(1)     default 0                   not null,
    total_price_tax_incl          decimal(20, 6) default 0.000000            not null,
    total_price_tax_excl          decimal(20, 6) default 0.000000            not null,
    unit_price_tax_incl           decimal(20, 6) default 0.000000            not null,
    unit_price_tax_excl           decimal(20, 6) default 0.000000            not null,
    total_shipping_price_tax_incl decimal(20, 6) default 0.000000            not null,
    total_shipping_price_tax_excl decimal(20, 6) default 0.000000            not null,
    original_product_price        decimal(20, 6) default 0.000000            not null,
    date_add                      datetime       default current_timestamp() not null,
    constraint FK_PRODUCT_ID
        foreign key (id_product) references nm_product (id_product),
    constraint FK_PRODUCT_category
        foreign key (product_attribute_id) references nm_product (id_category),
    constraint FK_SUPPLIER_ID
        foreign key (id_supplier) references nm_supplier (id_supplier)
);

create index order_detail_order
    on nm_order_detail (id_order);

create index product_attribute_id
    on nm_order_detail (product_attribute_id);

create index product_id
    on nm_order_detail (id_product, product_attribute_id);

create table nm_specific_price
(
    id_specific_price int unsigned auto_increment
        primary key,
    id_product        int unsigned               null,
    id_shop           int(11) unsigned default 1 not null,
    id_country        int unsigned               not null,
    id_customer       int unsigned               not null,
    price             decimal(20, 6)             not null,
    from_quantity     mediumint unsigned         not null,
    reduction         decimal(20, 6)             not null,
    reduction_tax     tinyint(1)       default 1 not null,
    start             datetime                   not null,
    end               datetime                   not null,
    constraint FK_ID_specific_price_Product02
        foreign key (id_product) references nm_product (id_product)
);

create table ps_order_history
(
    id_order_history int unsigned auto_increment
        primary key,
    id_order         int unsigned                         not null,
    id_order_state   int unsigned                         not null,
    date_add         datetime default current_timestamp() not null,
    id_customer      int unsigned                         not null,
    id_supplier      int unsigned                         not null,
    id_product       int unsigned                         not null,
    constraint FK_CUSTOMER_H
        foreign key (id_supplier) references nm_supplier (id_supplier),
    constraint FK_ORDER_H
        foreign key (id_order) references nm_order_detail (id_order),
    constraint FK_PRODUCT_H
        foreign key (id_product) references nm_product (id_supplier),
    constraint FK_SUPPLIER_H
        foreign key (id_customer) references nm_customer (id_customer)
)
    charset = utf8;

create index id_employee
    on ps_order_history (id_customer);

create index id_order_state
    on ps_order_history (id_order_state);

create index order_history_order
    on ps_order_history (id_order);


