document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const loginPOST = "http://localhost:3800/user/login";
    const containerMessage = document.getElementById("containerMessage");

    const login = async () => {
      const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      const response = await fetch(loginPOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const dataResponse = await response.json();

      if (!response.ok) {
        const errorMessage =
          dataResponse.message || "Ocurrió un error inesperado.";

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

      localStorage.setItem("authToken", dataResponse.token);

      window.location.href = "./index.html";
    };

    login();
  });
