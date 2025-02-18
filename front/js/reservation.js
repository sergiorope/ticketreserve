const token = localStorage.getItem("authToken");

const reservationPOST = "http://localhost:3800/reservation/create";

console.log(token);

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const labelRow = document.getElementById("row");
const labelColumn = document.getElementById("column");
const containerMessage = document.getElementById("containerMessage");

const labelPelicula = document.getElementById("film");
const labelSala = document.getElementById("screen");

const reservationContainer = document.getElementById("reservationContainer");

reservationContainer.style.border = "2px solid rgb(0, 0, 0)";
reservationContainer.style.borderRadius = "10px";
reservationContainer.style.padding = "20px";
reservationContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

reservationContainer.style.display = "inline-block";
reservationContainer.style.width = "fit-content";

reservationContainer.style.margin = "0 auto";

const butacaStr = getQueryParam("butaca");
const proyeccionStr = getQueryParam("proyeccion");

const butacaObj = JSON.parse(decodeURIComponent(butacaStr));
const proyeccionObj = JSON.parse(decodeURIComponent(proyeccionStr));

labelRow.textContent = "Fila: " + butacaObj.row;
labelColumn.textContent = "Columna: " + butacaObj.column;
labelPelicula.textContent = "Pelicula: " + proyeccionObj.pelicula.name;
labelSala.textContent = "Sala: " + proyeccionObj.sala.name;

const data = {
  token: token,
  id_Butaca: butacaObj.id,
  id_Proyeccion: proyeccionObj.id,
};

console.log(data);

const create = async () => {
  const response = await fetch(reservationPOST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {

    
    const errorResponse = await response.json();
    const errorMessage =
      errorResponse.message || "Ocurrió un error inesperado.";

    const error = document.createElement("p");
    error.textContent = errorMessage;
    error.style.color = "red";
    error.style.fontWeight = "bold";
    error.style.marginTop = "10px";

    containerMessage.appendChild(error);

    setTimeout(() => {
      containerMessage.removeChild(error);
    }, 5000);

    throw new Error("La petición no obtuvo respuesta");
  }

  window.location.href = `./index.html`;


  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 10;

  doc.setFontSize(16);
  doc.text("Factura Butaca", 10, y);
  y += 10;

  doc.setLineWidth(0.5);
  doc.line(10, y, 200, y);
  y += 5;

  doc.setFontSize(12);
  doc.text("Fila: " + butacaObj.row + " Columna: " + butacaObj.column, 10, y);
  y += 10;

  doc.text("Proyección: " + proyeccionObj.pelicula.name, 10, y);
  y += 10;

  doc.text("Sala: " + proyeccionObj.sala.name, 10, y);
  y += 10;

  doc.setLineWidth(0.5);
  doc.line(10, y, 200, y);
  y += 5;

  doc.text("Precio: 6,50€", 10, y);

  doc.save(
    "TicketReserve" +
      butacaObj.row +
      butacaObj.column +
      proyeccionObj.pelicula.name +
      ".pdf"
  );
};

document
  .getElementById("reservationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    create();
  });
