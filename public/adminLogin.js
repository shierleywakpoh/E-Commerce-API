//localStorage.removeItem("token");
document.getElementById("login").addEventListener("click", login);

async function login(e) {
  e.preventDefault();
  const email = document.getElementById("femail").value;
  const password = document.getElementById("fpass").value;
  console.log("email", email);
  console.log("password", password);

  try {
    const response = await fetch("http://localhost:4000/adminRegister/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    console.log("data", response);

    if (data.message == "Login succesfully") {
      localStorage.setItem("token", data.token);
      alert(data.message);
      window.location.href = "./adminProduct.html";
    }
    document.getElementById("status").innerText = data.message;
    //console.log(data.token);
  } catch (error) {
    document.getElementById("status").innerText = "Something went wrong";
  }
}
