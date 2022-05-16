export class Pedido {
  id_pedido: Number;
  id_supplier: Number;
  id_category: Number;
  id_subcategory: Number;
  name: String;
  state: Number;
  quantity: Number;
  price: Number;
  reference: String;
  date_added: String;
  img_url: String;

  constructor(
    id_pedido: Number,
    id_supplier: Number,
    id_category: Number,
    id_subcategory: Number,
    name: String,
    state: Number,
    quantity: Number,
    price: Number,
    reference: String,
    date_added: String,
    img_url: String
  ) {
    this.id_pedido = id_pedido;
    this.id_supplier = id_supplier;
    this.id_category = id_category;
    this.id_subcategory = id_subcategory;
    this.name = name;
    this.state = state;
    this.quantity = quantity;
    this.price = price;
    this.reference = reference;
    this.date_added = date_added;
    this.img_url = img_url;
  }
}
