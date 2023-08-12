// Script for navigation bar
const bar = document.getElementById("bar")
const nav = document.getElementById("navbar")
const close = document.getElementById("close")

if (bar){
     
    bar.addEventListener('click',()=>{
         nav.classList.add('active')
    })
}

if (close){
    close.addEventListener('click',()=>{
         nav.classList.remove('active')
    })
}

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

class product {
    constructor(obj) {
        this.name = obj.name;
        this.id = obj.id;
        this.price = obj.price;
        this.brand = obj.brand;
        this.img = obj.img;
    }

    getHTML () {
        if (this.id < 8){
            return `<div class="pro">
            <img src=${this.img} alt="" onclick="window.location.href='sproduct.html';">
            <div class="des">
                <span>${this.brand}</span>
                <h5 onclick="window.location.href='sproduct.html';">${this.name}</h5>
                <div class="stars">
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                </div>
                <h4>$${this.price}</h4>
            </div>
            <li><i class="fa fa-cart-shopping cart" onclick="addToCart(${this.id})"></i></li>  
            </div>`
        }else{
            return ``
        }
    }

    getNewHTML () {
        if (this.id > 7){
            return `<div class="pro">
            <img src=${this.img} alt="" onclick="window.location.href='sproduct.html';">
            <div class="des">
                <span>${this.brand}</span>
                <h5 onclick="window.location.href='sproduct.html';">${this.name}</h5>
                <div class="stars">
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                </div>
                <h4>$${this.price}</h4>
            </div>
            <li><i class="fa fa-cart-shopping cart" onclick="addToCart(${this.id})"></i></li>  
            </div>`
        }else{
            return ``
        }
    }

    getAll () {
        return `<div class="pro">
        <img src=${this.img} alt="" onclick="window.location.href='sproduct.html';">
        <div class="des">
            <span>${this.brand}</span>
            <h5 onclick="window.location.href='sproduct.html';">${this.name}</h5>
            <div class="stars">
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
            </div>
            <h4>$${this.price}</h4>
        </div>
        <li><i class="fa fa-cart-shopping cart" onclick="addToCart(${this.id})"></i></li>  
        </div>`
    }
}

let list1 = "";
let list2 = "";
let listCarts = [];

products.forEach(el=>{
    let item = new product(el)
    list1 += item.getHTML()
    list2 += item.getNewHTML()
})

document.getElementById('list1').innerHTML = list1;
document.getElementById('list2').innerHTML = list2;

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

