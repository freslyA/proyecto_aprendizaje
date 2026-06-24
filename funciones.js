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
// Capital amortizado constante; 

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

// Mostrar u ocultar aplicaciones dentro de una sección
function mostrarAplicacion(prefijo, numero) {
    let seleccionado = document.getElementById(prefijo + numero);
    if (!seleccionado) return;

    let contenedor = seleccionado.parentElement;
    let aplicaciones = contenedor.querySelectorAll('.aplicacion');

    aplicaciones.forEach(function(a) {
        if (a.id !== prefijo + numero) {
            a.classList.add('oculto');
        }
    });

    seleccionado.classList.toggle('oculto');
}
 // ===== COMPARADOR DE INVERSIONES =====
function compararInversiones() {
    let vf1    = recuperarFloat("txtVFA");
    let tasa1  = recuperarFloat("txtTasaA") / 100;
    let tiempo1 = recuperarFloat("txtTiempoA");

    let vf2    = recuperarFloat("txtVFB");
    let tasa2  = recuperarFloat("txtTasaB") / 100;
    let tiempo2 = recuperarFloat("txtTiempoB");

    if (isNaN(vf1) || isNaN(tasa1) || isNaN(tiempo1) ||
        isNaN(vf2) || isNaN(tasa2) || isNaN(tiempo2)) {
        mostrarHTML("resultadoComparador", "⚠️ Por favor ingresa todos los datos.");
        return;
    }

    let vpA = vf1 / Math.pow((1 + tasa1), tiempo1);
    let vpB = vf2 / Math.pow((1 + tasa2), tiempo2);

    let mensaje = "";
    let icono   = "";

    if (vpA > vpB) {
        icono   = "✅";
        mensaje = "La inversión <strong>A</strong> ofrece un mayor valor presente.";
    } else if (vpB > vpA) {
        icono   = "✅";
        mensaje = "La inversión <strong>B</strong> ofrece un mayor valor presente.";
    } else {
        icono   = "⚖️";
        mensaje = "Ambas inversiones tienen el <strong>mismo valor presente</strong>.";
    }

    mostrarHTML("resultadoComparador",
        "<div class='filaResultado'>" +
            "<span>Valor Presente A:</span>" +
            "<strong>$" + vpA.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Valor Presente B:</span>" +
            "<strong>$" + vpB.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" + icono + " " + mensaje + "</div>"
    );
}

// ===== HERENCIA =====
function calcularHerencia() {
    let vf     = recuperarFloat("txtHerenciaVF");
    let tasa   = recuperarFloat("txtHerenciaTasa") / 100;
    let tiempo = recuperarFloat("txtHerenciaTiempo");

    if (isNaN(vf) || isNaN(tasa) || isNaN(tiempo) ||
        vf <= 0  || tasa <= 0   || tiempo <= 0) {
        mostrarHTML("resultadoHerencia", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let vp = vf / Math.pow((1 + tasa), tiempo);

    mostrarHTML("resultadoHerencia",
        "<div class='filaResultado'>" +
            "<span>Valor de la herencia:</span>" +
            "<strong>$" + vf.toLocaleString("es-EC", {minimumFractionDigits: 2}) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Valor presente hoy:</span>" +
            "<strong>$" + vp.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "💡 Si hoy tuvieras <strong>$" + vp.toFixed(2) + "</strong> e invirtieras ese dinero " +
            "al <strong>" + (tasa * 100) + "%</strong> anual, dentro de <strong>" + tiempo + " años</strong> " +
            "tendrías aproximadamente <strong>$" + vf.toLocaleString("es-EC", {minimumFractionDigits: 2}) + "</strong>." +
        "</div>"
    );
}

// ===== PAGO HOY O DESPUÉS =====
function calcularPagoHoyDespues() {
    let pagoHoy    = recuperarFloat("txtPagoHoy");
    let pagoFuturo = recuperarFloat("txtPagoFuturo");
    let tasa       = recuperarFloat("txtPagoTasa") / 100;
    let tiempo     = recuperarFloat("txtPagoTiempo");

    if (isNaN(pagoHoy)  || isNaN(pagoFuturo) ||
        isNaN(tasa)     || isNaN(tiempo)      ||
        pagoHoy <= 0    || pagoFuturo <= 0    ||
        tasa <= 0       || tiempo <= 0) {
        mostrarHTML("resultadoPago", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let vp = pagoFuturo / Math.pow((1 + tasa), tiempo);

    let icono    = "";
    let veredicto = "";

    if (pagoHoy < vp) {
        icono     = "✅";
        veredicto = "Conviene pagar <strong>HOY</strong>, porque $" + pagoHoy.toFixed(2) +
                    " es menor que el valor presente del pago futuro ($" + vp.toFixed(2) + ").";
    } else if (vp < pagoHoy) {
        icono     = "✅";
        veredicto = "Conviene pagar <strong>DESPUÉS</strong>, porque su valor presente ($" +
                    vp.toFixed(2) + ") es menor que pagar $" + pagoHoy.toFixed(2) + " hoy.";
    } else {
        icono     = "⚖️";
        veredicto = "Ambas opciones tienen el <strong>mismo costo</strong> en términos de valor presente.";
    }

    mostrarHTML("resultadoPago",
        "<div class='filaResultado'>" +
            "<span>Pagar hoy:</span>" +
            "<strong>$" + pagoHoy.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Valor presente del pago futuro:</span>" +
            "<strong>$" + vp.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            icono + " " + veredicto +
        "</div>"
    );
}

// Evaluar proyecto

function evaluarProyecto() {
    let inversion = recuperarFloat("txtInversionInicial");
    let tasa      = recuperarFloat("txtInversionTasa") / 100;
    let ingreso1  = recuperarFloat("txtIngreso1");
    let ingreso2  = recuperarFloat("txtIngreso2");
    let ingreso3  = recuperarFloat("txtIngreso3");

    if (isNaN(inversion) || isNaN(tasa)     ||
        isNaN(ingreso1)  || isNaN(ingreso2) || isNaN(ingreso3) ||
        inversion <= 0   || tasa <= 0) {
        mostrarHTML("resultadoProyecto", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let vp1 = ingreso1 / Math.pow(1 + tasa, 1);
    let vp2 = ingreso2 / Math.pow(1 + tasa, 2);
    let vp3 = ingreso3 / Math.pow(1 + tasa, 3);

    let vpTotal = vp1 + vp2 + vp3;
    let van     = vpTotal - inversion; // Valor Actual Neto

    let icono     = "";
    let titulo    = "";
    let mensaje   = "";
    let colorVAN  = "";

    if (vpTotal > inversion) {
        icono    = "✅";
        titulo   = "PROYECTO RENTABLE";
        mensaje  = "Los ingresos futuros justifican la inversión realizada hoy.";
        colorVAN = "#4ade80";
    } else if (vpTotal < inversion) {
        icono    = "❌";
        titulo   = "PROYECTO NO RENTABLE";
        mensaje  = "La inversión es mayor que el valor actual de los ingresos futuros.";
        colorVAN = "#f87171";
    } else {
        icono    = "⚖️";
        titulo   = "PROYECTO EN PUNTO DE EQUILIBRIO";
        mensaje  = "Los ingresos futuros equivalen exactamente a la inversión inicial.";
        colorVAN = "#38bdf8";
    }

    mostrarHTML("resultadoProyecto",
        "<div class='filaResultado'>" +
            "<span>VP Año 1:</span>" +
            "<strong>$" + vp1.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>VP Año 2:</span>" +
            "<strong>$" + vp2.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>VP Año 3:</span>" +
            "<strong>$" + vp3.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>VP Total:</span>" +
            "<strong>$" + vpTotal.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Inversión inicial:</span>" +
            "<strong>$" + inversion.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>VAN (diferencia):</span>" +
            "<strong style='color:" + colorVAN + "'>$" + van.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredictoProyecto'>" +
            "<span class='iconoProyecto'>" + icono + "</span>" +
            "<span class='tituloProyecto' style='color:" + colorVAN + "'>" + titulo + "</span>" +
            "<span class='mensajeProyecto'>" + mensaje + "</span>" +
        "</div>"
    );
}
