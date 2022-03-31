create database nearme;
use nearme;

create table user_role
(
    UserEntity_id int          not null,
    roles         varchar(255) null
        );

create table password_reset_token
(
    id            bigint auto_increment
        primary key,
    expiryDate    datetime     null,
    token         varchar(255) null,
    used          bit          null,
    userEntity_id int          null
);
create table jwt_blacklist
(
    id    bigint auto_increment
        primary key,
    token varchar(255) null
);

create table nm_category
(
    id_category      int unsigned auto_increment
        primary key,
    id_parent        int unsigned                      null,
    active           tinyint(1) unsigned default 0 not null,
    root_category    tinyint(1)          default 0 not null,
    id_sub_category  int        unsigned           null,
    filters     varchar(255)                  null


);


create index FK4yy3pbo33kybjku4xdo30glsq
    on user_role (UserEntity_id);



create table nm_user
(
    id                int unsigned auto_increment
    primary key,
    username                      varchar(255)                                    not null,
    name                          varchar(255)                                    null,
    surname                       varchar(255)                                    null,
    status                          int                                           null,
    password                      varchar(255)                                    not null,
    loginAttempts                 int                                       not null,
    last_passwd_gen               timestamp           default current_timestamp() not null,

    constraint UN_1hjno5hn3oij6ki3vb
        unique (username)
);



create table nm_customer
(
     id_customer                int unsigned auto_increment
        primary key,
    id                 int unsigned,
    name                       varchar(25)                                    not null,
    firstname                  varchar(25)                                    not null,
    lastname                   varchar(25)                                    not null,
    telf                       int(25)                                    not null,
    id_gender                  smallint unsigned                               not null,
    newsletter                 tinyint(1) unsigned default 0                   not null,
    newsletter_date_add        datetime                                        null,
    active                     tinyint(1) unsigned default 0                   not null,
    date_add                   datetime            default current_timestamp() not null,

    CONSTRAINT FK_ID_customer_account FOREIGN KEY (id) REFERENCES nm_user(id)
);


create table nm_supplier
(
    id_supplier                int unsigned auto_increment
        primary key,
    id                 int unsigned,
    contact_mails              varchar(255)                                    not null,
    passwd                     varchar(255)                                    not null,
    last_passwd_gen            timestamp           default current_timestamp() not null,
    active                     tinyint(1) unsigned default 0                   not null,
    date_add                   datetime            default current_timestamp() not null,

    CONSTRAINT FK_ID_SUPPLIER_ACCOUNT FOREIGN KEY (id) REFERENCES nm_user(id)

);


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

create table nm_specific_price
(

    id_specific_price      int unsigned auto_increment
        primary key,
    id_product             int unsigned,
    id_shop                int(11) unsigned default 1    not null,
    id_country             int unsigned                  not null,
    id_customer            int unsigned                  not null,
    price                  decimal(20, 6)                not null,
    from_quantity          mediumint unsigned            not null,
    reduction              decimal(20, 6)                not null,
    reduction_tax          tinyint(1)       default 1    not null,
    start                  datetime                       not null,
    end                    datetime                       not null,

CONSTRAINT FK_ID_specific_price_Product02 FOREIGN KEY (id_product) REFERENCES nm_product(id_product)
);


create table nm_order_detail
(
    id_order                      int unsigned auto_increment
        primary key,
    id_customer                   int unsigned                         not null,
    id_supplier                   int unsigned                         not null,
    id_product                    int unsigned                         not null,
    product_attribute_id          int unsigned                         null,
    id_customization              int unsigned        default 0        null,
    product_name                  varchar(255)                         not null,
    product_quantity              int unsigned        default 0        not null,
    product_price                 decimal(20, 6)      default 0.000000 not null,
    reduction_percent             decimal(10, 2)      default 0.00     not null,
    reduction_amount              decimal(20, 6)      default 0.000000 not null,
    reduction_amount_tax_incl     decimal(20, 6)      default 0.000000 not null,
    reduction_amount_tax_excl     decimal(20, 6)      default 0.000000 not null,
    product_quantity_discount     decimal(20, 6)      default 0.000000 not null,
    product_reference             varchar(64)                          null,
    product_supplier_reference    varchar(64)                          null,
    product_weight                decimal(20, 6)                       not null,
    discount_quantity_applied     tinyint(1)          default 0        not null,
    total_price_tax_incl          decimal(20, 6)      default 0.000000 not null,
    total_price_tax_excl          decimal(20, 6)      default 0.000000 not null,
    unit_price_tax_incl           decimal(20, 6)      default 0.000000 not null,
    unit_price_tax_excl           decimal(20, 6)      default 0.000000 not null,
    total_shipping_price_tax_incl decimal(20, 6)      default 0.000000 not null,
    total_shipping_price_tax_excl decimal(20, 6)      default 0.000000 not null,
    original_product_price        decimal(20, 6)      default 0.000000 not null,
    date_add                      datetime            default current_timestamp() not null,

    CONSTRAINT FK_SUPPLIER_ID FOREIGN KEY (id_supplier) REFERENCES nm_supplier(id_supplier),
    CONSTRAINT FK_PRODUCT_ID  FOREIGN KEY (id_product) REFERENCES nm_product(id_product),
    CONSTRAINT FK_PRODUCT_category  FOREIGN KEY (product_attribute_id) REFERENCES nm_product(id_category)
);

create index order_detail_order
    on nm_order_detail (id_order);

create index product_attribute_id
    on nm_order_detail (product_attribute_id);

create index product_id
    on nm_order_detail (id_product, product_attribute_id);


create table ps_order_history
(
    id_order_history int unsigned auto_increment
        primary key,
    id_order                      int unsigned not null,
    id_order_state                int unsigned not null,
    date_add                      datetime     default current_timestamp() not null,
    id_customer                   int unsigned                             not null,
    id_supplier                   int unsigned                             not null,
    id_product                    int unsigned                             not null,

    CONSTRAINT FK_SUPPLIER_H FOREIGN KEY (id_customer) REFERENCES nm_user(id),
    CONSTRAINT FK_CUSTOMER_H FOREIGN KEY (id_supplier) REFERENCES nm_supplier(id_supplier),
    CONSTRAINT FK_PRODUCT_H  FOREIGN KEY (id_product) REFERENCES nm_product(id_supplier),
    CONSTRAINT FK_ORDER_H  FOREIGN KEY (id_order) REFERENCES nm_order_detail(id_order)
);


create index id_employee
    on ps_order_history (id_customer);


create index id_order_state
    on ps_order_history (id_order_state);

create index order_history_order
    on ps_order_history (id_order);

