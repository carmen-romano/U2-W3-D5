const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const URL_STRIVE = "https://striveschool-api.herokuapp.com/api/product/";
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";

let btnReset = document.getElementById("resetBtn");
let btnInvia = document.getElementById("inviaDati");
let form = document.getElementById("formBackOffice");

const nameProduct = document.getElementById("nomeProdotto");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const url = document.getElementById("url");
const price = document.getElementById("price");
///richiesta

const getRequest = () => {
  if (id) {
    fetch(URL_STRIVE + id, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGNiNjdmMzA0NjAwMWFlNTlmNTIiLCJpYXQiOjE3MTI5MDUzOTgsImV4cCI6MTcxNDExNDk5OH0.pExfN1ObFRECM0u3t85jrEzssbuNE_rtZoZxqM4KwyI",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta HTTP");
        }
        return response.json();
      })
      .then((data) => {
        nameProduct.value = data.name;
        description.value = data.description;
        brand.value = data.brand;
        url.value = data.imageUrl;
        price.value = data.price;
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  }
};

////CREAZIONE

btnInvia.innerText = "Modifica";
const strive = () => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const productData = {
      name: nameProduct.value,
      description: description.value,
      brand: brand.value,
      imageUrl: url.value,
      price: parseFloat(price.value),
    };

    const method = id ? "PUT" : "POST";

    fetch(URL, {
      method: method,
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZGNiNjdmMzA0NjAwMWFlNTlmNTIiLCJpYXQiOjE3MTI5MDUzOTgsImV4cCI6MTcxNDExNDk5OH0.pExfN1ObFRECM0u3t85jrEzssbuNE_rtZoZxqM4KwyI",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Err");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Prodotto creato/modificato con successo:", data);
        let divAlert = document.createElement("div");
        divAlert.classList.add("alert", "alert-success");
        divAlert.innerText = id
          ? "Prodotto modificato con successo!"
          : "Prodotto creato con successo!";
        document.querySelector("header").appendChild(divAlert);
        form.reset();
        setTimeout(() => {
          divAlert.remove();
        }, 1500);
      })
      .catch((error) => {
        console.error("Errore:", error);
        let divAlert = document.createElement("div");
        divAlert.innerText = error;
        divAlert.classList.add("alert", "alert-danger");
        document.querySelector("header").appendChild(divAlert);
        setTimeout(() => {
          divAlert.remove();
        }, 3000);
      });
  });
};

window.onload = () => {
  if (id) {
    btnInvia.innerText = "Modifica";
  } else {
    btnInvia.innerText = "Crea";
  }
  getRequest();
  strive();
};
