import { Storage } from './Storage.js';



export class ProductList {


    constructor(products) {
        this.products = products ? products : [];
    }
    

    insert(product) {
        
        
        if (!product) {
            throw new Error('Product not provided');
        }


        const products = this.products;
        products.push(product);


        this.#save(products);
        this.#replace(products);
    }

    update(reference) {


        if (!reference) {
            throw new Error('Reference not provided');
        }

        
        const products = this.products.filter(product => {
            
            if (product.reference === reference) {
                product.isPurchased = !product.isPurchased;
            }

            return product;
        });


        this.#save(products);
        this.#replace(products);
    }

    delete(reference) {


        if (!reference) {
            throw new Error('Reference not provided');
        }

        
        const products = this.products.filter(product => {
            
            if (product.reference !== reference) {
                return product;
            }

        });


        this.#save(products);
        this.#replace(products);
    }


    refresh() {
        const list = document.querySelector('.products');
        list.innerHTML = '';


        if (!this.products.length) {
            
            const notification = document.createElement('span');
            notification.classList.add('message', 'textual');
            notification.innerHTML = 'The JavaScript Groceries project is using HTML, CSS and JavaScript in order to provide an open-source grocery list application. The project was planned and created in the simplest way possible, and will now receive improvements as needed. It is a simple project to solve a simple problem!';
            list.append(notification);

        }
        
        
        this.products.forEach(product => {

            const input = document.createElement('input');
            input.classList.add('input');
            input.setAttribute('type', 'checkbox');
            
            const quantity = document.createElement('span');
            quantity.classList.add('quantity');
            quantity.innerHTML = product.quantity;

            const name = document.createElement('span');
            name.classList.add('name');
            name.innerHTML = product.name;

            const label = document.createElement('label');
            label.classList.add('label');
            label.append(quantity, name);

            const price = document.createElement('span');
            price.classList.add('price');
            price.innerHTML = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2 }).format(product.quantity * product.price);

            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.innerHTML = 'Remove';

            const checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');
            checkbox.append(input, label);

            const listItem = document.createElement('li');
            listItem.classList.add('product');
            listItem.setAttribute('id', product.reference);
            

            if (product.isPurchased) {
                checkbox.classList.add('checked');
                input.setAttribute('checked', true);
            }


            button.addEventListener('click', () => {
                this.delete(product.reference);
            });

            checkbox.addEventListener('click', () => {
                this.update(product.reference);
            });


            listItem.append(checkbox, price, button);
            list.append(listItem);

        });

    }

    
    #save(products) {
        const storage = new Storage();
        const isSaved = storage.save(products);
        
        
        if (!isSaved) {
            throw new Error('Unable to save products');
        }
        
    }
    
    #replace(products) {
        this.products = products;
        this.refresh();
    }

}