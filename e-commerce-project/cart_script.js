// script for dynamic data

const products = [{
    id: 0,
    name: 'Cartoon Astronut T-Shirts',
    price: 745,
    brand: 'adidas',
    img: 'img/products/f1.jpg',
    quantity: 1
},
{
    id: 1,
    name: 'Cartoon Astronut T-Shirts',
    price: 45,
    brand: 'adidas',
    img: 'img/products/f2.jpg',
    quantity: 2
},
{
    id: 2,
    name: 'Cartoon Astronut T-Shirts',
    price: 65,
    brand: 'adidas',
    img: 'img/products/f3.jpg',
    quantity: 1
}]

function callProducts(){
        products.forEach((value,key)=>{
        document.getElementById('list4').innerHTML += `<tr id="row-product-${key}">
        <td><i class="far fa-times-circle" onclick="removeProduct(${key})"></i></td>
        <td><img src="${value.img}"></td>
        <td>${value.name}</td>
        <td>$${value.price}</td>
        <td><input type="number" value="${value.quantity}"></td>
        <td>$${value.price * value.quantity}</td>
    </tr>`
    })
}
callProducts();

function removeProduct(key){
    document.getElementById(`row-product-${key}`).style.display = 'none';
    burchaseProducts(key)
}

let listCarts = []

function burchaseProducts(key){
    if (key == null){
        products.forEach((value,key)=>{
            listCarts[key] = value
        })
    } else{
        delete(listCarts[key])
    }
    submitPrice()
}
burchaseProducts();

function submitPrice(){
    let supTotalPrice = 0;
    let totalPrice = 0;
    listCarts.forEach(el=>{
        supTotalPrice += el.price * el.quantity
    })
    totalPrice = supTotalPrice * 1
    document.getElementById('sup-price').innerHTML = `$ ${supTotalPrice}`
    document.getElementById('total-price').innerHTML = `$ ${totalPrice}`
}

