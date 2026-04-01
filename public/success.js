const token = localStorage.getItem("token");

async function handleSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");
  const status = document.getElementById("status");

  if (sessionId) {
    try {
      const response = await fetch(
        `http://localhost:4000/transaction/verify-payment?session_id=${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Cart cleared successfully!");
        status.innerHTML = `${data.message}`;
      } else {
        alert(data.message);
        status.innerHTML = `${data.message}`;
      }
    } catch (error) {
      status.innerHTML = `${error}`;
    }
  }
}

handleSuccess();
