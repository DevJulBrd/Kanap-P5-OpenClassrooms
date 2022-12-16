// Page index, mise en place des cartes avec infos de l'API

const dataApi = fetch("http://localhost:3000/api/products");

dataApi.then(async (responseData) => {
    const response = await responseData.json();
    console.log(response); 

    for (var i in response) {
        var blockCanap = `<a href="./product.html?id=${response[i]._id}"><article><img src="${response[i].imageUrl}" alt="${response[i].altTxt}"><h3 class="productName">${response[i].name}</h3><p class="productionDescription">${response[i].description}</p></article></a>`;
        const items = document.getElementById("items");
        items.insertAdjacentHTML("afterbegin", blockCanap);
    };
});