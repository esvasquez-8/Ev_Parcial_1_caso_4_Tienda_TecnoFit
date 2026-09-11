console.log("TecnoFitt funcionando")

const formularioLogin = document.querySelector("#formularioLogin")
const inputCorreo = document.querySelector("#correoLogin")
const inputPassword = document.querySelector("#passwordLogin")
const mensajeErrorGeneral = document.querySelector("#errorGeneralLogin")

if (formularioLogin){
    formularioLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        mensajeErrorGeneral.textContent = "";
        mensajeErrorGeneral.style.color = "red";

        const correoIngresado = inputCorreo.value;
        const passwordIngresado = inputPassword.value;

        const correoGuardado = localStorage.getItem("usuarioCorreo");
        const passwordGuardado = localStorage.getItem("usuarioPassword");

        if (correoIngresado !== correoGuardado || passwordIngresado !== passwordGuardado){
            mensajeErrorGeneral.textContent = "El correo electronico o la contraseña son incorrectos.";
        }else{
            mensajeErrorGeneral.style.color = "green";
            mensajeErrorGeneral.textContent = "¡Inicio de sesión exitosamente! Redirigiendo...";

            setTimeout(() => {
                window.location.href = "index.html";
            },1000);
        }
    });
}

const formularioRegistro = document.querySelector("#formularioRegistro");

if (formularioRegistro){
    const btnAñadirDispositivo = document.querySelector("#btnAñadirDispositivo")
    const contenedorDispositivo = document.querySelector("#contenedorDispositivos")

    btnAñadirDispositivo.addEventListener("click",()=>{
        const nuevoDispositivo = document.createElement("div");
        nuevoDispositivo.classList.add("item-dispositivo");

        nuevoDispositivo.innerHTML = `
      <div class="grupo-campo">
        <label>TIPO DE DISPOSITIVO</label>
        <select name="tipoDispositivo" class="tipo-dispositivo">
          <option value="" disabled selected>-- Seleccione un tipo --</option>
          <option value="Smartwatch">Smartwatch</option>
          <option value="Banda Deportiva">Banda Deportiva</option>
          <option value="Ciclocomputador">Ciclocomputador</option>
          <option value="Audífonos">Audífonos</option>
        </select>
        <span class="mensaje-error error-tipo"></span>
      </div>
      <div class="grupo-campo-fila">
        <div class="campo-serie">
          <label>NÚMERO DE SERIE (12 caracteres alfanuméricos)</label>
          <input type="text" name="numeroSerie[]" class="serie-dispositivo" maxlength="12" placeholder="Ej: AB12CD34EF56">
          <span class="mensaje-error error-serie"></span>
        </div>
        <button type="button" class="btn-eliminar">ELIMINAR</button>
      </div>
    `;

        contenedorDispositivo.appendChild(nuevoDispositivo);

        const btnEliminar = nuevoDispositivo.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", function(){
            nuevoDispositivo.remove();
        });
    });

    const btnEliminarInicial = document.querySelector(".btn-eliminar");
    if(btnEliminarInicial){
        btnEliminarInicial.addEventListener("click", function(){
            this.closest(".item-dispositivo").remove();
        })
    }

    formularioRegistro.addEventListener("submit", function (evento) {
        evento.preventDefault();
        let esValido = true;

        document.querySelectorAll(".mensaje-error").forEach(span => {
            span.textContent = "";
            span.style.color = "red";
        });

        const nombre = document.querySelector("#nombreCompleto").value.trim();
        const correo = document.querySelector("#correo").value.trim();
        const password = document.querySelector("#password").value;
        const confirmar = document.querySelector("#confirmarPassword").value;
        const inputTelefono = document.querySelector("#telefono");
        const telefono = inputTelefono ? inputTelefono.value : "";

        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regexNombre.test(nombre) || nombre.length > 80){
            document.querySelector("#errorNombre").textContent = "Obligatorio. Solo letras y espacios (máximo 80 car.).";
            esValido = false;
        }

        const regexCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl)$/;
        if (!regexCorreo.test(correo) || correo.length > 60) {
            document.querySelector("#errorCorreo").textContent = "Correo inválido. Solo dominios @duoc.cl o @profesor.duoc.cl (máx 60 car.).";
            esValido = false;
        }

        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&@]).{8,}$/;
        if(!regexPassword.test(password)){
            document.querySelector("#errorPassword").textContent = "Mínimo 8 car., una mayúscula, una minúscula, un número y un símbolo (#, $, %, &).";
            esValido = false;
        }

        if (password !== confirmar || confirmar === ""){
            document.querySelector("#errorConfirmar").textContent = "Las contraseñas no coinciden.";
            esValido = false;
        }

        if (telefono !== ""){
            const regexTelefono = /^\d{9}$/;
            if (!regexTelefono.test(telefono)){
                document.querySelector("#errorTelefono").textContent = "El teléfono debe contener exactamente 9 dígitos.";
                esValido = false;
            }
        }

        const bloquesDispositivos = contenedorDispositivo.querySelectorAll(".item-dispositivo");
        const regexSerie = /^[a-zA-Z0-9]{12}$/;

        bloquesDispositivos.forEach(bloque =>{
            const selectTipo = bloque.querySelector(".tipo-dispositivo");
            const errorTipo = bloque.querySelector(".error-tipo");
            const inputSerie = bloque.querySelector(".serie-dispositivo");
            const errorSerie = bloque.querySelector(".error-serie");

            if (!selectTipo.value){
                errorTipo.textContent = "Seleccione un dispositivo de la lista.";
                esValido = false;
            }

            if (!regexSerie.test(inputSerie.value.trim())){
                errorSerie.textContent = "Debe tener exactamente 12 caracteres alfanuméricos.";
                esValido  = false;
            }
        });

        if (esValido){
            localStorage.setItem("usuarioCorreo", correo);
            localStorage.setItem("usuarioPassword", password);

            alert("¡Registro existoso! Tus credenciales han sido guardadas. Redirigiendo al login...");
            window.location.href = "login.html";
        }

    });
}