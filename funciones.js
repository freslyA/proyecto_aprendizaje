// ===== ABRIR / CERRAR MENU =====

function abrirMenu(){
    let menu = document.getElementById("menu");
    menu.classList.toggle("oculto");
}

// ===== MOSTRAR SECCION =====

function mostrarSeccion(idSeccion){
    let secciones = document.querySelectorAll("section");
    for(let i = 0; i < secciones.length; i++){
        secciones[i].style.display = "none";
    }
    document.getElementById(idSeccion).style.display = "block";
}

// ===== MOSTRAR PARTE (TABS dentro de una sección) =====

function mostrarParte(idSeccion, claseMostrar){
    let seccion = document.getElementById(idSeccion);
    if(!seccion) return;

    let contenidos = seccion.querySelectorAll(".contenido");
    contenidos.forEach(function(c){
        c.classList.remove("activo");
    });

    let mostrar = seccion.querySelector("." + claseMostrar);
    if(mostrar){
        mostrar.classList.add("activo");
    }
}

// ===== CALIFICAR TEST =====

function calificar(){
    let puntos = 0;

    let p1 = document.querySelector('input[name="p1"]:checked');
    let p2 = document.querySelector('input[name="p2"]:checked');
    let p3 = document.querySelector('input[name="p3"]:checked');
    let p4 = document.querySelector('input[name="p4"]:checked');
    let p5 = document.querySelector('input[name="p5"]:checked');

    if(p1 && p1.value == "v") puntos++;
    if(p2 && p2.value == "v") puntos++;
    if(p3 && p3.value == "v") puntos++;
    if(p4 && p4.value == "v") puntos++;
    if(p5 && p5.value == "f") puntos++; // La alemana DISMINUYE → "aumentan" es FALSO

    document.getElementById("resultado").innerHTML =
        "Tu nota es: " + puntos + " / 5";
}

// ===== VALOR PRESENTE =====
// Fórmula: VP = VF / (1 + i)^n
// El usuario ingresa la tasa como porcentaje (ej: 8 para 8%)

function calcularValorPresente(){
    let valorFuturo = recuperarFloat("txtValorFuturoVP");
    let interes     = recuperarFloat("txtInteresVP") / 100;
    let tiempo      = recuperarFloat("txtTiempoVP");

    if(isNaN(valorFuturo) || isNaN(interes) || isNaN(tiempo)){
        mostrarTexto("lblResultadoVP", "Por favor ingresa todos los datos.");
        return;
    }

    let vp = valorFuturo / Math.pow((1 + interes), tiempo);
    mostrarTexto("lblResultadoVP", "Valor Presente: $" + vp.toFixed(2));
}

// ===== VALOR FUTURO =====
// Fórmula: VF = C * (1 + i)^n

function calcularValorFuturo(){
    let capitalInicial = recuperarFloat("txtCapitalInicialVF");
    let interes        = recuperarFloat("txtInteresVF") / 100;
    let tiempo         = recuperarFloat("txtTiempoVF");

    if(isNaN(capitalInicial) || isNaN(interes) || isNaN(tiempo)){
        mostrarTexto("lblResultadoVF", "Por favor ingresa todos los datos.");
        return;
    }

    let vf = capitalInicial * Math.pow((1 + interes), tiempo);
    mostrarTexto("lblResultadoVF", "Valor Futuro: $" + vf.toFixed(2));
}

// ===== INTERÉS SIMPLE =====
// Fórmula: IS = C * i * t

function calcularInteresSimple(){
    let capital = recuperarFloat("txtCapitalIS");
    let interes = recuperarFloat("txtInteresIS") / 100;
    let tiempo  = recuperarFloat("txtTiempoIS");

    if(isNaN(capital) || isNaN(interes) || isNaN(tiempo)){
        mostrarTexto("lblResultadoIS", "Por favor ingresa todos los datos.");
        return;
    }

    let interesSimple = capital * interes * tiempo;
    mostrarTexto("lblResultadoIS", "Interés Simple: $" + interesSimple.toFixed(2));
}

// ===== INTERÉS COMPUESTO =====
// Fórmula: MA = C * (1 + i)^n

function calcularInteresCompuesto(){
    let capital = recuperarFloat("txtCapitalIC");
    let interes = recuperarFloat("txtInteresIC") / 100;
    let tiempo  = recuperarFloat("txtTiempoIC");

    if(isNaN(capital) || isNaN(interes) || isNaN(tiempo)){
        mostrarTexto("lblResultadoIC", "Por favor ingresa todos los datos.");
        return;
    }

    let montoFinal = capital * Math.pow((1 + interes), tiempo);
    mostrarTexto("lblResultadoIC", "Monto Final: $" + montoFinal.toFixed(2));
}

// ===== CUOTAS Y PAGOS PERIÓDICOS =====
// Fórmula anualidad: C = P * [i*(1+i)^n] / [(1+i)^n - 1]

function calcularCuotas(){
    let prestamo = recuperarFloat("txtPrestamoCPP");
    let interes  = recuperarFloat("txtInteresCPP") / 100;
    let cuotas   = recuperarFloat("txtMesesCPP");

    if(isNaN(prestamo) || isNaN(interes) || isNaN(cuotas)){
        mostrarTexto("lblResultadoCPP", "Por favor ingresa todos los datos.");
        return;
    }

    let cuotaMensual;
    if(interes === 0){
        cuotaMensual = prestamo / cuotas;
    } else {
        cuotaMensual = prestamo * (interes * Math.pow(1 + interes, cuotas)) /
                       (Math.pow(1 + interes, cuotas) - 1);
    }

    let totalPagar = cuotaMensual * cuotas;
    mostrarTexto(
        "lblResultadoCPP",
        "Cuota mensual: $" + cuotaMensual.toFixed(2) +
        " | Total a pagar: $" + totalPagar.toFixed(2)
    );
}

// ===== AMORTIZACIÓN FRANCESA =====
// Cuota fija cada período; los intereses bajan y el capital amortizado sube.

function calcularFrancesa(){
    let monto   = recuperarFloat("txtMontoAF");
    let interes = recuperarFloat("txtInteresAF") / 100;
    let cuotas  = recuperarInt("txtCuotasAF");

    if(isNaN(monto) || isNaN(interes) || isNaN(cuotas)){
        mostrarTexto("lblResultadoAF", "Por favor ingresa todos los datos.");
        return;
    }

    let cuotaFija;
    if(interes === 0){
        cuotaFija = monto / cuotas;
    } else {
        cuotaFija = monto * (interes * Math.pow(1 + interes, cuotas)) /
                    (Math.pow(1 + interes, cuotas) - 1);
    }

    let saldo = monto;
    let tabla = "<br><table style='width:100%;border-collapse:collapse;font-size:13px;margin-top:10px;color:#d1d5db'>";
    tabla += "<tr style='color:#38bdf8;border-bottom:1px solid rgba(255,255,255,0.2)'>" +
             "<th style='padding:6px'>Cuota</th>" +
             "<th style='padding:6px'>Interés</th>" +
             "<th style='padding:6px'>Capital</th>" +
             "<th style='padding:6px'>Saldo</th></tr>";

    for(let i = 1; i <= cuotas; i++){
        let interesDelPeriodo = saldo * interes;
        let capitalAmortizado = cuotaFija - interesDelPeriodo;
        saldo -= capitalAmortizado;
        if(saldo < 0.01) saldo = 0;

        tabla += "<tr style='text-align:center;border-bottom:1px solid rgba(255,255,255,0.05)'>" +
            "<td style='padding:5px'>" + i + "</td>" +
            "<td style='padding:5px'>$" + interesDelPeriodo.toFixed(2) + "</td>" +
            "<td style='padding:5px'>$" + capitalAmortizado.toFixed(2) + "</td>" +
            "<td style='padding:5px'>$" + saldo.toFixed(2) + "</td>" +
            "</tr>";
    }
    tabla += "</table>";

    mostrarHTML(
        "lblResultadoAF",
        "Cuota fija: $" + cuotaFija.toFixed(2) + tabla
    );
}

// ===== AMORTIZACIÓN ALEMANA =====
// Capital amortizado constante; intereses y cuota total decrecen cada período.

function calcularAlemana(){
    let monto   = recuperarFloat("txtMontoAL");
    let interes = recuperarFloat("txtInteresAL") / 100;
    let cuotas  = recuperarInt("txtCuotasAL");

    if(isNaN(monto) || isNaN(interes) || isNaN(cuotas)){
        mostrarTexto("lblResultadoAL", "Por favor ingresa todos los datos.");
        return;
    }

    let capitalFijo = monto / cuotas;
    let saldo       = monto;
    let tabla       = "<br><table style='width:100%;border-collapse:collapse;font-size:13px;margin-top:10px;color:#d1d5db'>";
    tabla += "<tr style='color:#38bdf8;border-bottom:1px solid rgba(255,255,255,0.2)'>" +
             "<th style='padding:6px'>Cuota</th>" +
             "<th style='padding:6px'>Capital</th>" +
             "<th style='padding:6px'>Interés</th>" +
             "<th style='padding:6px'>Total</th>" +
             "<th style='padding:6px'>Saldo</th></tr>";

    for(let i = 1; i <= cuotas; i++){
        let interesDelPeriodo = saldo * interes;
        let totalCuota        = capitalFijo + interesDelPeriodo;
        saldo -= capitalFijo;
        if(saldo < 0.01) saldo = 0;

        tabla += "<tr style='text-align:center;border-bottom:1px solid rgba(255,255,255,0.05)'>" +
            "<td style='padding:5px'>" + i + "</td>" +
            "<td style='padding:5px'>$" + capitalFijo.toFixed(2) + "</td>" +
            "<td style='padding:5px'>$" + interesDelPeriodo.toFixed(2) + "</td>" +
            "<td style='padding:5px'>$" + totalCuota.toFixed(2) + "</td>" +
            "<td style='padding:5px'>$" + saldo.toFixed(2) + "</td>" +
            "</tr>";
    }
    tabla += "</table>";

    mostrarHTML(
        "lblResultadoAL",
        "Capital por cuota: $" + capitalFijo.toFixed(2) + tabla
    );
}