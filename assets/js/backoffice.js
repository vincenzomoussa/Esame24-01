// Come prima cosa mi creo due costanti che indicano il tipo di autorizzazione richiesta dal server e l'indirizzo del server stesso.

const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzdiZmYyMDE4YzAwMTU5MDc0NDciLCJpYXQiOjE3Mzc3MTc2OTUsImV4cCI6MTczODkyNzI5NX0.jk5xjJv1mlICSGtd1fZV0skqJntJz_evqWR_R4S9zdE";
const url = "https://striveschool-api.herokuapp.com/api/product/";

// Creo una classe costruttrice, in modo che all'inserimento dei dati nel form del backoffice, questo mi crea una "copia" di quest'oggetto e lo spinge direttamente nell'array di oggetti disponibili nel server.

class Pokèmon {
  constructor(brand, name, description, imageUrl, price) {
    this.brand = brand;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }
}

// Inizializzo le costanti e le definisco, saranno le stesse che "daranno vita" ai Pokèmon.

const brandInput = document.getElementById("brand");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

const addressBarContent = new URLSearchParams(window.location.search);
const id = addressBarContent.get("id");

if (id) {
  fetch(url + id, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No ok");
      }
    })
    .then((pokèmon) => {
      document.getElementById("brand").value = pokèmon.brand;
      document.getElementById("name").value = pokèmon.name;
      document.getElementById("description").value = pokèmon.description;
      document.getElementById("imageUrl").value = pokèmon.imageUrl;
      document.getElementById("price").value = pokèmon.price;
      const buttons = document.getElementById("buttons");
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("type", "button");
      deleteButton.classList.add("btn", "btn-danger", "mt-3");
      deleteButton.innerText = "LIBERA POKEMON";
      deleteButton.setAttribute("data-bs-toggle", "modal");
      deleteButton.setAttribute("data-bs-target", "#delete-modal");
      const yesDelete = document.getElementById("yes-delete");
      yesDelete.addEventListener("click", () => {
        deletePokèmon(pokèmon._id);
        window.location.replace("backoffice.html");
        // Faccio il reset della pagina, in modo che non crei conflitti con la successiva creazione di nuovi Pokèmon e i loro ID
      });
      buttons.appendChild(deleteButton);
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
} else {
}

const deletePokèmon = function (id) {
  fetch(url + id, {
    method: "DELETE",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Liberato");
      } else {
        if (response.status === 500) {
          alert("Problema del server");
        }
        throw new Error("No ok");
      }
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
};

// Mi creo una funzione e la associo a un bottone che mi permetterà, dopo un avviso, di poter resettare i campi del form creato per "dare vita" ai Pokèmon.

const yesReset = document.getElementById("yes-reset");
yesReset.addEventListener("click", () => {
  brandInput.value = "";
  nameInput.value = "";
  descriptionInput.value = "";
  imageUrlInput.value = "";
  priceInput.value = "";
});

const form = document.getElementById("creation-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newPokèmon = new Pokèmon(
    brandInput.value,
    nameInput.value,
    descriptionInput.value,
    imageUrlInput.value,
    priceInput.value
  );
  console.log(newPokèmon);

  let putOrPost = id ? "PUT" : "POST";

  let idOrNotIdUrl = id ? url + id : url;

  // Dopo la creazione di un Pokèmon, gli input del form si resettano, quindi spingendo l'elemento creato nell'array del server e dandomi la possibilità di crearne un altro.

  fetch(idOrNotIdUrl, {
    method: putOrPost,
    body: JSON.stringify(newPokèmon),
    headers: {
      "Content-Type": "application/JSON",
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("ok");
        brandInput.value = "";
        nameInput.value = "";
        descriptionInput.value = "";
        imageUrlInput.value = "";
        priceInput.value = "";
        window.location.replace("backoffice.html");
      } else {
        if (response.status === 500) {
          alert("Problema del server");
        }
        throw new Error("No ok");
      }
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
});
