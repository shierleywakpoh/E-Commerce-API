document.getElementById("login").addEventListener("submit", login);

async function login(e) {
  e.preventDefault();
  const email = document.getElementById("femail").value;
  const password = document.getElementById("fpass").value;

  try {
    const response = await fetch(
      "http://localhost:4000/customerRegister/Login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }
    );
    const data = await response.json();
    if (data.message == "Login succesfully") {
      localStorage.setItem("token", data.token);
      alert(data.message);
      window.location.href = "http://localhost:4000";
    }
    document.getElementById("status").innerText = data.message;
  } catch (error) {
    document.getElementById("status").innerText = "Something went wrong";
    //alert(error);
  }
}
