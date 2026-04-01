const token = localStorage.getItem("token");

document.getElementById("login").addEventListener("click", add);

async function add(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const stock = document.getElementById("stock").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").files[0];
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("stock", stock);
  formData.append("price", price);
  formData.append("image", imageUrl);

  console.log(imageUrl);
  try {
    const response = await fetch("http://localhost:4000/product", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("create", data.message);
    if (data.message == "Added product is sucessfully") {
      alert(data.message);
      window.location.href = "./adminProduct.html";
    }
    console.log("data", data);
    alert(data.message);
  } catch (error) {
    alert(error);
  }
}
