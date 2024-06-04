document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    const apiUrl = "http://localhost:3000/productos";

    const fetchProducts = async () => {
        const response = await fetch(apiUrl);
        const products = await response.json();
        productList.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
            <div class="card">
            <img src="${product.image}"
                alt="${product.name}" class="image_produc">
            <h3 class="titulo_produc">${product.name}</h3>
            <p class="precio_produc">$${product.price}</p>
            <button data-id="${product.id}"><img src="./icons/borrar.png" alt="" class="delete_product">Eliminar</button>
            
        </div>

                
            `;
            productList.appendChild(productDiv);
        });
    };

    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const image = document.getElementById("image").value;

        await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, image })
        });

        fetchProducts();
        productForm.reset();
    });
     fetchProducts();
  productList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const productId = event.target.getAttribute('data-id');

      fetch(`http://localhost:3000/productos/${productId}`, {
        method: 'DELETE'
      })
      .then(() => {
        fetchProducts();
      });
    }
  });

});