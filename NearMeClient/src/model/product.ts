export class Product {
  idProduct: Number;
  id_supplier: Number;
  id_category: Number;
  id_subcategory: Number;
  name: String;
  quantity: Number;
  price: Number;
  description: String;
  reference: String;
  stock: Number;
  active: Boolean;
  date_added: String;
  img_url: String;

  constructor(
    idProduct: Number,
    id_supplier: Number,
    id_category: Number,
    id_subcategory: Number,
    name: String,
    quantity: Number,
    price: Number,
    description: String,
    reference: String,
    active: Boolean,
    stock: Number,
    date_added: String,
    img_url: String
  ) {
    this.idProduct = idProduct;
    this.id_supplier = id_supplier;
    this.id_category = id_category;
    this.id_subcategory = id_subcategory;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.reference = reference;
    this.active = active;
    this.stock = stock;
    this.date_added = date_added;
    this.img_url = img_url;
  }
}
