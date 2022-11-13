

let eProducts = [
    
    {
        id: 1,
        name: 'Hoodies',
        stock: 10,
        price: 14.00,
        image: './Source/img/featured1.png',
    },
    
    {
        id: 2,
        stock: 15,
        name: 'Shirts',
        price: 24.00,
        image: './Source/img/featured2.png',
    },
    
    {
        id: 3,
        stock: 20,
        name: 'Sweatshirts',
        price: 24.00,
        image: './Source/img/featured3.png',
    }

    ]

    const iconToggle = document.querySelector('.bx-grid-alt')
    const menu = document.querySelector('.menu')
    
    const cartIcon = document.querySelector('.bx-cart')
    const cart = document.querySelector('.cart')
    
    const productContent = document.querySelector('.product__content');
    const cartShopItems = document.querySelector('.cart__content')

    const cartShopTotal = document.querySelector('.cartShop__total')
    const countProducts = document.querySelector('.countproduct')

let cartProduct = {};


function addProduct (idProduct){

    const currentProduct = eProducts.find(eProduct => eProduct.id === idProduct)

    if(currentProduct.stock === cartProduct[idProduct].amount) 
    return alert('No hay más productos en el stock')  
    cartProduct[currentProduct.id].amount++
}

function deleteProduct (idProduct){

    const op = confirm('Seguro que quieres eliminar?')

    if(op){
        delete cartProduct[idProduct]}
}

function countProduct(){

    const arrayCartShop = Object.values(cartProduct)
    
    let suma = arrayCartShop.reduce((acum, curr) => {
        acum += curr.amount
        return acum}, 0)

        countProducts.textContent = suma;
}

function printTotal (){

    const arrayCartShop = Object.values(cartProduct);
   
    if(!arrayCartShop.length) return (cartShopTotal.innerHTML = `
        <div class="cartShop__product">
            <img src="./Source/img/empty-cart.png" alt="" class="img">
            <h3>Your car is empty</h3> 
        </div>`
  );

    let total = arrayCartShop.reduce((acum, curr) => {
       
      acum += curr.price * curr.amount;

        return acum;
    },0);


  cartShopTotal.innerHTML = ` 
                <div class="total"> 
                    <h3 class="total__price">total :<span><strong> $${total}</strong></span></h3>
                </div>
                <button class="buy">Buy</button>
        `

}

function paintProduct (){
    let html = "";

    eProducts.forEach(({id, name, price, image, stock}) => {

    const btnBuy = stock 
    
    ? `<i class="bx bx-plus" id="${id}"></i>` 
    : `<i class="bx btn__nodrop">No disponible</i>`
        html += `
        <article class="product" id="content">
            <div class="product_bg">
                <img class="product__img" src="${image}" alt="${name}">
            </div>
            <div class="info">
                <h3 class="price">${price} <span class="units">| Stock: ${stock}</span>
                </h3>
                <h3 class="name">${name}</h3>
                <button class="add__product">
                    ${btnBuy}
                </button>
            </div>
        </article>
        `
    }
  )
    productContent.innerHTML = html
}

function printProductsInCart (){
    html = '';
    const arrayProductShop = Object.values(cartProduct)

    arrayProductShop.forEach(({id, name, price, image, amount, stock}) => {
        html += `
        <div class="cart__product">
            <img src="${image}" alt="" class="cart__img">
        </div>

        <div class="cart__inventory">
            <h3 class="product__name">${name}</h3>
            <span class="stock">Stock: ${stock} |<span class="price">$${price},00</span></span>
            <span class="items-count"><strong>${amount}</strong> units</span>
            
        </div>

        <div class="options">
            <button id="${id}" class="add-item">+</button>
            <button id="${id}" class="rest-item">-</button>
            <button id="${id}" class="del-item"><i class='bx bx-trash'></i></button>
            
        </div>
        `
    }
    );

    cartShopItems.innerHTML = html
    printTotal();
    countProduct();
}

iconToggle.addEventListener('click', function(){
    console.log(menu.classList.toggle('show__menu'));
}
)

cartIcon.addEventListener('click', function(){
    cart.classList.toggle('show__cart');

}
)

 productContent.addEventListener ('click', (e) => {

    if(e.target.classList.contains('bx-plus')){
        
        const idProduct = Number(e.target.id)

        const currentProduct = eProducts.find(eProduct => eProduct.id === idProduct)

        if(cartProduct[currentProduct.id]){ 
            addProduct(idProduct)

        } else{
            cartProduct[currentProduct.id] = { ... currentProduct }
            cartProduct[currentProduct.id].amount = 1
        } 
        printProductsInCart()    
    }
  } 
)

cartShopItems.addEventListener('click', (e) =>{


    if(e.target.classList.contains('add-item')){ 
        const idProduct = Number(e.target.id);
        addProduct(idProduct)
}
    if(e.target.classList.contains('rest-item')){     
        const idProduct = Number(e.target.id);

       if(cartProduct[idProduct].amount === 1) {
        deleteProduct (idProduct)

    }  else{
        cartProduct[idProduct].amount--
  }
}

    if(e.target.classList.contains('del-item')){     
        const idProduct = Number(e.target.id);

        deleteProduct (idProduct);
};
printProductsInCart();

  }
)

cartShopTotal.addEventListener('click', (e) =>{
    if(e.target.classList.contains('buy')){
    const op = confirm('Estás seguro que quieres comprar?')
    if(op){
        eProducts = eProducts.map(eProduct => {
            if(cartProduct[eProduct.id]?.id === eProduct.id){
                return {
                    ... eProduct,
                    stock: eProduct.stock - cartProduct[eProduct.id].amount
                }; 
            }else{
                return eProduct
            }   

        })

        cartProduct = {};
        paintProduct ();
        printProductsInCart();
    }
  }    
 }
)

paintProduct ();
printTotal ();



