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
        name: 'YINDIAO T8 60% Mechanical Gaming Keyboard',
        image: '1.PNG',
        price: 50
    },
    {
        id: 2,
        name: 'Snpurdiri 60% Wired Gaming Keyboard',
        image: '2.PNG',
        price: 27.99
    },
    {
        id: 3,
        name: 'FELiCON RK-T60 Mini 60% Percent Gaming Mechanical Keyboard',
        image: '3.PNG',
        price: 48.99
    },
    {
        id: 4,
        name: 'Snpurdiri 60% Wired Gaming Keyboard',
        image: '4.PNG',
        price: 32.99
    },
    {
        id: 5,
        name: 'Razer BlackWidow V3 Mini HyperSpeed (Yellow Switch) - Wireless 65% Mechanical Gaming Keyboard',
        image: '5.PNG',
        price: 129.99
    },
    {
        id: 6,
        name: 'BOYI Wired 60% Mechanical,Mini RGB Cherry MX Switch PBT Keycaps NKRO Programmable Type-C Keyboard ',
        image: '6.PNG',
        price: 69.99
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