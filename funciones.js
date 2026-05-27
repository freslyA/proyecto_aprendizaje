
function abrirMenu(){

    let menu = document.getElementById("menu");

    let contenido = document.getElementById("contenido");

    menu.classList.toggle("oculto");

    contenido.classList.toggle("expandido");

}

/* ===== MOSTRAR SECCION ===== */

function mostrarSeccion(idSeccion){

    let secciones = document.querySelectorAll("section");

    for(let i = 0; i < secciones.length; i++){

        secciones[i].style.display = "none";

    }

    document.getElementById(idSeccion).style.display = "block";

}

/* ===== CALIFICAR TEST ===== */

function calificar(){

    let puntos = 0;

    let p1 = document.querySelector('input[name="p1"]:checked');
    let p2 = document.querySelector('input[name="p2"]:checked');
    let p3 = document.querySelector('input[name="p3"]:checked');
    let p4 = document.querySelector('input[name="p4"]:checked');
    let p5 = document.querySelector('input[name="p5"]:checked');

    if(p1 && p1.value == "v"){
        puntos++;
    }

    if(p2 && p2.value == "f"){
        puntos++;
    }

    if(p3 && p3.value == "v"){
        puntos++;
    }

    if(p4 && p4.value == "f"){
        puntos++;
    }

    if(p5 && p5.value == "v"){
        puntos++;
    }

    document.getElementById("resultado").innerHTML =
    "Tu nota es: " + puntos + " / 5";

}