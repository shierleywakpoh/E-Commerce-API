const container = document.getElementById("container");
const cart = document.getElementById("carts");
const token = localStorage.getItem("token");
async function dataTransaction() {
  try {
    const result = await fetch("http://localhost:4000/transaction", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    if (data.message == "Order not found") {
      alert(data.message);
      container.innerHTML = `<p>${data.message}</p>`;
    }
    return data;
  } catch (error) {
    alert(error);
  }
}
const dataCarts = dataTransaction();

async function showCarts(value) {
  container.innerHTML = "";
  const carts = await value;
  carts.forEach((element) => {
    console.log("status", element.status);
    console.log("cartitems", element.cartitems);
    element.cartitems.forEach((element1) => {
      const item = JSON.parse(element1);
      console.log("name", item.name);
      cart.innerHTML += `
      <div class="subItem">
        <div >
          <img src="http://localhost:4000/${item.imageurl}" width= "100px" alt="${item.name}" class="imgProduct">
        </div>
        <div>
          <p>Name Product: ${item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        </div>
      </div>
      `;
    });
    container.appendChild(cart);
    container.innerHTML += `
    <div class="items">
      <p>Total Price: ${element.price}</p>
      <p>Status Order: ${element.status}</p>
    </div>
    
    `;
  });
}
showCarts(dataCarts);
