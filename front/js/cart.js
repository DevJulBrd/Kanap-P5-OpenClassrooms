var myProduct = JSON.parse(localStorage.getItem('cotch'));
console.log(myProduct);


const dataProduct = fetch('http://localhost:3000/api/products/'+myProduct.id);

dataProduct.then(async (responseData) => {
    const response = await responseData.json();
    console.log(response);

    const items = document.getElementById("cart__items");
    var blockRecap = `<article class="cart__item" data-id="${myProduct.id}" data-color="${myProduct.color}"><div class="cart__item__img"><img src="${response.imageUrl}" alt="${response.altTxt}"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${response.name}</h2><p>${myProduct.color}</p><p>${response.price}€</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>${myProduct.quantity}</p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`;
    items.insertAdjacentHTML("afterbegin", blockRecap);
    
    var totalQuantity = myProduct.quantity;
    document.getElementById("totalQuantity").textContent = totalQuantity;

    var price = myProduct.price;
    var totalPrice = price * totalQuantity;
    document.getElementById("totalPrice").textContent = totalPrice;
}); 


 

function isValid () {
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var adresse = document.getElementById("adresse");
    var city = document.getElementById("city");
    var email = document.getElementById("email");
    var firstName = document.getElementById("firstName");

};