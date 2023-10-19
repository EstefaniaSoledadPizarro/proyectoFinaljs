let form = document.querySelector('form');
let cantidadInput = document.getElementById('cantidad');
let monedaOrigenSelect = document.getElementById('moneda-origen');
let monedaDestinoSelect = document.getElementById('moneda-destino');
let resultadoDiv = document.getElementById('resultado');

const tasasDeCambio = {
    usd: 1.00,
    eur: 1.15,
    real: 0.70,
    chilenos: 0.0018,
    libras: 1.25,
};

form.addEventListener('submit', function (e) {
    e.preventDefault()})
    const btn = document.getElementById('calcularButton')
    btn.addEventListener('click', function () {
        Swal.fire({
            icon: 'success',
            title: 'Calculando',
            showConfirmButton: false,
            timer: 1500
        })
    let cantidad = parseFloat(cantidadInput.value);
    let monedaOrigen = monedaOrigenSelect.value;
    let monedaDestino = monedaDestinoSelect.value;
    let tasaOrigen = tasasDeCambio[monedaOrigen];
    let tasaDestino = tasasDeCambio[monedaDestino];
    let cambio = cantidad * (tasaOrigen / tasaDestino);
    resultadoDiv.textContent = 'Tu cambio es: ' + cambio.toFixed(1) + ' ' + monedaDestino;
    });

    function calcularCambio(cantidad, monedaOrigen, monedaDestino) {
        if (!(monedaOrigen in tasasDeCambio) || !(monedaDestino in tasasDeCambio)) {
            return "Moneda no válida";
        }
        const tasaOrigen = tasasDeCambio[monedaOrigen];
        const tasaDestino = tasasDeCambio[monedaDestino];
        const valorCambio = cantidad * (tasaDestino / tasaOrigen);
        return valorCambio.toFixed(1);
    }


    const botonCarrito = document.getElementById("add-carrito");
    botonCarrito.onclick = function () {
        agregarAlCarrito();
    };

    const listaCompras = document.getElementById("lista-compras");
    const resultadoFinal = document.getElementById("resultado-final");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function actualizarTotal() {
        let total = 0;
        carrito.forEach(item => {
            total += item.total;
        });
        resultadoFinal.textContent = "Total: " + total.toFixed(1) + " USD";
    }

    document.getElementById("add-carrito").addEventListener("click", () => {
        const cantidad = parseFloat(document.getElementById("cantidad").value);
        const monedaOrigen = document.getElementById("moneda-origen").value;
        const monedaDestino = document.getElementById("moneda-destino").value;

        let total = 0;
        if (monedaOrigen === "eur" && monedaDestino === "usd") {
            total = cantidad * 1.15;
        } else if (monedaOrigen === "real" && monedaDestino === "usd") {
            total = cantidad * 0.70;
        } else if (monedaOrigen === "chilenos" && monedaDestino === "usd") {
            total = cantidad * 0.0018;
        } else if (monedaOrigen === "libras" && monedaDestino === "usd") {
            total = cantidad * 1.25;
        }

        carrito.push({ total });
        localStorage.setItem("carrito", JSON.stringify(carrito));

        const listItem = document.createElement("li");
        listItem.textContent = `${cantidad} ${monedaOrigen} a USD: ${total.toFixed(1)}`;
        listaCompras.appendChild(listItem);
        actualizarTotal();
    });

    document.getElementById("vaciarCarrito").addEventListener("click", () => {
        carrito.length = 0;
        localStorage.removeItem("carrito");
        listaCompras.innerHTML = "";
        resultadoFinal.textContent = "Total:";
    });
    actualizarTotal();