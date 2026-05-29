
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

    if(p2 && p2.value == "v"){
        puntos++;
    }

    if(p3 && p3.value == "v"){
        puntos++;
    }

    if(p4 && p4.value == "v"){
        puntos++;
    }

    if(p5 && p5.value == "f"){
        puntos++;
    }

    document.getElementById("resultado").innerHTML =
    "Tu nota es: " + puntos + " / 5";

}

function calcularValorPresente(){

    let vp = 0;
    let valorFuturo = recuperarFloat("txtValorFuturoVP");
    let interes = recuperarFloat("txtInteresVP");
    let tiempo = recuperarFloat("txtTiempoVP");

    vp = valorFuturo / Math.pow((1 + interes), tiempo);

    mostrarTexto(
        "lblResultadoVP",
        "Valor Presente: $" + vp.toFixed(2)
    );

}

function calcularValorFuturo(){

    let vf = 0;
    let interes = recuperarFloat("txtInteresVF");
    let tiempo = recuperarFloat("txtTiempoVF");
    let capitalInicial = recuperarFloat("txtCapitalInicialVF");

    vf = capitalInicial * Math.pow((1 + interes), tiempo);

    mostrarTexto("lblResultadoVF", "Valor Futuro: $" + vf.toFixed(2));

}

function calcularInteresSimple(){

    let interesSimple = 0;
    let capital = recuperarFloat("txtCapitalIS");
    let interes = recuperarFloat("txtInteresIS");
    let tiempo = recuperarFloat("txtTiempoIS");

    interesSimple = capital * interes * tiempo;

    mostrarTexto("lblResultadoIS", "Interés Simple: $" + interesSimple.toFixed(2));

}

function calcularInteresCompuesto(){

    let montoFinal = 0;
    let capital = recuperarFloat("txtCapitalIC");
    let interes = recuperarFloat("txtInteresIC");
    let tiempo = recuperarFloat("txtTiempoIC");

    montoFinal = capital * Math.pow((1 + interes), tiempo);

    mostrarTexto("lblResultadoIC", "Monto Final: $" + montoFinal.toFixed(2));

}