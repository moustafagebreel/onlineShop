// Script for dynamic data

const products = [{
    id: 0,
    name: 'Cartoon Astronut T-Shirts',
    price: 745,
    brand: 'adidas',
    img: 'img/products/f1.jpg'
},
{
    id: 1,
    name: 'Cartoon Astronut T-Shirts',
    price: 45,
    brand: 'adidas',
    img: 'img/products/f2.jpg'
},
{
    id: 2,
    name: 'Cartoon Astronut T-Shirts',
    price: 65,
    brand: 'adidas',
    img: 'img/products/f3.jpg'
},
{
    id: 3,
    name: 'Cartoon Astronut T-Shirts',
    price: 52,
    brand: 'adidas',
    img: 'img/products/f4.jpg'
},
{
    id: 4,
    name: 'Cartoon Astronut T-Shirts',
    price: 86,
    brand: 'adidas',
    img: 'img/products/f5.jpg'
},
{
    id: 5,
    name: 'Cartoon Astronut T-Shirts',
    price: 32,
    brand: 'adidas',
    img: 'img/products/f6.jpg'
},
{
    id: 6,
    name: 'Cartoon Astronut T-Shirts',
    price: 98,
    brand: 'adidas',
    img: 'img/products/f7.jpg'
},
{
    id: 7,
    name: 'Cartoon Astronut T-Shirts',
    price: 78,
    brand: 'adidas',
    img: 'img/products/f8.jpg'
},
{
    id: 8,
    name: 'Cartoon Astronut T-Shirts',
    price: 745,
    brand: 'adidas',
    img: 'img/products/n1.jpg'
},
{
    id: 9,
    name: 'Cartoon Astronut T-Shirts',
    price: 45,
    brand: 'adidas',
    img: 'img/products/n2.jpg'
},
{
    id: 10,
    name: 'Cartoon Astronut T-Shirts',
    price: 65,
    brand: 'adidas',
    img: 'img/products/n3.jpg'
},
{
    id: 11,
    name: 'Cartoon Astronut T-Shirts',
    price: 52,
    brand: 'adidas',
    img: 'img/products/n4.jpg'
},
{
    id: 12,
    name: 'Cartoon Astronut T-Shirts',
    price: 86,
    brand: 'adidas',
    img: 'img/products/n5.jpg'
},
{
    id: 13,
    name: 'Cartoon Astronut T-Shirts',
    price: 32,
    brand: 'adidas',
    img: 'img/products/n6.jpg'
},
{
    id: 14,
    name: 'Cartoon Astronut T-Shirts',
    price: 98,
    brand: 'adidas',
    img: 'img/products/n7.jpg'
},
{
    id: 15,
    name: 'Cartoon Astronut T-Shirts',
    price: 78,
    brand: 'adidas',
    img: 'img/products/n8.jpg'
}]

let listCarts = []

function callProducts(){
        products.forEach((value,key)=>{
        document.getElementById('list3').innerHTML += `<div class="pro">
        <img src=${value.img} alt="" onclick="window.location.href='sproduct.html';">
        <div class="des">
            <span>${value.brand}</span>
            <h5 onclick="window.location.href='sproduct.html';">${value.name}</h5>
            <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </div>
            <h4>$${value.price}</h4>
        </div>
        <li><i class="fa fa-cart-shopping cart" onclick="addToCart(${key})"></i></li>  
        </div>`
    })
}
callProducts();

function addToCart(key){
    if (listCarts[key] == null){
        listCarts[key] = products[key];
        listCarts[key].quantity = 1;
    } else{
        listCarts[key].quantity++;
    }
    reloadCart();
    document.getElementById('count').classList.add('bounce')
}

function reloadCart(){
    let count = 0;
    listCarts.forEach(el=>{
        count += el.quantity;
    })
    document.getElementById('count').innerHTML = `${count}`
}



