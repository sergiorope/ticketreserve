document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const register = "http://localhost:3800/user/register";
    const containerMessage = document.getElementById("containerMessage");

    const create = async () => {
      const data = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      const response = await fetch(register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      const success = document.createElement("p");
      success.textContent = "Se creó con éxito el usuario";
      success.style.color = "green";
      success.style.fontWeight = "bold";
      success.style.marginTop = "10px";

      containerMessage.appendChild(success);

      setTimeout(() => {
        containerMessage.removeChild(success);
      }, 5000);
    };

    create()
  });
