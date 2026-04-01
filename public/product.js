const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function getProductById(id) {
  try {
    const response = await fetch(`http://localhost:4000/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const output = await response.json();
    return output;
  } catch (error) {
    alert(error);
  }
}

const product = getProductById(productId);

async function output(product) {
  const input = await product;
  document.getElementById("imageProduct").innerHTML = `
  <div class="image">
  <img  src="http://localhost:4000/${input.imageurl}" max-width ="100px" alt="${input.name}" >
  </div>
  
  `;
  document.getElementById("nameProduct").innerHTML = input.name;
  document.getElementById("descProduct").innerHTML = input.description;
}

output(product);
