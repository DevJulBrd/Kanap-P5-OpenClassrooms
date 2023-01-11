// On récupère le numéro de commande envoyé par l'api du localStorage
let orderNumber = JSON.parse(localStorage.getItem("orderNumber"));
console.log(orderNumber);

// On affiche le numéro de commance de l'utilisateur 
const orderId = document.querySelector("#orderId");
orderId.textContent = orderNumber.orderId;

// On efface tout ce que contient le localStorage
localStorage.clear();