function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


const datosSerializados = getQueryParam("datos");
const green_seat = "../../seats-icons/green-seat.png";
const red_seat = "../../seats-icons/red-seat.png";
const sala = getQueryParam("sala");
const salaName = getQueryParam("salaName");
const proyeccionStr = getQueryParam("proyeccion");
const proyeccion = JSON.parse(decodeURIComponent(proyeccionStr));

const subtitle = document.querySelector("h2");

subtitle.style.color = "blue";
subtitle.style.fontSize = "1em";
subtitle.style.fontFamily = "Arial, sans-serif";
subtitle.style.textAlign = "center";
subtitle.style.marginTop = "20px";
subtitle.style.padding = "10px";

const screenImage = document.getElementById("screenImage");

screenImage.style.width = "30%";

const salaNameContainer = document.getElementById("salaNameContainer");

const salaNameTitle = document.createElement("h1");
salaNameTitle.textContent = "Sala: " + salaName+" "+proyeccion.horario;

salaNameTitle.style.color = "blue";
salaNameTitle.style.fontSize = "2em";
salaNameTitle.style.fontFamily = "Arial, sans-serif";
salaNameTitle.style.textAlign = "center";
salaNameTitle.style.marginTop = "20px";
salaNameTitle.style.padding = "10px";

salaNameContainer.appendChild(salaNameTitle);

const getSeats = `http://localhost:3800/seat/list-by-screen/${sala}`;
const getReservations = `http://localhost:3800/reservation/list-by-projection/${proyeccion.id}`;
const idOcupedReservations = new Set();
const reservationVerification = async () => {
  try {
    const response = await fetch(getReservations, { method: "GET" });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const Responsedata = await response.json();

    Responsedata.data.forEach((item) =>
      idOcupedReservations.add(item.id_Butaca)
    );
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

const list = async () => {
  try {
    const response = await fetch(getSeats, { method: "GET" });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const Responsedata = await response.json();
    const seatsContainer = document.getElementById("seatsContainer");

    seatsContainer.style.padding = "5%";

    Responsedata.data.forEach((item) => {
      const image = document.createElement("img");
      const imageClick = document.createElement("a");

      

      if (idOcupedReservations.has(item.id)) {
        image.src = red_seat;
      } else {


        image.addEventListener("mouseover", () => {
          image.style.transform = "scale(1.3)";
        });
  
        image.addEventListener("mouseout", () => {
          image.style.transform = "scale(1)";
        });


        image.src = green_seat;

        imageClick.addEventListener("click", function () {
         
          const butacaStr = encodeURIComponent(JSON.stringify(item));

          window.location.href = `./reservation.html?butaca=${butacaStr}&&proyeccion=${proyeccionStr}`;
        });
      }
      image.style.margin = "5%";
      image.style.width = "9%";



      imageClick.appendChild(image);
      seatsContainer.appendChild(imageClick);
    });
  } catch (error) {
    console.error("Hubo un problema con la petición:", error);
  }
};

const init = async () => {
  await reservationVerification();
  await list();
};

init();
