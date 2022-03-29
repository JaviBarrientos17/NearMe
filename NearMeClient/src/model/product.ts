export class Product {
  id_product: String;
  id_supplier: Number;
  id_category: Number;
  product_name: String;
  product_color: String;
  on_sale: Boolean;
  isbn: Number;
  quantity: Number;
  minimal_quantity: Number;
  low_stock_alert: Boolean;
  price_showPrice: Number;
  commission: Number;
  tax: Number;
  additional_shipping_cost: Number;
  reference: Number;
  supplier_reference: String;
  location: String;
  width: Number;
  height: Number;
  depth: Number;
  weight: Number;
  active: Boolean;
  available_date: Date;
  date_add: Date;
  origin_country: String;
  product_order: Number;
  product_nutritional_facts: String;
  firts_upload: String;
  meta_keywords: String;

  constructor(
    $id_product: String,
    $id_supplier: Number,
    $id_category: Number,
    $product_name: String,
    $product_color: String,
    $on_sale: Boolean,
    $isbn: Number,
    $quantity: Number,
    $minimal_quantity: Number,
    $low_stock_alert: Boolean,
    $price_showPrice: Number,
    $commission: Number,
    $tax: Number,
    $additional_shipping_cost: Number,
    $reference: Number,
    $supplier_reference: String,
    $location: String,
    $width: Number,
    $height: Number,
    $depth: Number,
    $weight: Number,
    $active: Boolean,
    $available_date: Date,
    $date_add: Date,
    $origin_country: String,
    $product_order: Number,
    $product_nutritional_facts: String,
    $firts_upload: String,
    $meta_keywords: String
  ) {
    this.id_product = $id_product;
    this.id_supplier = $id_supplier;
    this.id_category = $id_category;
    this.product_name = $product_name;
    this.product_color = $product_color;
    this.on_sale = $on_sale;
    this.isbn = $isbn;
    this.quantity = $quantity;
    this.minimal_quantity = $minimal_quantity;
    this.low_stock_alert = $low_stock_alert;
    this.price_showPrice = $price_showPrice;
    this.commission = $commission;
    this.tax = $tax;
    this.additional_shipping_cost = $additional_shipping_cost;
    this.reference = $reference;
    this.supplier_reference = $supplier_reference;
    this.location = $location;
    this.width = $width;
    this.height = $height;
    this.depth = $depth;
    this.weight = $weight;
    this.active = $active;
    this.available_date = $available_date;
    this.date_add = $date_add;
    this.origin_country = $origin_country;
    this.product_order = $product_order;
    this.product_nutritional_facts = $product_nutritional_facts;
    this.firts_upload = $firts_upload;
    this.meta_keywords = $meta_keywords;
  }
}
