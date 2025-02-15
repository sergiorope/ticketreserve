const getFilm = "http://localhost:3800/projection/list";
const userInfo = "http://localhost:3800/user/info";

const welcomeContainer = document.getElementById("welcome");
const logContainer = document.getElementById("log");

const list = async () => {
  try {
    const response = await fetch(getFilm, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    const filmContainer = document.querySelector(".filmContainer");

    data.projectionList.forEach((item) => {
      const contenedor = document.createElement("div");
      contenedor.className = "filmItem";
      contenedor.style.margin = "5%";

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
      image.style.width = "100%";
      image.style.height = "200px";
      image.style.objectFit = "cover";
      image.style.borderBottom = "1px solid #ddd";

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

const token = localStorage.getItem("authToken");

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

    const welcome = document.createElement("a");
    const logout = document.createElement("a");

    welcome.className = "nav-link";
    welcome.href = "./user.html";
    welcome.textContent = "Bienvenido, " + dataResponse.userToken.name;

    logout.className = "nav-link";
    logout.id = "logout";
    logout.href = "#";
    logout.textContent = "Logout";

    welcomeContainer.appendChild(welcome);
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
