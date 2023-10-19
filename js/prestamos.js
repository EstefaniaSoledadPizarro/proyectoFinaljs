/*Declaracion de variables con info traida por metodo DOM*/
document.addEventListener("DOMContentLoaded", function () {
    const loanForm = document.getElementById("loan-form");
    const montoInput = document.getElementById("monto");
    const bancoSelect = document.getElementById("banco");
    const plazoSelect = document.getElementById("plazo");
    const resultado = document.getElementById("resultado");
  /*addEvent para el calculo del prestamo y preventDefaut para evitar refresh del navegador*/
    loanForm.addEventListener("submit", function (e) {
        e.preventDefault();
  /*Funciones para traer la info seleccionada por el usuario*/
        const monto = parseFloat(montoInput.value);
        const banco = bancoSelect.value;
        const plazo = plazoSelect.value;
        /*Calculo del interes y uso de plantillas literales*/
      if (tasas[banco] && tasas[banco][plazo]) {
          const tasaInteres = tasas[banco][plazo];
          const interesCalculado = (monto * tasaInteres) / 100;
          resultado.textContent = `La tasa de interés será de: ${interesCalculado} $ ARG`;
      } else {
          resultado.textContent = "Por favor, seleccione un banco y un plazo válidos.";
      }
  });
  });
  /*Funcion para el boton tomar prestamo, con evento click y metodos sweet alert*/
  const btn = document.getElementById('tomarPrestamo');
    btn.addEventListener('click', function () {
      Swal.fire({
        title: 'Login Form',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Ingresar',
        focusConfirm: false,
        preConfirm: () => {
          const login = Swal.getPopup().querySelector('#login').value
          const password = Swal.getPopup().querySelector('#password').value
          if (!login || !password) {
            Swal.showValidationMessage(`Por favor, ingrese su usuario y contraseña`)
          }
          return { login: login, password: password }
        }
      }).then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          showConfirmButton: false,
          timer: 1000
      })
    })
  });
  /*Funcion para ubicacion de la apis de googlemaps */
  function iniciarMap(){
    var coord = {lat:-32.8892899 ,lng: -68.842993};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 15,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
  }