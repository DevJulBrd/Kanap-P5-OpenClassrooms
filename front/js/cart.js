let productStorage = JSON.parse(localStorage.getItem("product"));
let pricePack = [];
let quantityChoice = [];


for (let j in productStorage) {
    const dataProduct = fetch('http://localhost:3000/api/products/'+productStorage[j].id);

    dataProduct.then(async (responseData) => {
        const response = await responseData.json();
        console.log(response);

        const items = document.getElementById("cart__items");
        const blockProduct = `<article class="cart__item" data-id="${productStorage[j].id}" data-color="${productStorage[j].color}">
        <div class="cart__item__img">
        <img src="${response.imageUrl}" alt="${response.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${response.name}</h2>
            <p>${productStorage[j].color}</p>
            <p>${response.price}</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : ${productStorage[j].quantity} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article>`;

        items.insertAdjacentHTML("afterbegin", blockProduct);

        quantityChoice.push(productStorage[j].quantity * 1);  
        pricePack.push(productStorage[j].quantity * response.price);

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        
        const totalPrice = pricePack.reduce(reducer);
        const showTotalPrice = document.getElementById("totalPrice");
        showTotalPrice.textContent = totalPrice;
        
        const totalQuantity = quantityChoice.reduce(reducer);
        const showTotalQuantity = document.getElementById("totalQuantity");
        showTotalQuantity.textContent = totalQuantity;

        const deleteItem = document.getElementsByClassName("deleteItem");
        console.log(deleteItem);

        for(let k = 0; k < deleteItem.length; k++) {
            deleteItem[k].addEventListener("click", (event) => {
                event.preventDefault();

                let idSelect = blockProduct[k]; 
                idSelect.remove();
            });
        };
    });
};






const email = document.getElementById("email");
const emailErr = document.getElementById("emailErrorMsg");
const regExpEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
};
const emailControl = () => {
    if(regExpEmail(email.value)) {
        return true;
    } else {
        emailErr.textContent = "Email incorrect";
        return false;
    }
};
console.log(email.value);
email.addEventListener("change", emailControl);



// quelle méthode utiliser ?

/*const order = document.getElementById("order");
order.addEventListener("click", function(e) {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    

    if (!firstName.value) {
        erreur = "Veuillez renseigner votre prénom";
        document.getElementById("firstNameErrorMsg").textContent = erreur;
    }

    if (!lastName.value) {
        erreur = "Veuillez renseigner votre nom";
        document.getElementById("lastNameErrorMsg").textContent = erreur;
    }

    if (!address.value) {
        erreur = "Veuillez renseigner votre adresse";
        document.getElementById("addressErrorMsg").textContent = erreur;
    }

    if (!city.value) {
            erreur = "Veuillez reseigner votre ville";
            document.getElementById("cityErrorMsg").textContent = erreur;
        }

    if (!email.value) {
        erreur = "Veuillez renseigner votre adresse email";
        document.getElementById("emailErrorMsg").textContent = erreur;
    }
    
    if (email.value != '"" + @ + "" + .com') {
        erreur = "Adresse email incorrecte";
        document.getElementById("emailErrorMsg").textContent = erreur;
    } 

    if (erreur) {
        e.preventDefault();
        return false;
    }
});

function isValid(value) {
    return /([A-Za-z])/.test(value);
};
*/