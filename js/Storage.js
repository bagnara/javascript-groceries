export class Storage {


    constructor() {
        
    }


    save(products) {
        return !localStorage.setItem('groceries@products', JSON.stringify(products));
    }

    load() {
        const data = localStorage.getItem('groceries@products');
        return data ? JSON.parse(data) : [];
    }

}