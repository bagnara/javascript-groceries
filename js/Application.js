import { Storage } from './Storage.js';
import { ProductList } from './ProductList.js';
import { Product } from './Product.js';
import { Notification } from './Notification.js';
import { Summary } from './Summary.js';



export class Application {


    constructor() {

    }


    init() {
        const formButton = document.querySelector('.form button');
        const storage = new Storage();
        const productList = new ProductList(storage.load());
        const summary = new Summary();


        productList.refresh();
        summary.init();
        
        
        formButton.addEventListener('click', event => {
            
            try {
                event.preventDefault();
                formButton.disabled = true;


                const quantityInput = document.querySelector('.form #quantity');
                const quantity = quantityInput.value;


                if (!quantity) {
                    throw new Error('Please, enter the product quantity');
                }


                const nameInput = document.querySelector('.form #name');
                const name = nameInput.value;


                if (!name) {
                    throw new Error('Please, enter the product name');
                }


                const priceInput = document.querySelector('.form #price');
                const price = priceInput.value;


                if (!price) {
                    throw new Error('Please, enter the product price');
                }

                
                const product = new Product(undefined, name, quantity, price);
                productList.insert(product);


                priceInput.value = '';
                quantityInput.value = '';
                nameInput.value = '';
                formButton.disabled = false;
                
            } catch (error) {
                const notification = new Notification(error.message, 2500);
                notification.display();


                setInterval(() => {
                    formButton.disabled = false;

                }, 2500)
                
            }

        });

    }

}