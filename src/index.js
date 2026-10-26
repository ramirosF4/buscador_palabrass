
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/main.css';
import Swal from "sweetalert2";


const entrada_texto = document.getElementById('texto'); 
const entrada_palabra = document.getElementById('palabra'); 
const btn_buscar = document.getElementById('btn_buscar'); 
const btn_limpiar = document.getElementById('btn_eliminar'); 
const mostrarPalabras = document.getElementById('mostrarPalabras');

const msj_error = (msj) =>{
    Swal.fire({
        icon:"warning",
        title:"Error!",
        text:msj
    });
}
const msj_succes= (titulo, mensaje)=> {
    Swal.fire({
        icon: 'success',
        title: titulo,
        text: mensaje,
        confirmButtonColor: '#28a745', 
        timer: 3000,                  
        timerProgressBar: true
    });
}

console.log(validarTexto());

const validarTexto = () => {
    let expresionTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:!?¿¡()"'’-]+$/;
    return expresionTexto.test(entrada_texto.value.trim());
};

btn_limpiar.addEventListener('click', () => {
    entrada_texto.value = '';
    entrada_palabra.value = '';
    mostrarPalabras.value = '';

    entrada_texto.focus();
});

btn_buscar.addEventListener('click', () => {
    let texto = entrada_texto.value.trim();
     
    if (texto === '') {
        msj_error('Por favor, ingresa un texto.');
        entrada_texto.focus();
    }
    else if (!validarTexto()) {
        msj_error('El texto solamente debe contener letras y espacios.');
        entrada_texto.focus();
    }
    else {
        msj_succes('Texto válido', texto);
    }

});

btn_buscar.addEventListener('click', () => {
    let texto = entrada_texto.value.trim();
    let palabra = entrada_palabra.value.trim();
    if (texto === '' || palabra === '') {
        msj_error('Debes ingresar el texto y la palabra que deseas buscar.');
    }
    else if (!validarTexto() || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(palabra)) {
        msj_error('Ingresa solamente letras y espacios en el texto.');
    }
    else {
        let textosinCaracteres = texto.toLowerCase().replace(/[.,;:!?¿¡()"]/g, '');

        let palabras = textosinCaracteres.split(/\s+/);

        let coincidencias = palabras.filter(
            elemento => elemento === palabra.toLowerCase()
        );
        mostrarPalabras.value = 'Palabra buscada: ' + palabra + '\n' + 'Coincidencias encontradas: ' + coincidencias.length + '\n\n' + 'Palabras encontradas:\n' + (coincidencias.length > 0 ? coincidencias.join('\n') : 'No se encontraron coincidencias.');
    }

});

