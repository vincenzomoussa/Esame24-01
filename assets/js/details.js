const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzdiZmYyMDE4YzAwMTU5MDc0NDciLCJpYXQiOjE3Mzc3MTc2OTUsImV4cCI6MTczODkyNzI5NX0.jk5xjJv1mlICSGtd1fZV0skqJntJz_evqWR_R4S9zdE";

// Registro l'anno attuale da mettere con la logica ai footer di tutte le pagine.

const yearSpan = document.getElementById("current-year");
yearSpan.innerText = new Date().getFullYear();

const addressBarContent = new URLSearchParams(window.location.search);
const id = addressBarContent.get("id");
const url = `https://striveschool-api.herokuapp.com/api/product/${id}`;
const img = document.getElementsByTagName("img")[1];
const title = document.getElementsByClassName("card-title")[0];
const p1 = document.getElementsByClassName("card-text")[0];
const p2 = document.getElementsByClassName("card-text")[1];
const p3 = document.getElementsByClassName("card-text")[2];
const main = document.getElementsByTagName("main")[0];
const redButton = document.querySelector(".btn-danger");
const buyButton = document.querySelector(".btn-success");
const key = "pokèmons";
let cart = JSON.parse(localStorage.getItem(key));

// Stesso pezzo di codice per il carrello dell'homepage, la logica è sempre la stessa.
const newShoppingCart = function () {
  const shoppingCartDiv = document.getElementById("shopping-cart");
  shoppingCartDiv.innerText = "";
  const cart = JSON.parse(localStorage.getItem(key));
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      // Idem per i div nell'offcanvas, li ho ricopiati dalla logica collegata alla homepage, visto che il funzionamento è uguale.
      const newItem = document.createElement("div");
      newItem.classList.add("d-flex", "justify-content-between");
      newItem.innerHTML = `
      <p class="mb-0">${cart[i].name}</p>
      <div class="d-flex mb-3">
        <p class="text-nowrap mb-0">€ ${cart[i].price}</p>
        <button class="border border-0 bg-white delete"><i class="fas fa-trash-alt"></i></button>
      </div>`;
      shoppingCartDiv.appendChild(newItem);

      const button = document.getElementsByClassName("delete")[i];
      button.addEventListener("click", () => {
        // Bottone trash collegato nel carrello accanto a ogni elemento, proprio come nella homepage.
        cart.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(cart));
        newShoppingCart();
      });

      totalPrice = 0;
      if (localStorage.getItem(key)) {
        let partial = JSON.parse(localStorage.getItem(key));
        for (let i = 0; i < partial.length; i++) {
          totalPrice += Number(partial[i].price);
          //   Prezzo aggiornato, proprio come nella homepage, quindi stessa logica
        }
      }
      const total = document.getElementById("total");
      total.innerText = `€ ${totalPrice.toFixed(2)}`;
    }
  } else {
    const total = document.getElementById("total");
    total.innerText = "€ 0";
  }
};

if (cart) {
} else {
  cart = [];
}

newShoppingCart();

// Stesso spinner della homepage, ma anzichè caricare tutti i prodotti, mi carica quello con lo stesso ID scelto da modificare.

fetch(url, {
  headers: {
    Authorization: apiKey,
  },
})
  .then((response) => {
    console.log(response);
    if (response.ok) {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      return response.json();
    } else {
      throw new Error("No ok");
    }
  })
  .then((pokè) => {
    // Genera i dettagli per la card selezionata
    img.src = pokè.imageUrl;
    title.textContent = pokè.name;
    p1.textContent = "Tipo: " + pokè.brand;
    p2.textContent = "Livello: " + pokè.description;
    p3.textContent = "Prezzo: €" + pokè.price;
    redButton.addEventListener("click", function () {
      window.location.href = `./backoffice.html?id=${pokè._id}`;
    });
    buyButton.addEventListener("click", () => {
      alert("Pokèmon aggiunto al tuo carrello!");
      cart.push(pokè);
      localStorage.setItem(key, JSON.stringify(cart));
      newShoppingCart();
    });
  })
  .catch((error) => {
    console.log("ERROR", error);
    if (response.status === 500) {
      alert("Problema del server");
    }
    if (response.status === 429) {
      alert("Server overloadaed");
    }
    alert("Assenza di connessione...");
  });
