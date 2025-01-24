const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNzdiZmYyMDE4YzAwMTU5MDc0NDciLCJpYXQiOjE3Mzc3MTc2OTUsImV4cCI6MTczODkyNzI5NX0.jk5xjJv1mlICSGtd1fZV0skqJntJz_evqWR_R4S9zdE";
const url = "https://striveschool-api.herokuapp.com/api/product/";

// Registro l'anno attuale da mettere con la logica ai footer di tutte le pagine.

const yearSpan = document.getElementById("current-year");
yearSpan.innerText = new Date().getFullYear();
