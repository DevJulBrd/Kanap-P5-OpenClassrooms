// Récupération des éléments du localstorage
let productStorage = JSON.parse(localStorage.getItem("product"));

// Tableaux prix et quantité
let pricePack = [];
let quantityChoice = [];

//Affichage des produit ajouté au panier pas l'utilisateur 
for (let j in productStorage) {
    // Récupération des informations des produits sélectionnés 
    const dataProduct = fetch('http://localhost:3000/api/products/'+productStorage[j].id);

    dataProduct.then(async (responseData) => {
        const response = await responseData.json();
        console.log(response);

        // Fonction pour ne pas afficher deuxfois le même produi si il est d ela même couleur 
        let foundProductId = productStorage.find(p => p.id == productStorage[j].id);
        console.log(productStorage[j].id);
        let foundProductColor = productStorage.find(c => c.color == productStorage[j].color);
        if(foundProductId && foundProductColor != undefined) {
            foundProductId.quantity++;
        };


        // Création du block HTML des produits du panier 
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

        // Affichage du block HTML des produits du panier
        items.insertAdjacentHTML("afterbegin", blockProduct);

        // Calcul de la quantité d'article et du prix total du panier 
        quantityChoice.push(productStorage[j].quantity * 1);  
        pricePack.push(productStorage[j].quantity * response.price);

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        
        // Affichage prix total du panier
        const totalPrice = pricePack.reduce(reducer);
        const showTotalPrice = document.getElementById("totalPrice");
        showTotalPrice.textContent = totalPrice;
        
        // Affichage quantité total du panier 
        const totalQuantity = quantityChoice.reduce(reducer);
        const showTotalQuantity = document.getElementById("totalQuantity");
        showTotalQuantity.textContent = totalQuantity;

    });
};

// Suppression de produit du panier 
const deleteItem = document.getElementsByClassName("deleteItem");
console.log(deleteItem);

//faire une fonction relient le l'id du produit a la box du produit puis la supprimer grâce à la méthode filter et envoyer le nouveau tableau au local storage
const deleteProduct = () => {
    productStorage.find(p => p.id != productStorage.id);
    localStorage.setItem("product", JSON.stringify(productStorage));
};
deleteItem.addEventListener("click", deleteProduct);

// Validation du formulaire au click du bouton de commande 
const order = document.getElementById("order");
order.addEventListener("click", (e) => {
    // Annulation des comportements par défaut au click d'un bouton 
    e.preventDefault();

    // Validation de la value du champ prénom
    const firstName = document.getElementById("firstName").value;
    const errFirstName = document.getElementById("firstNameErrorMsg");

    function checkFirstName() {
        if(/^[A-Za-z]{3,20}$/.test(firstName)) {
            return true;
        } else {
            errFirstName.textContent = "Ne peut contenir que des lettres (minuscules ou majuscules), trois caractères minimum vingt maximum";
            return false;
        }
    };

    // Validation de la value du champ nom
    const lastName = document.getElementById("lastName").value;
    const errLastName = document.getElementById("lastNameErrorMsg");

    function checkLastName () {
        if(/^[A-Za-z]{3,20}$/.test(lastName)) {
            return true;
        } else {
            errLastName.textContent = "Ne peut contenir que des lettres (minuscules ou majuscules), trois caractères minimum vingt maximum";
            return false;
        }
    };

    // Validation de la value du champ adresse
    const adress = document.getElementById("address").value;
    const errAdress = document.getElementById("addressErrorMsg");

    function checkAdress () {
        if(/^[a-zA-Z0-9\s\,\''\-]*$/.test(adress)){
            return true;
        } else {
            errAdress.textContent = "Adresse incorrect";
            return false;
        }
    };

    // Validation de la value du champ ville
    const city = document.getElementById("city").value;
    const errCity = document.getElementById("cityErrorMsg");

    function checkCity () {
        if(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(city)) {
            return true;
        } else {
            errCity.textContent = "Ville incorrect";
            return false;
        }
    };

    // Validation de la value du champ email
    const email = document.getElementById("email").value;
    const emailErr = document.getElementById("emailErrorMsg");
    
    function checkEmail () {
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return true;
        } else {
            emailErr.textContent = "Email incorrect";
            return false;
        }
    };

    // Cration d'un tableau contenant les informations saisie par l'utilisateur pour effectuer sa commande 
    class infos  {
        constructor () {
            this.firstName = firstName,
            this.lastName = lastName,
            this.adress = adress,
            this.city = city,
            this.email = email
        }
    };
    const clientInfos = new infos();

    // Dernière validation champ par champ du formulaire pour envoyer les infos si elles sont correctemet renseignées 
    if(checkFirstName() && checkLastName() && checkAdress() && checkCity() && checkEmail()){
        localStorage.setItem("clientInfos", JSON.stringify(clientInfos));
    }else {
        console.log("no");
    }
});