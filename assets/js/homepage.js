const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzdiZmYyMDE4YzAwMTU5MDc0NDciLCJpYXQiOjE3Mzc3MTc2OTUsImV4cCI6MTczODkyNzI5NX0.jk5xjJv1mlICSGtd1fZV0skqJntJz_evqWR_R4S9zdE";
const url = "https://striveschool-api.herokuapp.com/api/product/";

const key = "pokèmons";
let cart = JSON.parse(localStorage.getItem(key));

// Registro l'anno attuale da mettere con la logica ai footer di tutte le pagine.

const yearSpan = document.getElementById("current-year");
yearSpan.innerText = new Date().getFullYear();

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

// Vado a crearmi la logica che mi permetterà di far visualizzare uno "spinner" al caricamento dei dati dallo storage, quindi dal server.

fetch(url, {
  headers: {
    Authorization: apiKey,
  },
})
  .then((response) => {
    console.log("RESPONSE", response);
    if (response.ok) {
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      return response.json();
    } else {
      throw new Error("No ok");
    }
  })
  .then((arrayOfPokèmons) => {
    console.log(arrayOfPokèmons);
    const row = document.getElementById("shop");
    arrayOfPokèmons.forEach((pokè) => {
      // Questo mi genera tante colonne card per quanti elementi sono presenti nel server. Ovviamente unisco l'utile al dilettevole, quindi creandomi a priori delle classi per le card, rendendole responsive.
      const newCol = document.createElement("div");
      newCol.classList.add("col", "col-12", "col-md-6", "col-lg-4", "d-flex", "align-items-stretch");
      newCol.innerHTML = `
            <div class="card mt-3 w-100" id="genitoreFoto">
                <img onclick="window.location.href = 'details.html?id=${"" + pokè._id}'" src=" ${
        pokè.imageUrl
      }" class="card-img-top h-50 object-fit-fill transition hover-zoom" id="fotoPokè" alt="${pokè.name}">
                <div class="card-body text-center">
                    <h5 class="card-title mb-5"><a class="text-decoration-none text-black" href="details.html?id=${
                      "" + pokè._id
                    }">${pokè.name}</a></h5>
                    <p class="card-text mb-2">Tipo : ${pokè.brand}</p>
                    <p class="card-text mb-2">Livello: ${pokè.description}
                    <p class="card-text mb-2">Prezzo: €${pokè.price}
                </div>    
                <div class="card-footer d-flex justify-content-between bg-white">
                    <a href="details.html?id=${"" + pokè._id}" class="btn btn-outline-success">Dettagli</a>
                    <a href="backoffice.html?id=${"" + pokè._id}" class="btn btn-outline-warning">Modifica</a>
                </div>    
            </div>
        `;
      row.appendChild(newCol);
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

// Provo a implementare la stessa funzione della scroll di Medium, quindi si attacca alla parte superiore dello scroll e il background cambia leggermente, così' da permettere una fluidità maggiore della pagina.

window.addEventListener("scroll", function () {
  var navbar = document.getElementById("barra");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

let audioPokèmon = document.getElementById("audio");
audioPokèmon.volume = 0.03;

function outputUpdate(vol) {
  var audiolevel = document.getElementById("audio");
  audiolevel.volume = vol;
}

function playSound() {
  var sound = document.getElementById("audio");
  sound.play();
}

function pauseSound() {
  var sound = document.getElementById("audio");
  sound.pause();
}
