export class Product {
  idProduct: Number;
  idSupplier: Number;
  idCategory: Number;
  idSubcategory: Number;
  name: String;
  price: Number;
  description: String;
  reference: String;
  stock: Number;
  active: Boolean;
  dateAdded: String;
  imgUrl: String;
  isDeleting: boolean = false;

  constructor(
    idProduct: Number,
    idSupplier: Number,
    idCategory: Number,
    idSubcategory: Number,
    name: String,
    price: Number,
    description: String,
    reference: String,
    active: Boolean,
    stock: Number,
    dateAdded: String,
    imgUrl: String
  ) {
    this.idProduct = idProduct;
    this.idSupplier = idSupplier;
    this.idCategory = idCategory;
    this.idSubcategory = idSubcategory;
    this.name = name;
    this.price = price;
    this.description = description;
    this.reference = reference;
    this.active = active;
    this.stock = stock;
    this.dateAdded = dateAdded;
    this.imgUrl = imgUrl;
  }
}
