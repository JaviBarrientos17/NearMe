export class CustomCardItem {
    private id:number;
    private name:string;
    private price:number;
    public quantity:number;
    public image:string;

    constructor(itemData: any) {
        this.id = itemData.id;
        this.name = itemData.name;
        this.price = itemData.price;
        this.quantity = itemData.quantity;
        this.image = itemData.image;
    }
    
    public getId(): any {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }
}