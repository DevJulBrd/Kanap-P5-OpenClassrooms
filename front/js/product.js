// Récupération de l'id du produit dans l'Url de la page 
const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');
console.log(id);

// Récupération et affichage des infos du produit a partir de son id
const dataProduct = fetch('http://localhost:3000/api/products/'+id);

dataProduct.then(async (responseData) => {
    const response = await responseData.json();
    console.log(response);

    // Affichage de l'image du produit
    const productImgAlt = `<img src="${response.imageUrl}" alt="${response.altTxt}">`;
    const item_img = document.getElementById("item_img");
    item_img.insertAdjacentHTML("afterbegin", productImgAlt);

    // Affichage du nom du produit
    const productName = `${response.name}`; 
    const title = document.getElementById("title");
    title.textContent = productName;

    // Affichage du prix du produit
    const productPrice = `${response.price}`;
    const price = document.getElementById("price");
    price.textContent = productPrice;
        
    // Affichage de la description du produit
    const productDescription = `${response.description}`;
    const description = document.getElementById("description");
    description.textContent = productDescription;

    // Affichage des couleurs du produit
    const colors = response.colors;
    for (let i in colors) {
        const blockColors = `<option value="${colors[i]}">${colors[i]}</option>`;
        const colorSelect = document.getElementById("colors");
        colorSelect.insertAdjacentHTML("beforeend", blockColors); 
    };    
});


// Fonction qui gère l'ajout des produit au local storage en respectant les conditions précisés
const addStorage = (product) => {
    let productStorage = JSON.parse(localStorage.getItem("products"));
    console.log(productStorage);
    
    
    // Si le tableau contient déjà des produits 
    if(productStorage) {
        // On cherche si un produit aillant le même id et la même couleur est déjà dans le tableau
        const result = productStorage.findIndex((p) => p.id == product.id && p.color == product.color);
        // Si result est différent de -1, le produit existe dans le tableau
        if(result !== -1){    
            // On ajoute de 1 la quantité du produit déjà existant dans le tableau
            productStorage[result].quantity++;
        // Si result est égal a -1; le produit n'existe pas dans le tableau
        } else {
            // On ajoute donc ce nouveau produit au tableau 
            productStorage.push(product);
        }
    } 
    // Si le tableau est vide
    else {
        // On initialise le tableau
        productStorage = [];
        productStorage.push(product);
    };
        
    
    // On réinitialise la valeur product dans le local storage
    localStorage.setItem("products", JSON.stringify(productStorage));

};

// Fonction qui envoye les informations sélectionné par l'utilisateur et l'averti si le produit a bien était ajouter au panier
const addToCart = (e) => {
    // Récupération des infos sélectionnés par l'utilisateur mises dans un tableau 
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    const optionsproduct = {
        id: id,
        color: color,
        quantity: quantity
    };


    // Envoie du tableau contenant la couleur et la quantité choisi au localStorage 
    addStorage(optionsproduct)

   

    // Oblige l'utilisateur a sélectionner une couleur + message d'alerte lui demandant dans choisir une 
    if (!color) {
        erreur = "Veuillez choisir une chouleur pour votre produit";
        alert(erreur);
        e.preventDefault();
        return false;
    };
    
    // Affiche de l'alerte
    alert("Votre produit à bien était ajouté au panier");
};

// Envoye les informations sélectionnés par l'utilisateur et affiche un alerte confirmant l'ajoutau panier au click du bouton 
const button = document.getElementById("addToCart");
button.addEventListener("click", addToCart);