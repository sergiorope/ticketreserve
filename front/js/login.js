document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const loginPOST = "http://localhost:3800/user/login";

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
        throw new Error("La petición no obtuvo respuesta");
      }


      localStorage.setItem('authToken', dataResponse.token);

      window.location.href = "./index.html"; 

    };

    login();
  });
