export class Category {
  idCategory: String;
  name: String;
  parent: Number;
  root: boolean;

  constructor(idCategory: String, name: string, parent: Number, root: boolean) {
    this.idCategory = idCategory;
    this.name = name;
    this.parent = parent;
    this.root = root;
  }
}
