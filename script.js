const products = [
    { name: "Labial Mate", price: 8.00, image: "img/Labial-mate.jpg" },
    { name: "Base Líquida", price: 15.00, image: "img/Base-liquido.jpg" },
    { name: "Paleta de Sombras", price: 18.00, image: "img/Paleta de sobra.jpg" },
    { name: "Gel de Cejas", price: 6.00, image: "img/gel de cejas.jpg" },
    { name: "Set de Brochas", price: 20.00, image: "img/brochas.jpg" },
    { name: "Gloss Labial", price: 7.00, image: "img/gloss.jpg" }
];

let cart = [];

// Cargar productos al inicio
const productContainer = document.getElementById("product-list");
products.forEach((p, index) => {
    productContainer.innerHTML += `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price.toFixed(2)}</p>
            <button onclick="agregarProducto(${index})">Agregar al Carrito</button>
        </div>
    `;
});

function agregarProducto(index) {
    cart.push(products[index]);
    actualizarInterfaz();
}

function vaciarCarrito() {
    cart = [];
    document.getElementById("pp-button").innerHTML = ""; 
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const lista = document.getElementById("listaCarrito");
    const subtotalEl = document.getElementById("subtotal");
    const ivaEl = document.getElementById("iva");
    const totalEl = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, i) => {
        subtotal += item.price;
        lista.innerHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });

    const iva = subtotal * 0.15;
    const total = subtotal + iva;

    subtotalEl.textContent = subtotal.toFixed(2);
    ivaEl.textContent = iva.toFixed(2);
    totalEl.textContent = total.toFixed(2);
    contador.textContent = cart.length;
}

function toggleCarrito() {
    const carrito = document.getElementById("carrito");
    carrito.classList.toggle("active");
}

// INTEGRACIÓN PAYPHONE
document.getElementById("payButton").addEventListener("click", () => {
    const totalVal = parseFloat(document.getElementById("total").textContent);
    const subtotalVal = parseFloat(document.getElementById("subtotal").textContent);
    const ivaVal = parseFloat(document.getElementById("iva").textContent);

    if (totalVal === 0) {
        alert("Agrega productos para pagar");
        return;
    }

    // Datos de PayPhone (Tus credenciales)
    const storeId = "9f3fdb3f-5194-4b55-93d7-9247586b97fc";
    const token = "jdKv_jZZgsylQGEYiwahhdnIdLvcGCYztXt5n1i6WE5zjZwexEjB8t0SetmoIbzwDORn04MC7xaXTtQ9lf05PRw5BoLBjDDUVVEqjyBuP7Y4cZeZRARfsTGGOmjDe1AGh4mAsqyFAEopcovDGvEKm6X0ZHcKVYTXEgzZYeDeGmNkRd__7ZsVTWkuCSDyFRzqdBrmhRsG8RrRNE5oBRxKOhjVq-0h-7n5_c653k8zVREMHcBntBnWCwYO63fciQd4im5FgJCB_UDcJCJHh6-CAOUwpHEYJZ4f-tjc5jk4a0bscX5LuPlnxgSqrYxI6FjBHnnluWmS7Lb1fDYBXbgm11dJYo8";

    const payButton = new PPaymentButtonBox({
        token: token,
        amount: Math.round(totalVal * 100),
        amountWithoutTax: 0,
        amountWithTax: Math.round(subtotalVal * 100),
        tax: Math.round(ivaVal * 100),
        clientTransactionId: Date.now().toString(),
        storeId: storeId,
        reference: "Compra Beauty Manta",
        currency: "USD",
        email: "cliente@beautymanta.com",
        returnUrl: "https://tu-sitio.com/gracias"
    });

    document.getElementById("pp-button").innerHTML = ""; 
    payButton.render("pp-button");
});