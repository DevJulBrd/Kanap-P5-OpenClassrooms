const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');
console.log(id);

const dataProduct = fetch('http://localhost:3000/api/products/'+id);

dataProduct.then(async (responseData) => {
    const response = await responseData.json();
    console.log(response);

    const productImgAlt = `<img src="${response.imageUrl}" alt="${response.altTxt}">`;
    const item_img = document.getElementById("item_img");
    item_img.insertAdjacentHTML("afterbegin", productImgAlt);

    const productName = `${response.name}`; 
    const title = document.getElementById("title");
    title.textContent = productName;

    const productPrice = `${response.price}`;
    const price = document.getElementById("price");
    price.textContent = productPrice;
        
    const productDescription = `${response.description}`;
    const description = document.getElementById("description");
    description.textContent = productDescription;

    const colors = response.colors;
    for (let i in colors) {
        const blockColors = `<option value="${colors[i]}">${colors[i]}</option>`;
        const colorSelect = document.getElementById("colors");
        colorSelect.insertAdjacentHTML("beforeend", blockColors); 
    };
    
    const goToCart = (e) => {
        const color = document.getElementById("colors").value;
        const quantity = document.getElementById("quantity").value;
        const optionsproduct = {
            id: id,
            color: color,
            quantity: quantity
        };
        let productStorage = JSON.parse(localStorage.getItem("product"));
        const addStorage = () => {
            productStorage.push(optionsproduct);
            localStorage.setItem('product', JSON.stringify(productStorage));
        };

        if (productStorage) {
            addStorage(); 
        }
        else {
            productStorage = [];
            addStorage();
        }
        if (!color) {
            erreur = "Veuillez choisir une chouleur pour votre produit";
            alert(erreur);
            e.preventDefault();
            return false;
        };
        
        document.location.href = document.location.origin + "/front/html/cart.html";
    };

    const button = document.getElementById("addToCart");
    button.addEventListener("click", goToCart);    
});
