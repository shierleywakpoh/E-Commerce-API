const token = localStorage.getItem("token");
let totalPrice = 0;

async function getCart(token) {
  try {
    const response = await fetch("http://localhost:4000/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}
const value = getCart(token);

async function transaction(dataGet) {
  const data = await dataGet;
  const container = document.getElementById("transaction");

  data.forEach((number) => {
    totalPrice = totalPrice + number.price * number.quantity;
    container.innerHTML += `
    <div class="container">
      <div >
        <img src="http://localhost:4000/${number.imageurl}" width= "100px" alt="${number.name}" class="imgProduct">
      </div>
      <div >
        <p>Name:${number.name}</p>
        <p>Price:${number.price}</p>
        <p>Quantity:${number.quantity}</p> 
      </div>
    </div>`;
  });
  container.innerHTML += `
  <div>
    <p>Total Price: ${totalPrice}</p>
  </div>`;
}

transaction(value);

document.getElementById("dataCustomer").addEventListener("click", dataCus);

async function dataCus(e) {
  e.preventDefault();
  const cart = await value;

  const name = document.getElementById("cname").value;
  const contact = document.getElementById("ccontact").value;
  const address = document.getElementById("caddress").value;
  try {
    const valueCart = await fetch(`http://localhost:4000/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartItems: cart,
        cusname: name,
        cuscontact: contact,
        cusaddress: address,
        price: totalPrice,
      }),
    });

    const dataCart = await valueCart.json();
    if (dataCart.message == "sucessfully") {
      window.location.href = dataCart.url;
    }
    alert(dataCart.message);
  } catch (error) {
    alert(error);
  }
}
/**
 *
 */
