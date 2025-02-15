document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const register = "http://localhost:3800/user/register";

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
        throw new Error("La petición no obtuvo respuesta");
      }
    };

    create();
  });
