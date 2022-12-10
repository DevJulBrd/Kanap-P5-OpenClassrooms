// Page index, mise en place des carte avec infos de l'API

const dataApi = fetch("http://localhost:3000/api/products");

dataApi
    .then(async (responseData) => {
        

        const response = await responseData.json();
        console.log(response); 

        try {
// Recuperation data API
            const nom1 = response[0].name;
            const image1 = response[0].imageUrl; 
            const alt1 = response[0].altTxt;
            const description1 = response[0].description;
            const lien1 = response[0]._id;

            const nom2 = response[1].name;
            const image2 = response[1].imageUrl; 
            const alt2 = response[1].altTxt;
            const description2 = response[1].description;
            const lien2 = response[1]._id;

            const nom3 = response[2].name;
            const image3 = response[2].imageUrl; 
            const alt3 = response[2].altTxt;
            const description3 = response[2].description;
            const lien3 = response[2]._id;

            const nom4 = response[3].name;
            const image4 = response[3].imageUrl; 
            const alt4 = response[3].altTxt;
            const description4 = response[3].description;
            const lien4 = response[3]._id;

            const nom5 = response[4].name;
            const image5 = response[4].imageUrl; 
            const alt5 = response[4].altTxt;
            const description5 = response[4].description;
            const lien5 = response[4]._id;

            const nom6 = response[5].name;
            const image6 = response[5].imageUrl; 
            const alt6 = response[5].altTxt;
            const description6 = response[5].description;
            const lien6 = response[5]._id;

            const nom7 = response[6].name;
            const image7 = response[6].imageUrl; 
            const alt7 = response[6].altTxt;
            const description7 = response[6].description;
            const lien7 = response[6]._id;

            const nom8 = response[7].name;
            const image8 = response[7].imageUrl; 
            const alt8 = response[7].altTxt;
            const description8 = response[7].description;
            const lien8 = response[7]._id;

// Positionnement des éléments 
            const items = document.getElementById("items");
            const blockCanap1 = `<a href="./product.html?id=${lien1}"><article><img src="${image1}" alt="${alt1}"><h3 class="productName">${nom1}</h3><p class="productionDescription">${description1}</p></article></a>`;
            const blockCanap2 = `<a href="./product.html?id=${lien2}"><article><img src="${image2}" alt="${alt2}"><h3 class="productName">${nom2}</h3><p class="productionDescription">${description2}</p></article></a>`;
            const blockCanap3 = `<a href="./product.html?id=${lien3}"><article><img src="${image3}" alt="${alt3}"><h3 class="productName">${nom3}</h3><p class="productionDescription">${description3}</p></article></a>`;
            const blockCanap4 = `<a href="./product.html?id=${lien4}"><article><img src="${image4}" alt="${alt4}"><h3 class="productName">${nom4}</h3><p class="productionDescription">${description4}</p></article></a>`;
            const blockCanap5 = `<a href="./product.html?id=${lien5}"><article><img src="${image5}" alt="${alt5}"><h3 class="productName">${nom5}</h3><p class="productionDescription">${description5}</p></article></a>`;
            const blockCanap6 = `<a href="./product.html?id=${lien6}"><article><img src="${image6}" alt="${alt6}"><h3 class="productName">${nom6}</h3><p class="productionDescription">${description6}</p></article></a>`;
            const blockCanap7 = `<a href="./product.html?id=${lien7}"><article><img src="${image7}" alt="${alt7}"><h3 class="productName">${nom7}</h3><p class="productionDescription">${description7}</p></article></a>`;
            const blockCanap8 = `<a href="./product.html?id=${lien8}"><article><img src="${image8}" alt="${alt8}"><h3 class="productName">${nom8}</h3><p class="productionDescription">${description8}</p></article></a>`;


// Affichage des cartes
            items.insertAdjacentHTML("afterbegin", blockCanap8);
            items.insertAdjacentHTML("afterbegin", blockCanap7);
            items.insertAdjacentHTML("afterbegin", blockCanap6);
            items.insertAdjacentHTML("afterbegin", blockCanap5);
            items.insertAdjacentHTML("afterbegin", blockCanap4);
            items.insertAdjacentHTML("afterbegin", blockCanap3);
            items.insertAdjacentHTML("afterbegin", blockCanap2);
            items.insertAdjacentHTML("afterbegin", blockCanap1);

        } catch (err) {
            console.log(err);
        }
    })

    .catch((err) => {
        console.log(err);
    });





    /*const square = (a,b) =>{
        return a*b;
    }*/


/*const dataApi = fetch("http://localhost:3000/api/products");

dataApi
    .then(async (responseData) => {
        const responses = await responseData.json();
        console.log(responses);
    
        for(let i in responses) {
        const nom = response.name;
        const image = response.imageUrl; 
        const alt = response.altTxt;
        const description = response.description;

        const affichage_nom = document.querySelector("#items");
        const nomSlot = `<h3 class="productName">${nom}</h3>`;

        affichage_nom.insertAdjacentHTML("afterbegin", nomSlot);



        }
    })

    .catch((err) => {
        console.log(err);
    });*/


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

            const imageAltSlot = `<img src="${image}" alt="${alt}">`;
            const nomSlot = `<h3 class="productName">${nom}</h3>`;
            const descriptionSlot = `<p class="productDescription">${description}</p>`

            const lien = document.createElement("a");
            
        

        } catch (err) {
            console.log(err);
        }
    })

    .catch((err) => {
        console.log(err);
    });

*/