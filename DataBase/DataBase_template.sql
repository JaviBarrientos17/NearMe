create database nearme;
use nearme;

create table nm_fixFeature
(
    id_fix_feature    int unsigned auto_increment
        primary key,
    id_attribute     int unsigned not null,
    type             varchar(255) null,
    style            varchar(255) null

);
create table nm_category
(

    id_category      int unsigned auto_increment
        primary key,
    id_parent        int unsigned                  not null,
    active           tinyint(1) unsigned default 0 not null,
    is_root_category tinyint(1)          default 0 not null,
    category_color   varchar(255)                  not null,
    id_fix_feature   int unsigned,

CONSTRAINT FK_ID_Category_Fix_Features FOREIGN KEY (id_fix_feature) REFERENCES nm_fixFeature(id_fix_feature)
);

create index category_parent
    on nm_category (id_parent);


create table nm_account
(
    id_account                int unsigned auto_increment
        primary key,
    email                      varchar(255)                                    not null,
    passwd                     varchar(255)                                    not null,
    last_passwd_gen            timestamp           default current_timestamp() not null,
    user_type                  tinyint             default -1                  not null
);

create index customer_email
    on nm_account (email);

create table nm_customer
(
     id_customer                int unsigned auto_increment
        primary key,
    id_account                 int unsigned,
    name                       varchar(25)                                    not null,
    firstname                  varchar(25)                                    not null,
    lastname                   varchar(25)                                    not null,
    telf                       int(25)                                    not null,
    id_gender                  smallint unsigned                               not null,
    newsletter                 tinyint(1) unsigned default 0                   not null,
    newsletter_date_add        datetime                                        null,
    active                     tinyint(1) unsigned default 0                   not null,
    date_add                   datetime            default current_timestamp() not null,

    CONSTRAINT FK_ID_customer_account FOREIGN KEY (id_account) REFERENCES nm_account(id_account)
);


create table nm_supplier
(
    id_supplier                int unsigned auto_increment
        primary key,
    id_account                 int unsigned,
    contact_mails              varchar(255)                                    not null,
    passwd                     varchar(255)                                    not null,
    last_passwd_gen            timestamp           default current_timestamp() not null,
    active                     tinyint(1) unsigned default 0                   not null,
    date_add                   datetime            default current_timestamp() not null,

    CONSTRAINT FK_ID_SUPPLIER_ACCOUNT FOREIGN KEY (id_account) REFERENCES nm_account(id_account)

);

create table nm_product
(
    id_product                int unsigned auto_increment
        primary key,
    id_supplier               int unsigned                                                                                    null,
    id_category               int unsigned       
    product_name              varchar (50) default 0       not null,
    product_color             varchar(30)                                                            
    on_sale                   tinyint(1) unsigned                                                            default 0        not null,
    isbn                      varchar(32)                                                                                     null,
    quantity                  smallint                                                                       default 0        not null,
    minimal_quantity          int unsigned                                                                   default 1        not null,
    low_stock_alert           tinyint(1)                                                                     default 0        not null,
    price_showPrice           decimal(20, 6)                                                                 default 0.000000 not null,
    commission                  decimal(20, 6)                                                               default 0.000000 not null,
    tax                       decimal(20, 6)                                                                 default 0.000000 not null,
    additional_shipping_cost  decimal(20, 2)                                                                 default 0.00     not null,
    reference                 varchar(64)                                                                                     null,
    supplier_reference        varchar(64)                                                                                     null,
    location                  varchar(64)                                                                                     null,
    width                     decimal(20, 6)                                                                 default 0.000000 not null,
    height                    decimal(20, 6)                                                                 default 0.000000 not null,
    depth                     decimal(20, 6)                                                                 default 0.000000 not null,
    weight                    decimal(20, 6)                                                                 default 0.000000 not null,
    active                    tinyint(1) unsigned                                                            default 0        not null,
    available_date            date                                                                                            null,
    show_price                tinyint(1)                                                                     default 1        not null,
    date_add                  datetime                                                                                        not null,
    origin_country            varchar(200)                                                                                    null,
    product_order             int(155)                                                                                        not null,
    product_nutritional_facts varchar(10000)                                                                                  not null,
    firts_upload              timestamp                                                           default current_timestamp() not null,
    meta_keywords    varchar(255) null,

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
    start                 datetime                       not null,
    end                   datetime                       not null,

CONSTRAINT FK_ID_specific_price_Product02 FOREIGN KEY (id_product) REFERENCES nm_product(id_product)
);

# DELIMITER $$
#
# DROP PROCEDURE IF EXISTS `add_User`$$
#
# CREATE PROCEDURE `add_User`(IN `p_Name` VARCHAR(45), IN `p_Passw` VARCHAR(200))
# BEGIN
#     DECLARE `_HOST` CHAR(14) DEFAULT '@\'localhost\'';
#     SET `p_Name` := CONCAT('\'', REPLACE(TRIM(`p_Name`), CHAR(39), CONCAT(CHAR(92), CHAR(39))), '\''),
#     `p_Passw` := CONCAT('\'', REPLACE(`p_Passw`, CHAR(39), CONCAT(CHAR(92), CHAR(39))), '\'');
#     SET @`sql` := CONCAT('CREATE USER ', `p_Name`, `_HOST`, ' IDENTIFIED BY ', `p_Passw`);
#     PREPARE `stmt` FROM @`sql`;
#     EXECUTE `stmt`;
#     SET @`sql` := CONCAT('GRANT ALL PRIVILEGES ON *.* TO ', `p_Name`, `_HOST`);
#     PREPARE `stmt` FROM @`sql`;
#     EXECUTE `stmt`;
#     DEALLOCATE PREPARE `stmt`;
#     FLUSH PRIVILEGES;
# END$$
#
# DELIMITER ;

 create function checkLogIn(@username varchar(25), in @password varchar(255))
 RETURNS bit
 BEGIN
    if EXISTS(select * from nm_account where email = @username and passwd = @password)
    then
       return 1;
    else
       return 0;
    end if;
 end;

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

    CONSTRAINT FK_SUPPLIER_H FOREIGN KEY (id_customer) REFERENCES nm_customer(id_customer),
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

