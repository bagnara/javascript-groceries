export class Product {

    constructor(reference, name, quantity, price, isPurchased = false) {
        this.reference = reference ? reference : Math.random().toString(16).slice(2);
        this.name = name;
        this.quantity = quantity;
        this.price = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2 }).format(price);
        this.isPurchased = isPurchased;
    }

}