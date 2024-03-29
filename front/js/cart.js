// Récupération des éléments du localstorage
let productsStorage = JSON.parse(localStorage.getItem("products"));

// Eléments pour calculer la quantité total et le prix total
const totalQuantityShow = document.querySelector("#totalQuantity");
const totalPriceShow = document.querySelector("#totalPrice");
let response;

let calculateTotalQuantity = 0;
let calculateTotalPrice = 0;

// Récupération des informations des produits sélectionnés 
const dataProduct = fetch("http://localhost:3000/api/products");

dataProduct.then(async (responseData) => {
    response = await responseData.json();
    console.log(response);

    //Affichage des produit ajouté au panier pas l'utilisateur
    for (let j in productsStorage) {

        // On cherche information des produit par rapport aux id qu'il y a dans le localStorage
        let responseByProduct = response.find(el => el._id === productsStorage[j].id);
        console.log(responseByProduct);
        // Création du block HTML des produits du panier 
        const items = document.getElementById("cart__items");
        const blockProduct = `<article class="cart__item" data-id="${productsStorage[j].id}" data-color="${productsStorage[j].color}">
        <div class="cart__item__img">
        <img src="${responseByProduct.imageUrl}" alt="${responseByProduct.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${responseByProduct.name}</h2>
            <p>${productsStorage[j].color}</p>
            <p>${responseByProduct.price}</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsStorage[j].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article>`;

        // Affichage du block HTML des produits du panier
        items.insertAdjacentHTML("beforeend", blockProduct);

        // Calcul et affichage de la quantité total et du prix total
        const itemQuantity = document.querySelectorAll(".itemQuantity")[j];

        // On utilise les valeurs du haut de la page pour calculer la quantité total et le prix total avec les informatiosn du localStorage et le prix des produit
        calculateTotalPrice = calculateTotalPrice + (+responseByProduct.price * +productsStorage[j].quantity);
        calculateTotalQuantity = calculateTotalQuantity + +productsStorage[j].quantity;

        
        // Actualise la quantité total et le prix total en prenant en conte les input number qui change la quantité de produit
        itemQuantity.addEventListener("input", () => {
            productsStorage[j].quantity = +itemQuantity.value;
            // On met le chagement de quantité dans le localStorage 
            localStorage.setItem("products", JSON.stringify(productsStorage));

            // On créé un nouveau calcul avec les fonctions qui sont plus bas
            const newPrice = calculateNewPrice();
            let newQuantity = 0;
            newQuantity = productsStorage.reduce((accumulateur, currentValue) => +accumulateur + +currentValue.quantity, newQuantity);
            // On affiche les nouveaux totaux sur la page 
            displayTotal(newQuantity,newPrice)
        });

        // Suppression de produit du panier 
        let listDeleteBtn = document.querySelectorAll(".deleteItem");
        
        // On veut que pour chaque bouton supprimer (1 par produit), le produit soit enlever du panier
        listDeleteBtn[j].addEventListener("click", (event) => {
            event.stopPropagation();

            console.log(productsStorage[j].id, productsStorage[j].color);
            // On récupère les block html de chaque produit du panier
            let blocks = document.querySelectorAll(".cart__item");
            console.log("data");
            console.log(blocks[j].dataset.id, blocks[j].dataset.color);
            // On compare l'id et la couleur des produit dans le localstorage et les produits qui sont afficher, il y obligatoirement une correspondance puisque les produits affichés proviennent du localStorage
            if(productsStorage[j].id == blocks[j].dataset.id  && productsStorage[j].color == blocks[j].dataset.color){
                console.log("OK !!");
                
                // On créé un nouveau tableau en gardant tous les produits du localStorage qui sont différents du produit que l'on veut supprimer 
                const newProductsListe = productsStorage.filter(el => el != productsStorage[j]);
                // On envoie ce nouveau tableau au localStorage
                localStorage.setItem("products", JSON.stringify(newProductsListe));

                // Un alerte qui confirme que la suppression à bien eut lieu
                alert("Le produit a bien été supprimer de panier");

                // On charche de nouveau la page cart pour que le panier s'actualise
                window.location.href = document.location.origin + "/front/html/cart.html";

            };// Il n'y a pas de else vu qu'il est impossible que le block html que l'on veut supprimer ne corresponde pas avec les infos du localStorage
        });
    };
    // On affiche les totaux sur la page
    displayTotal(calculateTotalQuantity,calculateTotalPrice);
});

// Fonction qui permet d'afficher les totaux quantité et prix 
const displayTotal = (a,b) => {
    totalQuantityShow.innerText = a;
    totalPriceShow.innerText = b;
};

// Fonction qui permet de recalculer les totaux en fonction des input qui gère la quantité que l'utilisateur choisit 
const calculateNewPrice = () => {
    // On remet le calcul a zéro 
    calculateTotalPrice = 0;

    // On fait tourner la même boucle que plus pour récupérer les informations 
    for (let j in productsStorage){
        let responseByProduct = response.find(el => el._id === productsStorage[j].id);
        calculateTotalPrice = calculateTotalPrice + (+responseByProduct.price * +productsStorage[j].quantity);
    };

    return calculateTotalPrice;
};
        

// Validation du formulaire au click du bouton de commande 
const order = document.getElementById("order");
order.addEventListener("click", (e) => {
    // Annulation des comportements par défaut au click d'un bouton 
    e.preventDefault();

    // Validation de la value du champ prénom
    const firstName = document.getElementById("firstName").value;
    const firstNameErr = document.getElementById("firstNameErrorMsg");

    function checkFirstName() {
        if(/^[A-Za-z]{3,20}$/.test(firstName)) {
            return true;
            firstNameErr.textContent = "";
        } else {
            firstNameErr.textContent = "Ne peut contenir que des lettres (minuscules ou majuscules), trois caractères minimum vingt maximum";
            return false;
        }
    };

    // Validation de la value du champ nom
    const lastName = document.getElementById("lastName").value;
    const lastNameErr = document.getElementById("lastNameErrorMsg");

    function checkLastName () {
        if(/^[A-Za-z]{3,20}$/.test(lastName)) {
            return true;
            lastNameErr.textContent = "";
        } else {
            lastNameErr.textContent = "Ne peut contenir que des lettres (minuscules ou majuscules), trois caractères minimum vingt maximum";
            return false;
        }
    };

    // Validation de la value du champ adresse
    const address = document.getElementById("address").value;
    const addressErr = document.getElementById("addressErrorMsg");

    function checkAdress () {
        if(/^[a-zA-Z0-9\s\,\''\-]*$/.test(address)){
            return true;
            addressErr.textContent = "";
        } else {
            addressErr.textContent = "Adresse incorrect";
            return false;
        }
    };

    // Validation de la value du champ ville
    const city = document.getElementById("city").value;
    const cityErr = document.getElementById("cityErrorMsg");

    function checkCity () {
        if(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(city)) {
            return true;
            cityErr.textContent = "";
        } else {
            cityErr.textContent = "Ville incorrect";
            return false;
        }
    };

    // Validation de la value du champ email
    const email = document.getElementById("email").value;
    const emailErr = document.getElementById("emailErrorMsg");
    
    function checkEmail () {
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return true;
            emailErr.textContent = "";
        } else {
            emailErr.textContent = "Email incorrect";
            return false;
        }
    };

    // Cration d'un objet contenant les informations saisie par l'utilisateur pour effectuer sa commande 
    let contact = {
            firstName : `${firstName}`,
            lastName : `${lastName}`,
            address : `${address}`,
            city : `${city}`,
            email : `${email}`
    };

    // Création d'un tableau contenant les id des produits contenues dans le panier
    let products = [];

    // Récupérations des id des products du panier 
    for(k in productsStorage) {
        const idProducts = productsStorage[k].id;
        
        // On met les id dans le tableau
        products.push(`${idProducts}`);
    };
    console.log(products);

    // Dernière validation champ par champ du formulaire pour envoyer les infos si elles sont correctemet renseignées et qu'il y a bien des produits dans le panier 
    if(checkFirstName() && checkLastName() && checkAdress() && checkCity() && checkEmail() && products.length > 0) {
        // On envoie les infos de l'utilisateur dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));

        // On créé un objet contenant un objet où il y a les infos de l'utilisateur et un tableau contenant les id des produitts que l'uitlisateur veut acheter
        const sendToApi = {
            contact,
            products
        };
        console.log(sendToApi);

        // On envoiee la requête POST à l'api 
        const postOrder = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            // On  lui envoie notre objet contenant la commande de l'utilisateur
            body: JSON.stringify(sendToApi),
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            }
        });
        console.log(postOrder);

        // On traite la réponse de l'api 
        postOrder.then(async(response) => {
            try {
                console.log("response");
                console.log(response);

                // On prend le numéro de commande 
                const contentResponse = await response.json();
                console.log("contentResponse");
                console.log(contentResponse);
                // On envoie le numéro de commande dans le localStorage
                localStorage.setItem("orderNumber", JSON.stringify(contentResponse));
            } catch(e) {
                console.log("e");
                console.log(e);
            }
        });

        // On redirige l'utilisateur vers la page confirmation où il y recevra son numéro de commande
        window.location.href = document.location.origin + "/front/html/confirmation.html";
    // Si un ou plusieurs des champs n'est pas correctement renseigné ou que l'utilisateur n'a pas ajouté de produit au panier     
    }else {
        // On affiche une alerte demandant à l'utilisateur de remplir les champs correctement ou de choisir un produit
        alert("Remplissez les champs correctement. Ou veillez sélectionner un produit");
    };
});



