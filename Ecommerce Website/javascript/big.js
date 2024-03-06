let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'RK ROYAL KLUDGE M75 Mechanical Keyboard, 2.4GHz Wireless/Bluetooth/USB-C Wired Gaming Keyboard 75% Layout 81 Keys',
        image: '19.PNG',
        price: 79.99
    },
    {
        id: 2,
        name: 'Keychron K3 Pro Ultra-Slim 75% keyboard',
        image: '20.PNG',
        price: 124.99
    },
    {
        id: 3,
        name: 'Redragon Mechanical Gaming Keyboard, 75% Compact Mechanical Keyboard',
        image: '21.PNG',
        price: 48.30
    },
    {
        id: 4,
        name: 'AJAZZ AK873-75% Wired Gaming Keyboard',
        image: '22.PNG',
        price: 52.99
    },
    {
        id: 5,
        name: 'Arteck Universal Wave Ergonomic Keyboard',
        image: '23.PNG',
        price: 105.99
    },
    {
        id: 6,
        name: 'CHERRY MX-LP 2.1 Compact Wireless, small cordless gaming 75% keyboard',
        image: '24.PNG',
        price: 122.24
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}