export class Tienda {
  idSupplier: Number;
  name: String;
  description: String;
  imgUrl: String;
  geo: String;
  idUser: Number;
  //create constructor for tienda class
  constructor(
    idSupplier: Number,
    name: String,
    description: String,
    imgUrl: String,
    geo: String,
    idUser: Number
  ) {
    this.idSupplier = idSupplier;
    this.name = name;
    this.description = description;
    this.imgUrl = imgUrl;
    this.geo = geo;
    this.idUser = idUser;
  }
}
