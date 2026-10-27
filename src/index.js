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
const entradaPalabraRemplazar = document.getElementById('palabraRemplazar'); 
const btn_remplazar = document.getElementById('btn_remplazar'); 
const salida_texto = document.getElementById('mostrarTextoPalabras'); 

const msj_error = (msj) => {
    Swal.fire({
        icon: "warning",
        title: "Error!",
        text: msj
    });
};

const msj_succes = (titulo, mensaje) => {
    Swal.fire({
        icon: 'success',
        title: titulo,
        text: mensaje,
        confirmButtonColor: '#28a745', 
        timer: 3000,                  
        timerProgressBar: true
    });
};

const validarTexto = (texto) => {
    let expresionTexto = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,;:!?¿¡()"'’-]+$/;
    return expresionTexto.test(texto);
};

btn_limpiar.addEventListener('click', () => {
    entrada_texto.value = '';
    entrada_palabra.value = '';
    if (entradaPalabraRemplazar) entradaPalabraRemplazar.value = '';
    if (mostrarPalabras) mostrarPalabras.value = '';
    if (salida_texto) salida_texto.value = '';

    entrada_texto.focus();
});

btn_buscar.addEventListener('click', () => {
    let texto = entrada_texto.value.trim();
    let palabra = entrada_palabra.value.trim();

    if (texto === '' || palabra === '') {
        msj_error('Debes ingresar tanto el texto como la palabra que deseas buscar.');
        return;
    }

    if (!validarTexto(texto)) {
        msj_error('El texto contiene caracteres no permitidos.');
        return;
    }

    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(palabra)) {
        msj_error('La palabra a buscar solo debe contener letras o números.');
        return;
    }

    let textosinCaracteres = texto.toLowerCase().replace(/[.,;:!?¿¡()"'’-]/g, '');
    let palabras = textosinCaracteres.split(/\s+/);

    let coincidencias = palabras.filter(
        elemento => elemento === palabra.toLowerCase()
    );

    mostrarPalabras.value = 'Palabra buscada: ' + palabra + '\n' +
        'Coincidencias encontradas: ' + coincidencias.length + '\n\n' +
        'Palabras encontradas:\n' + 
        (coincidencias.length > 0 ? coincidencias.join('\n') : 'No se encontraron coincidencias.');
});

btn_remplazar.addEventListener('click', () => {
    let texto = entrada_texto.value.trim();
    let palabraBuscar = entrada_palabra.value.trim();
    let palabraNueva = entradaPalabraRemplazar.value.trim(); 

    if (texto === '' || palabraBuscar === '' || palabraNueva === '') {
        msj_error('Debes ingresar el texto, la palabra a buscar y la palabra de reemplazo.');
        return;
    }

    if (!validarTexto(texto)) {
        msj_error('El texto contiene caracteres no permitidos.');
        return;
    }

    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(palabraBuscar) || !/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$/.test(palabraNueva)) {
        msj_error('Las palabras a buscar y reemplazar solo deben contener letras o números.');
        return;
    }

    const expresion = new RegExp(`\\b${palabraBuscar}\\b`, 'gi');
    let textoReemplazado = texto.replace(expresion, palabraNueva);

    if (salida_texto) salida_texto.value = textoReemplazado; 
    if (mostrarPalabras) {
        mostrarPalabras.value = `Palabra buscada: ${palabraBuscar}\nReemplazada por: ${palabraNueva}\n\nTexto final:\n${textoReemplazado}`;
    }

    msj_succes('Reemplazadoo exitosamente!', '(:');
});