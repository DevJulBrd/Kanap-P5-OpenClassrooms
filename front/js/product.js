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

const addStorage = (product) => {
    let productStorage = JSON.parse(localStorage.getItem("product"));
    const result = productStorage.some((p)=> p.id === product.id && p.color === product.color);
    console.log(result)
     /*if (productStorage) {
        productStorage.push(product);
        localStorage.setItem('product', JSON.stringify(productStorage));
    }
    else {
        productStorage = [];
        productStorage.push(product);
        localStorage.setItem('product', JSON.stringify(productStorage));
    }*/

};

// Fonction qui envoye les informations sélectionné par l'utilisateur et le dirige vers la page panier
const goToCart = (e) => {
    // Récupération des infos sélectionné par l'utilisateur mises dans un tableau 
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
    
    // Dirige l'utilisateur vers la page panier 
   // document.location.href = document.location.origin + "/front/html/cart.html";
};

// Envoye les informations sélectionnés par l'utilisateur et le dirige vers la page panier au click du bouton 
const button = document.getElementById("addToCart");
button.addEventListener("click", goToCart);