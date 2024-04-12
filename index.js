const URL_STRIVE = "https://striveschool-api.herokuapp.com/api/product/";

const createElement = () => {
  fetch(URL_STRIVE, {
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
    .then((products) => {
      console.log("Prodotti creati con successo:", products);
      products.forEach((product) => {
        let container = document.getElementById("container");
        let col = document.createElement("div");
        col.classList.add("col", "mb-5", "col-md-4");

        let imgCard = document.createElement("img");
        imgCard.src = product.imageUrl;
        imgCard.classList.add("card-img-top");
        imgCard.onclick = () => {
          window.location.href = "details.html?id=" + product._id;
        };

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "text-center");

        let title = document.createElement("h5");
        title.classList.add("card-title", "fw-bold", "mt-3");
        title.textContent = product.brand + " " + product.name;

        let p = document.createElement("p");
        p.classList.add("card-text", "text-danger", "fw-bold", "fs-4");
        p.textContent = `€` + product.price;

        let btnAdmin = document.createElement("button");
        btnAdmin.classList.add("btn", "btn-outline-success");
        btnAdmin.innerText = "Modifica";
        btnAdmin.onclick = () => {
          window.location.href = "backoffice.html?id=" + product._id;
        };

        container.appendChild(col);
        col.appendChild(imgCard);
        col.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(p);
        cardBody.appendChild(btnAdmin);
      });
    })
    .catch((error) => {
      console.error("Errore:", error);
    });
};

window.onload = () => {
  createElement();
};
