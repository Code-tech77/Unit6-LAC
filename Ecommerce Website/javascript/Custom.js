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
        name: 'Razer Tartarus Pro - Analog Optical Switch Keypad',
        image: '13.PNG',
        price: 99.97
    },
    {
        id: 2,
        name: 'SteelSeries PrismCaps – Double Shot Pudding-style Keycaps',
        image: '14.PNG',
        price: 26.99
    },
    {
        id: 3,
        name: 'Pack of Gateron ks-9 G PRO Switches for Mechanical Keyboards',
        image: '15.PNG',
        price: 27.99
    },
    {
        id: 4,
        name: 'BOYI GMK67-65% Keyboard Kit,Hot-Swappable Bluetooth 5.0/2.4G/Type-C Tri-Mode Wireless RGB Mechanical Keyboard ',
        image: '16.PNG',
        price: 69.99
    },
    {
        id: 5,
        name: 'YMDK Idobao x ID75 75 Keys Ortholinear Layout VIA Anodized Aluminum Case Plate',
        image: '17.PNG',
        price: 98.50
    },
    {
        id: 6,
        name: 'DucKey Keyboard Poron Pad & EVA Bottom Pad Set, Switch Sound-Absorbing Cotton',
        image: '18.PNG',
        price: 14.99
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