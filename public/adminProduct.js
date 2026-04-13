const token = localStorage.getItem("token");
let dataPrice = 0;
let dataStock = 0;

async function getCart(token) {
  try {
    const response = await fetch("http://localhost:4000/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const output = await response.json();
    if (output.message == "Product not available") {
      alert(output.message);
    }
    return output;
  } catch (error) {
    alert(error.message);
  }
}

const product = getCart(token);

async function setProduct(value) {
  const products = await value;
  
  const container = document.getElementById("product");
  container.innerHTML = "";

  products.forEach((number) => {
    container.innerHTML += `
    <div class="container">
      <div >
        <img src="http://localhost:4000/${number.imageurl}" width= "100px" alt="${number.name}" class="imgProduct">
      </div>
      <div >
        <p>Name: ${number.name}</p>
        <p>Price:${number.price}</p>
        <p>Stock: ${number.stock}</p>
      

      </div>
      <div >
      

      <button class="edit-btn" data-id="${number.id}" data-price="${number.price}" data-stock=" ${number.stock}" >Update</button>
      <button class="delete-btn" data-id="${number.id}" data-stock=" ${number.stock}">Delete</button>
      </div>
       
        
    </div>`;
  });
  container.addEventListener("click", async function (event) {
    if (event.target.classList.contains("edit-btn")) {
      dataPrice = Number(event.target.dataset.price);
      dataStock = Number(event.target.dataset.stock);

      container.innerHTML = `
      <form id="putCart">
      <label for="quantity"> Price:</label>
      <input type="number" id="price" value="${dataPrice}"/><br />
      <label for="quantity">Stock:</label>
      <input type="number" id="stock" value="${dataStock}" /><br />
      <input type="submit" value="Change" />
      </form>`;
      id = event.target.dataset.id;

      container.addEventListener("submit", async function (event) {
        event.preventDefault();
        const price = document.getElementById("price").value;
        const stock = document.getElementById("stock").value;
        try {
          const response = await fetch(`http://localhost:4000/product/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ price: price, stock: stock }),
          });
          const data = await response.json();
          if (data.message == "Changed item is successfully") {
            alert(data.message);
            window.location.href = "./adminProduct.html";
          }
          alert(data.message);
        } catch (error) {
          alert(error);
        }
      });
    }
    if (event.target.classList.contains("delete-btn")) {
      dataStock = Number(event.target.dataset.stock);
      try {
        id = event.target.dataset.id;
        const response = await fetch(`http://localhost:4000/product/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ stock: dataStock }),
        });
        const data = await response.json();
        if (data.message == "Deleted product is successfully") {
          alert(data.message);
          window.location.href = "./adminProduct.html";
        }
        alert(data.message);
      } catch (error) {
        alert(data.message);
      }
    }
  });
}
setProduct(product);

document.getElementById("searchContainer").addEventListener("submit", search);
async function search(event) {
  event.preventDefault();
  const searchValue = document.getElementById("search").value;

  const result = await fetch(
    `http://localhost:4000/product/search/${searchValue}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
 
  const data = await result.json();
  
  setProduct(data.result);
  return data.result;
}
