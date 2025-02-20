function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const userId = getQueryParam("id_Usuario");


const reservationGET = `http://localhost:3800/reservation/list-by-user/${userId}`;
const recordContainer = document.getElementById("recordContainer");

const list = async () => {
  try {
    const response = await fetch(reservationGET, {
      method: "GET",
    });

    if (!response.ok) {

      const error = document.createElement("p");

      error.textContent = "No tienes ninguna reserva actualmente.";
      error.style.color = "red";
      error.style.fontWeight = "bold";
      error.style.marginTop = "10px";


      recordContainer.appendChild(error);


      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    data.data.forEach((item) => {
      const fecha = document.createElement("p");
      const row = document.createElement("p");
      const column = document.createElement("p");
      const proyeccion = document.createElement("p");

      const card = document.createElement("div");

      card.className ="card p-2 m-2";

      fecha.textContent = "Fecha de la reserva: " + item.fecha;
      row.textContent = "Fila: " + item.butaca.row;
      column.textContent = "Columna: " + item.butaca.column;
      proyeccion.textContent = "Hora: " + item.proyeccion.horario;

      card.appendChild(fecha);
      card.appendChild(row);

      card.appendChild(column);

      card.appendChild(proyeccion);

      recordContainer.appendChild(card);
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

list();
