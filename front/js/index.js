const getFilm = "http://localhost:3800/projection/list";
const userInfo = "http://localhost:3800/user/info";
const token = localStorage.getItem("authToken");

const welcomeContainer = document.getElementById("welcome");
const reservationsContainer = document.getElementById("reservationsContainer");
const filmContainer = document.querySelector(".filmContainer");

const logContainer = document.getElementById("log");

const titulo = document.querySelector("h1");

titulo.style.color = "#ffcc00";
titulo.style.fontSize = "3rem";
titulo.style.fontWeight = "bold";
titulo.style.fontFamily = "Arial, sans-serif";
titulo.style.textShadow = "3px 3px 10px rgba(255, 204, 0, 0.5)";
titulo.style.textAlign = "center";
titulo.style.padding = "20px";
titulo.style.backgroundColor = "#758391";

const list = async () => {
  try {
    const response = await fetch(getFilm, {
      method: "GET",
    });

    if (!response.ok) {

      const error = document.createElement("p");

      error.textContent = "No hay ninguna proyección actualmente.";
      error.style.color = "red";
      error.style.fontWeight = "bold";
      error.style.marginTop = "10px";



      filmContainer.appendChild(error);

      throw new Error("Network response was not ok");
    }

    const data = await response.json();


    

    data.projectionList.forEach((item) => {
      const contenedor = document.createElement("div");
      contenedor.className = "filmItem";
      contenedor.style.margin = "5%";
      contenedor.style.transition = "transform 0.2s ease-in-out";
      contenedor.id = "contenedorProjection";

      contenedor.addEventListener("mouseover", () => {
        contenedor.style.transform = "scale(1.1)";
      });

      contenedor.addEventListener("mouseout", () => {
        contenedor.style.transform = "scale(1)";
      });

      contenedor.addEventListener("click", function () {
        const sala = encodeURIComponent(item.sala.id);
        const salaName = encodeURIComponent(item.sala.name);
        const proyeccionStr = encodeURIComponent(JSON.stringify(item));

        if (!token) {
          window.location.href = `./login.html`;
        } else {
          window.location.href = `./screen.html?sala=${sala}&&proyeccion=${proyeccionStr}&&salaName=${salaName}`;
        }
      });

      const horario = document.createElement("p");
      horario.textContent = "Horario: " + item.horario;
      horario.style.margin = "10px";
      horario.style.fontSize = "12px";
      horario.style.color = "#666";
      horario.style.textAlign = "center";

      const title = document.createElement("p");
      title.textContent = "Pelicula: " + item.pelicula.name;
      title.style.fontWeight = "bold";
      title.style.color = "#0056b3";
      title.style.margin = "10px";
      title.style.textAlign = "center";

      const image = document.createElement("img");
      image.src = item.pelicula.imageUrl;
      image.style.display = "block";
      image.style.marginLeft = "auto";
      image.style.marginRight = "auto";

      const sala = document.createElement("p");
      sala.textContent = "Sala: " + item.sala.name;
      sala.style.fontSize = "12px";
      sala.style.color = "#666";
      sala.style.textAlign = "center";

      contenedor.appendChild(image);
      contenedor.appendChild(horario);
      contenedor.appendChild(title);
      contenedor.appendChild(sala);

      filmContainer.appendChild(contenedor);
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

const infoUser = async () => {
  if (!token) {
    console.log("El usuario no está autenticado.");
    const login = document.createElement("a");
    login.className = "nav-link";
    login.href = "./login.html";
    login.textContent = "Login";
    logContainer.appendChild(login);
    return;
  }

  try {
    const response = await fetch(userInfo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor.");
    }

    const dataResponse = await response.json();
    const userId = dataResponse.userToken.id; 

    const welcome = document.createElement("a");
    const recordreservation = document.createElement("a");

    const logout = document.createElement("a");

    welcome.className = "nav-link";
    welcome.href = "./user.html";
    welcome.textContent = "Bienvenido, " + dataResponse.userToken.name;

    recordreservation.className = "nav-link";
    recordreservation.textContent = "Historial de reservas";
    recordreservation.href = `./reservationrecord.html?id_Usuario=${userId}`; 

    logout.className = "nav-link";
    logout.id = "logout";
    logout.href = "#";
    logout.textContent = "Logout";

    welcomeContainer.appendChild(welcome);
    reservationsContainer.appendChild(recordreservation);
    logContainer.appendChild(logout);

    logout.addEventListener("click", function (event) {
      localStorage.removeItem("authToken");
      location.reload();
    });
  } catch (error) {
    console.log("Error al obtener información del usuario:", error);
  }
};

infoUser();
list();
