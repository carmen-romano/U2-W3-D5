const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const URL_STRIVE = "https://striveschool-api.herokuapp.com/api/product/";
const details = () => {
  fetch(URL_STRIVE + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
    .then((prodotto) => {
      console.log("Prodotto:", prodotto);
      let imgProduct = document.getElementById("imgProduct");
      imgProduct.src = prodotto.imageUrl;
      let title = document.getElementById("title");
      title.innerText = prodotto.name;

      let cardBody = document.getElementById("card-body");
      let description = document.createElement("p");
      description.innerText =
        "Descrizione: " + prodotto.name + prodotto.description;
      let brand = document.createElement("p");
      brand.innerText = "Brand: " + prodotto.brand;
      let price = document.createElement("p");
      price.innerText = "Prezzo: € " + prodotto.price;

      let idSmall = document.getElementById("idSmall");
      idSmall.innerText = "ID: " + prodotto._id;

      cardBody.appendChild(description);
      cardBody.appendChild(brand);
      cardBody.appendChild(price);
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

window.onload = () => {
  details();
};
