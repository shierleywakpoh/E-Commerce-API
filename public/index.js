//localStorage.removeItem("token");
const token = localStorage.getItem("token");
const container = document.getElementById("container");

async function getProduct() {
  try {
    const response = await fetch("http://localhost:4000/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const output = await response.json();
    if (output.message == "Product not available") {
      alert(output.message);
    }
    return output;
  } catch (error) {
    alert(error);
  }
}
const value = getProduct();

async function showProduct(value) {
  const output = await value;
  container.innerHTML = "";

  output.forEach((element) => {
    container.innerHTML += `
      <div class = "def">
        <img src="http://localhost:4000/${element.imageurl}" width= "100px" alt="${element.name}" class="imgProduct">
        <div class = "abc">
          <p>${element.name}</p>
          <p>${element.price}</p>
            <div>
              <a href="./product.html?id=${element.id}">Details</a>
              <button class="add-btn" data-id="${element.id}">add</button>
            </div>
        </div>
      </div>
      `;
  });
}
container.addEventListener("click", updateCart);
async function updateCart(event) {
  if (event.target.classList.contains("add-btn")) {
    const output = event.target.dataset.id;
    try {
      const response = await fetch(`http://localhost:4000/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idProduct: output, quantity: 1 }),
      });
      const data = await response.json();
      if (data.message == "Added item is successfully") {
        alert(data.message);
        window.location.href = "http://localhost:4000/cart.html";
      }
      alert(data.message);
    } catch (error) {
      alert(data.message);
    }
  }
}

document.getElementById("searchContainer").addEventListener("submit", search);
async function search(event) {
  event.preventDefault();
  const searchValue = document.getElementById("search").value;
  try {
    const result = await fetch(
      `http://localhost:4000/product/search/${searchValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //console.log("result");
    const data = await result.json();
    if (data.message == "Product not found") {
      alert(data.message);
      const allProducts = await getProduct();
      showProduct(allProducts);
      return;
    }

    return showProduct(data.result);
  } catch (error) {
    alert(error);
  }
}
showProduct(value);
