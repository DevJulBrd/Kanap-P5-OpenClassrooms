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
