const userInfo = "http://localhost:3800/user/info";
const token = localStorage.getItem("authToken");

const welcomeContainer = document.getElementById("welcome");
const logContainer = document.getElementById("log");
const infoUserName = document.getElementById("infoName");
const infoUserSurname = document.getElementById("infoSurname");
const infoUserEmail = document.getElementById("infoEmail");

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

        const name = document.createElement("p");
        const surname = document.createElement("p");
        const email = document.createElement("p");

        name.textContent = "Nombre: " + dataResponse.userToken.name;
        surname.textContent = "Apellidos: " + dataResponse.userToken.surname;
        email.textContent = "Email: " + dataResponse.userToken.email;

        name.className = "h5 text-dark font-weight-bold mb-4";  
        surname.className = "h5 text-dark font-weight-bold mb-4";
        email.className = "h5 text-dark font-weight-bold mb-4";

        welcome.className = "nav-link";  
        welcome.href = "./user.html";
        welcome.textContent = "Bienvenido, " + dataResponse.userToken.name;

        welcomeContainer.appendChild(welcome);
        infoUserName.appendChild(name);
        infoUserSurname.appendChild(surname);
        infoUserEmail.appendChild(email);

    } catch (error) {
        console.log("Error al obtener información del usuario:", error);
    }
};

infoUser();
