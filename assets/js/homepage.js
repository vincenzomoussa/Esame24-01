const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzdiZmYyMDE4YzAwMTU5MDc0NDciLCJpYXQiOjE3Mzc3MTc2OTUsImV4cCI6MTczODkyNzI5NX0.jk5xjJv1mlICSGtd1fZV0skqJntJz_evqWR_R4S9zdE";
const url = "https://striveschool-api.herokuapp.com/api/product/";

const key = "pokèmons";
let cart = JSON.parse(localStorage.getItem(key));

// Inizialmente mi vado a prendere il nodo del carrello dall'html, lo collego al local storage e gli permetto di calcolare gli elementi al suo interno, man mano che vengono inseriti.
const newShoppingCart = function () {
  const shoppingCartDiv = document.getElementById("shopping-cart");
  shoppingCartDiv.innerText = "";
  const cart = JSON.parse(localStorage.getItem(key));
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      // Creo dei contenitori all'interno dell'offcanvas, quindi al momento dell'inserimento di qualche prodotto, il carrello si popola di quest'ultimi calcolando anche il totale di tali prodotti.
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
        // Il bottone accanto al prodotto nel carrello (la spazzatura), lo elimina dal carrello stesso.
        cart.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(cart));
        newShoppingCart();
      });

      totalPrice = 0;
      if (localStorage.getItem(key)) {
        let partial = JSON.parse(localStorage.getItem(key));
        for (let i = 0; i < partial.length; i++) {
          totalPrice += Number(partial[i].price);
          //  Calcolo del prezzo aggiornato ad ogni cambiamento del carrello, al singolo inserimento o eliminazione di prodotti.
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
