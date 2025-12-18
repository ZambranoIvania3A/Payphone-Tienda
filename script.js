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
    if(document.getElementById("pp-button")) {
        document.getElementById("pp-button").innerHTML = ""; 
    }
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

    cart.forEach((item) => {
        subtotal += item.price;
        lista.innerHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });

    const iva = subtotal * 0.15;
    const total = subtotal + iva;

    subtotalEl.textContent = subtotal.toFixed(2);
    ivaEl.textContent = iva.toFixed(2);
    totalEl.textContent = total.toFixed(2);
    if(contador) contador.textContent = cart.length;
}

function toggleCarrito() {
    const carrito = document.getElementById("carrito");
    carrito.classList.toggle("active");
}

// INTEGRACIÓN PAYPHONE CORREGIDA
document.getElementById("payButton").addEventListener("click", () => {
    const totalVal = parseFloat(document.getElementById("total").textContent);
    const subtotalVal = parseFloat(document.getElementById("subtotal").textContent);
    const ivaVal = parseFloat(document.getElementById("iva").textContent);

    if (totalVal === 0) {
        alert("Agrega productos para pagar");
        return;
    }

    // TUS CREDENCIALES REALES
    const storeId = "TYeThhT0EkKlGXBGOT4r9w"; 
    const token = "gpY1D2zi5Az7F0ej3raOyUhw3TuxybCIexhI2qsRw0UWCfjEiXXqjbpkKVvGNU4ECH0_aT9rRE9ESvtd0dC44k-7Js1NfJ6Nz4XT_Xwc85-5EGw-Ytr9D04-IURKUxm1jJw5-S-Rh1fNdP8oHyNVpOJ6MCm_WwmaWAKX3f1YoWqvZ8HS5XFo9fdVstPQ_b4XhJe9shuVsaP_CXodO_QMuuzFLD0aI1MKamQWMHKkGsQBDvF74YBBk4eumKdTJef1BSoL0DHoY-s8WP3HFcVeEFyHaxj15mDFuGmyl-naUgOUL-PbITQTIZimaexrVCabhrE7lgcp5MKA-sYKt__eMkZx-1U"; 

    document.getElementById("pp-button").innerHTML = ""; 

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
        // Manejo del Response (Punto 4 de tu práctica)
        onConfirm: (response) => {
            alert("¡Pago exitoso! ID de transacción: " + response.transactionId);
            vaciarCarrito();
        },
        onCancel: () => {
            alert("Pago cancelado por el usuario");
        }
    });

    payButton.render("pp-button");
});