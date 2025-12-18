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
    if (document.getElementById("pp-button")) {
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
    if (contador) contador.textContent = cart.length;
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

    // CREDENCIALES REALES
    const storeId = "Adg2MycFGkSfhhyn0pBQ6A";
    const token = "MHibt6nRan4kPuq8qyTAKNj1SgJzuuUAFzjcXXCaDQtFe5EHAfBF-4K6rmTVvg51paTBXlZHLtyt8p8ip--Lv60rOAg9CCOrAoksTC-CoHPFLrb_8A1ZeEcUrlcfKUsb5HpTA34gEJVcVikgU6A9YA6ks5__1lnkOJ5Siyk4s95mDBwDo6XkI9GInxQjnMcMkN-d1ng2skBJD1e6-D2OspdJY3_TnJ_ruwuvyjaRRR7sVNQPiOjDsFN8ASJwhcZT6E-TthCm0llXbqEL5fsNxb0DO0javIAGSnCrxFz8PJyl3KSF-HHjym0IHCq-2d1hjT8n3Q";

    document.getElementById("pp-button").innerHTML = "";

  const payButton = new PPaymentButtonBox({
    token: token,
    amount: Math.round(subtotalVal * 100) + Math.round(ivaVal * 100), // total en centavos
    amountWithoutTax: Math.round((subtotalVal - ivaVal) * 100),       // base sin IVA
    amountWithTax: Math.round(subtotalVal * 100),                      // subtotal con IVA
    tax: Math.round(ivaVal * 100),                                     // IVA
    service: 0,
    tip: 0,
    clientTransactionId: Date.now().toString(),
    storeId: storeId,
    reference: "Compra Beauty Manta",
    currency: "USD",
    email: "ivaniazs1999@gmail.com",
    userId: "0983069426",

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
