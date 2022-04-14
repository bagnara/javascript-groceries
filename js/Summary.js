import { Storage } from './Storage.js';



export class Summary {


    constructor() {
        
    }


    init() {
        const target = document.querySelector('.products');
        const configuration = { childList: true };
        
        
        const observer = new MutationObserver(mutations => {
            this.refresh();
        });


        this.refresh();
        observer.observe(target, configuration);
    }


    refresh() {
        const storage = new Storage();
        const products = storage.load();
        const initial = 0;

        
        const temporaryTotal = products.reduce((accumulator, product) => {
            const quantity = parseFloat(product.quantity);
            const price = parseFloat(product.price);
            return accumulator + (quantity * price);

        }, initial);


        const formattedTotal = new Intl.NumberFormat('en-GB', {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            useGrouping: false
        
        }).format(temporaryTotal);


        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-shopping-cart');
        icon.ariaHidden = true;

        const description = document.createElement('span');
        description.classList.add('description');
        description.innerHTML = 'You are doing great';

        const total = document.createElement('span');
        total.classList.add('total');
        total.append(icon, formattedTotal);

        const summary = document.querySelector('.summary');
        summary.innerHTML = '';
        summary.append(total, description);
    }

}