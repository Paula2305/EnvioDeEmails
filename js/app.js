// Value esta dentro de target y trae lo que se ingreso en el campo.
document.addEventListener("DOMContentLoaded", function () {

  
  const email = {
    email: '',
    asunto: '',
    mensaje: ''
  }
  
  console.log(email);

  //Seleccionar los elementos de la interfaz
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario"); // console.log(inputMensaje);
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  //Asignar eventos
  // cuando el evento blur ocurra se ejecuta la funcion = CALLBACK
  //blur: cuando salis de la posicion
  //input: toma el contenido en tiempo real
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('click', function(e){
    e.preventDefault();

    resetFormulario();
  });

  function enviarEmail(e){
    e.preventDefault();
    
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() =>{
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');

      resetFormulario();

    }, 3000);

  }


  function validar(e) {
    // console.log(e.target.parentElement); // recorre el dom hacia el elemento padre
    // console.log(e.target.parentElement.nextElementSibling); // trae el siguiente elemento nextElementSibling

    // console.log(e.target.id); para validar que traemos el id
    // console.log(e.target.value); para validar el valor en la consola

    if (e.target.value.trim() === "") {
      // trim me saca los espacios en blanco
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
      email[e.target.name] = ''; // si se elimina un campo se vacia el array
      comprobarEmail();
      return;
    }
    
    if( (e.target.id === 'email') && (! validarEmail(e.target.value))){
      mostrarAlerta(`El email no es válido`, e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
        return;
    }

    limpiarAlerta(e.target.parentElement);

    // Una vez que haya completado todo se ejecuta esta seccion y que pasamos las validaciones 
    email[e.target.name] = e.target.value.trim().toLowerCase();
    
    //Comprobar el objeto email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    // Comprueba si ya existe una alerta
    limpiarAlerta(referencia);

    // Generar una alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    //Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail(){
    // console.log(email);
    // Object.values me devuelve un array (en este caso el formulario como un arreglo)
    // Con includes si todavia hay un campo vacio retornara true y si esta todo completo da false
    if(Object.values(email).includes('')){
      btnSubmit.classList.add('opacity-50'); // si esta vacio el boton vuelve a estar opaco 
      btnSubmit.disabled = true; // y se desabilita
      return;
    }
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
  }

  function resetFormulario(){
    // reiniciar el objeto
    email.email = '',
    email.asunto = '',
    email.mensaje = '';

    formulario.reset();
    comprobarEmail();

  }

});
