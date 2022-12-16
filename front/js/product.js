const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

var id = urlParams.get('id');
console.log(id);

const dataProduct = fetch('http://localhost:3000/api/products/'+id);

dataProduct.then(async (responseData) => {
    const response = await responseData.json();
    console.log(response);

    var productImgAlt = `<img src="${response.imageUrl}" alt="${response.altTxt}">`;
    const item_img = document.getElementById("item_img");
    item_img.insertAdjacentHTML("afterbegin", productImgAlt);

    var productName = `${response.name}`; 
    const title = document.getElementById("title");
    title.textContent = productName;

    var productPrice = `${response.price}`;
    const price = document.getElementById("price");
    price.textContent = productPrice;
        
    var productDescription = `${response.description}`;
    const description = document.getElementById("description");
    description.textContent = productDescription;

    var colors = response.colors;
    for (let i in colors) {
        var blockColors = `<option value="${colors[i]}">${colors[i]}</option>`;
        const colorSelect = document.getElementById("colors");
        colorSelect.insertAdjacentHTML("beforeend", blockColors); 
    };

    
    const goToCart = () => {
        var colorGet = document.getElementById("colors").value;
        var quantityGet = document.getElementById("quantity").value;
        var myProduct = {
            
            id: id,
            color: colorGet,
            quantity: quantityGet
        };
        localStorage.setItem('cotch', JSON.stringify(myProduct));
        document.location.href = document.location.origin + "/front/html/cart.html";
    };

    const button = document.getElementById("addToCart");
    button.addEventListener("click", goToCart);    
});









/*document.getElementById("title").textContent = nom;
document.getElementById("item_img").insertAdjacentHTML("afterbegin", affichageImageAlt);
document.getElementById("description").textContent = description;
document.getElementById("price").textContent = price;


colors = colors.split(",");
for (let i in colors) {
    var blockColors = `<option value="${colors[i]}">${colors[i]}</option>`;
    const colorSelect = document.getElementById("colors");
    colorSelect.insertAdjacentHTML("afterbegin", blockColors); 
};     


const goToCart = () => {
    document.location.href = document.location.origin + `/front/html/cart.html?id=${id}&nom=${nom}&altText=${altText}&image=${img}&description=${description}&price=${price}&colors=${colors}`;
};
const button = document.getElementById("addToCart");

button.addEventListener("click", goToCart);*/

/*const button = document.getElementById("addToCart");
var forCart = `<a href="./cart.html?id=${id}"&nom=${nom}&altText=${altText}&image=${img}&description=${description}&price=${price}&colors=${colors}"></a>`;
button.insertAdjacentHTML("afterbegin", forCart);*/









/*const dataApi = fetch("http://localhost:3000/api/products");

dataApi
    .then(async (responseData) => {
        console.log(responseData);

        const response = await responseData.json();
        console.log(response); 

        try {
// Recuperation data API
            const nom = response[0].name;
            const image = response[0].imageUrl; 
            const alt = response[0].altTxt;
            const description = response[0].description;
            const prix = response[0].price;
            const couleurs = response[0].colors;

//Affichage Nom, Description et prix 
            const affichage_nom = document.querySelector("#title");
            const affichage_description = document.querySelector("#description");
            const affichage_prix = document.querySelector("#price");

            affichage_nom.innerText = nom;
            affichage_description.innerText = description;
            affichage_prix.innerText = prix;

//Affichage Image et Alt 
            const image01Alt = `<img src="${image}" alt="${alt}">`;
            const affichage_image_alt = document.querySelector("#item_img");

            affichage_image_alt.insertAdjacentHTML("afterbegin", image01Alt);

//Affichage choix Couleurs
            const choix = `<option value="${couleurs[0]}">Bleu</option><option value="${couleurs[1]}">Blanc</option><option value="${couleurs[2]}">Noir</option>`;
            const affichage_couleurs = document.querySelector("#colors");

            affichage_couleurs.insertAdjacentHTML("beforeend", choix);



        } catch (err) {
            console.log(err);
        }
    })

    .catch((err) => {
        console.log(err);
    });
*/   
