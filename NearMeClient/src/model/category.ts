export class Category {
  idCategory: String;
  name: String;
  parent: Number;
  root: boolean;
  imgUrl: String;

  constructor(idCategory: String, name: string, parent: Number, root: boolean, imgUrl: String) {
    this.idCategory = idCategory;
    this.name = name;
    this.parent = parent;
    this.root = root;
    this.imgUrl = imgUrl;
  }
}
