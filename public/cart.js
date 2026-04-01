const token = localStorage.getItem("token");

let id = 0;
let totalPrice = 0;
let quantityId = 0;
let stock = 0;
let stock1 = 0;

let productId = 0;
const container = document.getElementById("cart");


async function getCart(token) {
  try {
    const response = await fetch("http://localhost:4000/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const output = await response.json();
    if (output.message == "User does not have cart") {
      container.innerHTML = ` <p class="empty">Your Shopping Cart is Empty</p>`;
    }
    if (output.message == "Access token expired") {
      container.innerHTML = ` <p class="empty">Access token expired</p>`;
    }
    if (output.message == "Unauthorized") {
      container.innerHTML = ` <p class="empty">Unauthorized</p>`;
    }
    console.log("output", output);
    return output;
  } catch (error) {
    container.innerHTML = ` <p class="empty">Something went wrong</p>`;
  }
}

const value = getCart(token);

async function cart(dataGet) {
  //const container = document.getElementById("cart");
  const data = await dataGet;
  console.log("data", data);
  data.forEach((number) => {
    totalPrice = totalPrice + number.price * number.quantity;
    container.innerHTML += `
    <div class="container">
    
      <div >
      <img src="http://localhost:4000/${number.imageurl}" width= "100px" alt="${number.name}" class="imgProduct">
      </div>

      <div class="item2" >
        <p>Name: ${number.name}</p>
        <p>Price:${number.price}</p>
        <p>Quantity:${number.quantity}</p>
        
        
      </div>
      <div class="item3" >
        <button class="edit-btn" data-id="${number.id}" data-quantity="${number.quantity}" data-product="${number.product_id}" data-stock="${number.stock}">update</button>
        <button class="delete-btn" data-id="${number.id}" data-quantity="${number.quantity}" data-stock="${number.stock}" data-product="${number.product_id}">delete</button>

      </div>
       
    </div>`;
  });

  container.innerHTML += `<div>
  <p>Total Price: ${totalPrice}</p>
  
  <a href="./transaction.html" id ="nyoba">checkout</a>
  </div>`;

  container.addEventListener("click", async function (event) {
    if (event.target.classList.contains("edit-btn")) {
      quantityId = Number(event.target.dataset.quantity);
      productId = Number(event.target.dataset.product);
      stock = Number(event.target.dataset.stock);

      container.innerHTML = `
      <form id="putCart">
      <label for="quantity" >Quantity :</label>
      <input type="number" id="quantity" value="${quantityId}"/><br />
      <input type="submit" value="+" />
      </form>`;
      id = event.target.dataset.id;

      container.addEventListener("submit", async function (event) {
        event.preventDefault();
        const quantity = document.getElementById("quantity").value;

        try {
          const response = await fetch(`http://localhost:4000/cart/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              quantity: Number(quantity),
              productId: productId,
              quantityId: quantityId,
              stock: stock,
            }),
          });
          const data = await response.json();
          console.log("output", data);
          if (data.message == "Changed cart is successfully") {
            alert(data.message);
            window.location.href = "http://localhost:4000/cart.html";
          }
          alert(data.message);
        } catch (error) {
          alert(error);
          window.location.href = "http://localhost:4000/cart.html";
        }
      });
    }
    if (event.target.classList.contains("delete-btn")) {
      quantityId = Number(event.target.dataset.quantity);
      stock = Number(event.target.dataset.stock);
      productId = Number(event.target.dataset.product);
      try {
        const id1 = event.target.dataset.id;
        const response = await fetch(`http://localhost:4000/cart/${id1}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity: quantityId,
            stock: stock,
            productId: productId,
          }),
        });
        const data = await response.json();

        if (data.message == "Deleted cart is sucessfully") {
          alert(data.message);
          window.location.href = "http://localhost:4000/cart.html";
        }
        alert(data.message);
      } catch (error) {
        alert(error);
      }
    }
  });
}
cart(value);
