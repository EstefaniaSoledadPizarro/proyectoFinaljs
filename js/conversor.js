/*Declaracion de funciones principales con uso de metodo DOM*/
let form = document.querySelector('form');
let cantidadInput = document.getElementById('cantidad');
let monedaOrigenSelect = document.getElementById('moneda-origen');
let monedaDestinoSelect = document.getElementById('moneda-destino');
let resultadoDiv = document.getElementById('resultado');
/*Tasas de cambio para cada moneda respecto al dolar*/
const tasasDeCambio = {
    usd: 1.00,
    eur: 1.15,
    real: 0.70,
    chilenos: 0.0018,
    libras: 1.25,
};
/*addEventListener para el boton de calculo con prevencion del refresh del navegador y metodo sweet alert*/
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
    /*Funciones para traer la info seleccionada por el usuario con metodo value y toFixed para obtener solo un decimal*/
    let cantidad = parseFloat(cantidadInput.value);
    let monedaOrigen = monedaOrigenSelect.value;
    let monedaDestino = monedaDestinoSelect.value;
    let tasaOrigen = tasasDeCambio[monedaOrigen];
    let tasaDestino = tasasDeCambio[monedaDestino];
    let cambio = cantidad * (tasaOrigen / tasaDestino);
    resultadoDiv.textContent = 'Tu cambio es: ' + cambio.toFixed(1) + ' ' + monedaDestino;
    });
/*Verificacion de ingresos validos y operacion con su resultado*/
    function calcularCambio(cantidad, monedaOrigen, monedaDestino) {
        if (!(monedaOrigen in tasasDeCambio) || !(monedaDestino in tasasDeCambio)) {
            return "Moneda no válida";
        }
        const tasaOrigen = tasasDeCambio[monedaOrigen];
        const tasaDestino = tasasDeCambio[monedaDestino];
        const valorCambio = cantidad * (tasaDestino / tasaOrigen);
        return valorCambio.toFixed(1);
    }
/*Funcion de agregar al carrito con evento onclick*/
    const botonCarrito = document.getElementById("add-carrito");
    botonCarrito.onclick = function () {
        agregarAlCarrito();
    };
/*Uso del DOM para traer la lista de operaciones seleccionadas para el carrito y el monto final*/
    const listaCompras = document.getElementById("lista-compras");
    const resultadoFinal = document.getElementById("resultado-final");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
/*Uso del metodo forEach para mostrar los elementos del carrito*/ 
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
        /*Partiendo de un total inicial cero, calculo de las operaciones segun la tasa de cambio de la moneda de origen elegida*/
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
        /*Push al carrito de operacion seleccionada y agregada a la lista*/
        carrito.push({ total });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const listItem = document.createElement("li");
        listItem.textContent = `${cantidad} ${monedaOrigen} a USD: ${total.toFixed(1)}`;
        listaCompras.appendChild(listItem);
        actualizarTotal();
    });
/*addEventListener para eliminar los elementos del carrito con removeItem al clickear el boton vaciar carrito*/
    document.getElementById("vaciarCarrito").addEventListener("click", () => {
        carrito.length = 0;
        localStorage.removeItem("carrito");
        listaCompras.innerHTML = "";
        resultadoFinal.textContent = "Total:";
    });
    actualizarTotal();