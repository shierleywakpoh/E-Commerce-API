document.getElementById("register").addEventListener("submit", register);

async function register(e) {
  e.preventDefault();
  const name = document.getElementById("fname").value;
  const email = document.getElementById("femail").value;
  const password = document.getElementById("fpass").value;

  try {
    const response = await fetch("http://localhost:4000/customerRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const data = await response.json();
    if (data.message == "Register succesfully") {
      localStorage.setItem("token", data.token);
      alert(data.message);
      window.location.href = "http://localhost:4000";
    }
    document.getElementById("status").innerText = data.message;
  } catch (error) {
    document.getElementById("status").innerText = "Something went wrong";
  }
}
