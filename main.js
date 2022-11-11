const iconToggle = document.querySelector('.bx-grid-alt')
const menu = document.querySelector('.menu')

const cartIcon = document.querySelector('.bx-cart')
const cart = document.querySelector('.cart')

iconToggle.addEventListener('click', function(){
    console.log(menu.classList.toggle('show__menu'));
})

cartIcon.addEventListener('click', function(){
    cart.classList.toggle('show__cart');

})


const eProducts = [
    
    {
        id: 1,
        name: 'Hoodies',
        price: 14.00,
        image: './Source/img/featured1.png',
    },
    
    {
        id: 2,
        name: 'Shirts',
        price: 24.00,
        image: './Source/img/featured2.png',
    },
    
    {
        id: 3,
        name: 'Sweatshirts',
        price: 24.00,
        image: './Source/img/featured3.png',
    }

    ]



const productContent = document.getElementById('product__content');

function paintCards (){
    let html = "";

eProducts.forEach(({id, name, price, image}) => {
        html += `
        <article class="product" id="content">
            <div class="product_bg">
                <img class="product__img" src="${image}" alt="${name}">
            </div>
            <div class="info">
                <h3 class="price">${price} <span class="units">| Stock: 15</span>
                </h3>
                <h3 class="name">${name}</h3>
                <button class="add__product" id="${id}">
                    <i class="bx bx-plus" id="btn1"></i>
                </button>
            </div>
        </article>
        `
    })

    productContent.innerHTML = html
}

paintCards ();

let colection = [];
productContent.addEventListener ('click', (e) => {

if (e.target.classList.contains('add_product')){ 
    const productId = Number(e.target.id);
    
const repeatProduct = colection.find(eProduct => eProduct === productId )

if(repeatProduct) return alert('esto ya existe')
const findProduct = eProducts.find((eProduct) => eProduct.id === productId);
   
colection.push(findProduct)

}
}
)




function paintColection(){
let html = '';

colection.forEach(({id, name, price, image})  => {
    html += `
    <article class="product" id="p-1">
        <div class="product_bg">
                <img class="product__img" src="${image}" alt="${name}">
            </div>
            <div class="info">
                <h3 class="price">${price} <span class="units">| Stock: 15</span>
                </h3>
                <h3 class="name">${name}</h3>
                <button class="rest__product" id="${id}">
                    <i class="bx bx-plus" id="btn1"></i>
                </button>
            </div>
    </article>
    `

})


colectionContainer.innerHTML = html

}



    

   
   


