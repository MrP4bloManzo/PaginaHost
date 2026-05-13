const products = [

{
id:1,
name:'Fast Burger',
description:'Hamburguesa premium',
price:89,
rating:'4.9',
time:'10-15 min',
image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop'
},

{
id:2,
name:'Pizza Central',
description:'Pizza italiana',
price:120,
rating:'4.8',
time:'15-20 min',
image:'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop'
},

{
id:3,
name:'Tacos Express',
description:'Street tacos',
price:65,
rating:'5.0',
time:'8-10 min',
image:'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200&auto=format&fit=crop'
}

];

// ==========================
// STATE
// ==========================

let cart =
JSON.parse(
localStorage.getItem('cart')
) || [];

let favorites =
JSON.parse(
localStorage.getItem('favorites')
) || [];

let paymentMethod =
'Efectivo';

// ==========================
// ELEMENTS
// ==========================

const productsContainer =
document.getElementById('products');

const cartCount =
document.getElementById('cartCount');

const cartItems =
document.getElementById('cartItems');

const totalPrice =
document.getElementById('totalPrice');

const cartModal =
document.getElementById('cartModal');

const profileModal =
document.getElementById('profileModal');

const toast =
document.getElementById('toast');

const cardForm =
document.getElementById('cardForm');

// ==========================
// SPLASH
// ==========================

window.addEventListener(
'load',
() => {

setTimeout(() => {

document
.getElementById('splash')
.classList.add('hide');

},1800);

}
);

// ==========================
// TOAST
// ==========================

function showToast(message){

toast.innerText = message;

toast.classList.add('show');

setTimeout(() => {

toast.classList.remove('show');

},2200);

}

// ==========================
// RENDER PRODUCTS
// ==========================

function renderProducts(items){

productsContainer.innerHTML = '';

items.forEach(product => {

productsContainer.innerHTML += `

<div class="card">

<div class="card-img">

<img src="${product.image}">

<div class="time">
${product.time}
</div>

<button
class="like-btn ${
favorites.find(
item => item.id === product.id
)
? 'active'
: ''
}"
onclick="toggleFavorite(${product.id})"
>

${
favorites.find(
item => item.id === product.id
)
? '♥'
: '♡'
}

</button>

</div>

<div class="card-body">

<div class="top">

<div>

<h3>
${product.name}
</h3>

<p>
${product.description}
</p>

</div>

<div class="rating">
⭐ ${product.rating}
</div>

</div>

<div class="bottom">

<div class="price">
$${product.price}
</div>

<button
class="add-btn"
onclick="addToCart(${product.id})"
>

+

</button>

</div>

</div>

</div>

`;

});

}

// ==========================
// FAVORITES
// ==========================

function toggleFavorite(id){

const exists =
favorites.find(
item => item.id === id
);

if(exists){

favorites =
favorites.filter(
item => item.id !== id
);

showToast(
'💔 Favorito eliminado'
);

}else{

const product =
products.find(
item => item.id === id
);

favorites.push(product);

showToast(
'❤️ Agregado a favoritos'
);

}

localStorage.setItem(
'favorites',
JSON.stringify(favorites)
);

renderProducts(products);

}

// ==========================
// CART
// ==========================

function addToCart(id){

const product =
products.find(
item => item.id === id
);

cart.push(product);

localStorage.setItem(
'cart',
JSON.stringify(cart)
);

updateCart();

showToast(
'🛒 Producto agregado'
);

}

// ==========================
// UPDATE CART
// ==========================

function updateCart(){

cartCount.innerText =
cart.length;

}

// ==========================
// OPEN CART
// ==========================

document
.getElementById('cartBtn')
.addEventListener(
'click',
() => {

cartModal.classList.add(
'active'
);

renderCart();

}
);

// ==========================
// RENDER CART
// ==========================

function renderCart(){

cartItems.innerHTML = '';

let total = 0;

if(cart.length === 0){

cartItems.innerHTML =
'<p>🛒 Carrito vacío</p>';

}

cart.forEach((item,index) => {

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<strong>
${item.name}
</strong>

<p>
$${item.price}
</p>

</div>

<button
onclick="removeCart(${index})"
>

❌

</button>

</div>

`;

});

totalPrice.innerText =
`$${total}`;

}

// ==========================
// REMOVE CART
// ==========================

function removeCart(index){

cart.splice(index,1);

localStorage.setItem(
'cart',
JSON.stringify(cart)
);

updateCart();

renderCart();

showToast(
'🗑️ Producto eliminado'
);

}

// ==========================
// PAYMENT
// ==========================

const paymentButtons =
document.querySelectorAll(
'.payment'
);

paymentButtons.forEach(button => {

button.addEventListener(
'click',
() => {

paymentButtons.forEach(btn => {

btn.classList.remove(
'active-payment'
);

});

button.classList.add(
'active-payment'
);

paymentMethod =
button.dataset.method;

if(paymentMethod === 'Tarjeta'){

cardForm.style.display =
'flex';

}else{

cardForm.style.display =
'none';

}

}
);

});

// ==========================
// CHECKOUT
// ==========================

document
.getElementById('checkoutBtn')
.addEventListener(
'click',
() => {

if(cart.length === 0){

showToast(
'🛒 Tu carrito está vacío'
);

return;

}

showToast(
'🚀 Pedido realizado'
);

cart = [];

localStorage.setItem(
'cart',
JSON.stringify(cart)
);

updateCart();

renderCart();

cartModal.classList.remove(
'active'
);

}
);

// ==========================
// SEARCH
// ==========================

document
.getElementById('searchInput')
.addEventListener(
'input',
(e) => {

const value =
e.target.value.toLowerCase();

const filtered =
products.filter(product =>

product.name
.toLowerCase()
.includes(value)

);

renderProducts(filtered);

}
);

// ==========================
// NAVBAR
// ==========================

const navItems =
document.querySelectorAll(
'.nav-item'
);

navItems.forEach((item,index) => {

item.addEventListener(
'click',
() => {

navItems.forEach(nav => {

nav.classList.remove(
'active'
);

});

item.classList.add(
'active'
);

// SEARCH

if(index === 1){

window.scrollTo({

top:0,
behavior:'smooth'

});

document
.getElementById('searchInput')
.focus();

showToast(
'🔍 Buscador abierto'
);

}

// FAVORITES

if(index === 2){

if(favorites.length === 0){

showToast(
'💔 Sin favoritos'
);

}else{

showToast(
`❤️ ${favorites.length} favoritos`
);

}

}

// PROFILE

if(index === 3){

profileModal.classList.add(
'active'
);

document
.getElementById('ordersCount')
.innerText =
cart.length;

document
.getElementById('favoritesCount')
.innerText =
favorites.length;

}

}
);

});

// ==========================
// CLOSE MODALS
// ==========================

document
.querySelector('.close-modal')
.addEventListener(
'click',
() => {

cartModal.classList.remove(
'active'
);

}
);

document
.querySelector('.close-profile')
.addEventListener(
'click',
() => {

profileModal.classList.remove(
'active'
);

}
);

// ==========================
// DARK MODE
// ==========================

document
.getElementById('themeToggle')
.addEventListener(
'click',
() => {

document.body.classList.toggle(
'light-mode'
);

}
);

// ==========================
// INIT
// ==========================

updateCart();

renderProducts(products);