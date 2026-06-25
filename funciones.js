// ===== ABRIR / CERRAR MENU =====

function abrirMenu(){
    let menu = document.getElementById("menu");
    menu.classList.toggle("oculto");
}

// ===== MOSTRAR SECCION =====

function mostrarSeccion(idSeccion) {
    let secciones = document.querySelectorAll("section");
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none";
    }
    document.getElementById(idSeccion).style.display = "block";

    // Renderizar test con preguntas mezcladas al entrar
    if (idSeccion === "test") {
        renderizarTest();
    }
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

// ===== PREGUNTAS DEL TEST =====

let preguntasTest = [
    {
        texto: "El valor presente representa el dinero actual de una cantidad futura.",
        respuesta: "v",
        explicacion: "El valor presente permite conocer cuánto vale hoy una cantidad de dinero que se recibirá en el futuro, descontando la tasa de interés."
    },
    {
        texto: "El valor futuro calcula cuánto dinero habrá en el futuro.",
        respuesta: "v",
        explicacion: "El valor futuro proyecta cuánto valdrá una suma de dinero después de un período, considerando la tasa de interés aplicada."
    },
    {
        texto: "En el interés simple, los intereses se calculan solo sobre el capital inicial.",
        respuesta: "v",
        explicacion: "En el interés simple los intereses no se acumulan al capital, por lo que siempre se calculan sobre el monto original."
    },
    {
        texto: "En el interés compuesto, los intereses generan nuevos intereses.",
        respuesta: "v",
        explicacion: "En el interés compuesto los intereses de cada período se suman al capital, generando intereses sobre intereses en los períodos siguientes."
    },
    {
        texto: "En la amortización alemana las cuotas aumentan cada mes.",
        respuesta: "f",
        explicacion: "Las cuotas DISMINUYEN cada mes porque el capital amortizado es constante y los intereses se calculan sobre un saldo cada vez menor."
    }
];

let preguntasActuales = [];

// ===== MEZCLAR PREGUNTAS =====

function mezclarPreguntas(arr) {
    let copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = copia[i];
        copia[i] = copia[j];
        copia[j] = temp;
    }
    return copia;
}

// ===== RENDERIZAR TEST =====

function renderizarTest() {
    preguntasActuales = mezclarPreguntas(preguntasTest);
    let contenedor = document.getElementById("contenedorPreguntas");
    contenedor.innerHTML = "";

    preguntasActuales.forEach(function(pregunta, index) {
        let num = index + 1;
        contenedor.innerHTML +=
            "<div class='pregunta' id='pregunta" + index + "'>" +
                "<h3>" + num + ". " + pregunta.texto + "</h3>" +
                "<label>" +
                    "<input type='radio' name='p" + index + "' value='v' " +
                    "onchange='actualizarProgreso()'> Verdadero" +
                "</label>" +
                "<label>" +
                    "<input type='radio' name='p" + index + "' value='f' " +
                    "onchange='actualizarProgreso()'> Falso" +
                "</label>" +
            "</div>";
    });

    document.getElementById("resultado").innerHTML        = "";
    document.getElementById("barraProgreso").style.width  = "0%";
    document.getElementById("lblProgreso").innerText      = "0 de 5 respondidas";
    document.getElementById("lblPorcentajeProgreso").innerText = "0%";
    document.getElementById("btnReiniciar").style.display = "none";
}

// ===== ACTUALIZAR BARRA DE PROGRESO =====

function actualizarProgreso() {
    let total       = preguntasActuales.length;
    let respondidas = 0;

    for (let i = 0; i < total; i++) {
        let sel = document.querySelector('input[name="p' + i + '"]:checked');
        if (sel) respondidas++;
    }

    let porcentaje = Math.round((respondidas / total) * 100);
    document.getElementById("barraProgreso").style.width       = porcentaje + "%";
    document.getElementById("lblProgreso").innerText           = respondidas + " de " + total + " respondidas";
    document.getElementById("lblPorcentajeProgreso").innerText = porcentaje + "%";
}

// ===== CALIFICAR =====

function calificar() {
    let total  = preguntasActuales.length;
    let puntos = 0;
    let detalle = "";

    preguntasActuales.forEach(function(pregunta, index) {
        let sel      = document.querySelector('input[name="p' + index + '"]:checked');
        let correcta = sel && sel.value === pregunta.respuesta;

        if (correcta) {
            puntos++;
            detalle +=
                "<div class='detalleItem correcto'>" +
                    "<strong>✅ Pregunta " + (index + 1) + " correcta</strong>" +
                    "<p class='explicacionTest'>" + pregunta.explicacion + "</p>" +
                "</div>";
        } else {
            let respUsuario  = sel ? (sel.value === "v" ? "Verdadero" : "Falso") : "Sin respuesta";
            let respCorrecta = pregunta.respuesta === "v" ? "Verdadero" : "Falso";
            detalle +=
                "<div class='detalleItem incorrecto'>" +
                    "<strong>❌ Pregunta " + (index + 1) + " incorrecta</strong>" +
                    "<p>Tu respuesta: <em>" + respUsuario + "</em> &nbsp;|&nbsp; " +
                    "Correcta: <em>" + respCorrecta + "</em></p>" +
                    "<p class='explicacionTest'>" + pregunta.explicacion + "</p>" +
                "</div>";
        }
    });

    let porcentaje = Math.round((puntos / total) * 100);

    let nivel      = "";
    let colorNivel = "";
    if (porcentaje >= 90) {
        nivel      = "🏆 Experto";
        colorNivel = "#4ade80";
    } else if (porcentaje >= 70) {
        nivel      = "🎖️ Intermedio";
        colorNivel = "#38bdf8";
    } else {
        nivel      = "📚 Principiante";
        colorNivel = "#f87171";
    }

    let mensaje = "";
    if (puntos === total) {
        mensaje = "¡Excelente trabajo! Dominas todos los conceptos.";
    } else if (puntos >= 3) {
        mensaje = "¡Buen trabajo! Dominas la mayoría de conceptos.";
    } else {
        mensaje = "Necesitas repasar los temas. ¡Tú puedes!";
    }

    mostrarHTML("resultado",
        "<div class='tarjetaResultado'>" +
            "<h3 style='color:#38bdf8;margin-bottom:15px'>📊 Resultados</h3>" +
            "<div class='filaResultado'>" +
                "<span>✔ Correctas:</span>" +
                "<strong style='color:#4ade80'>" + puntos + " / " + total + "</strong>" +
            "</div>" +
            "<div class='filaResultado'>" +
                "<span>❌ Incorrectas:</span>" +
                "<strong style='color:#f87171'>" + (total - puntos) + " / " + total + "</strong>" +
            "</div>" +
            "<div class='filaResultado'>" +
                "<span>📊 Porcentaje:</span>" +
                "<strong>" + porcentaje + "%</strong>" +
            "</div>" +
            "<div class='filaResultado'>" +
                "<span>🏅 Nivel:</span>" +
                "<strong style='color:" + colorNivel + "'>" + nivel + "</strong>" +
            "</div>" +
            "<div class='veredicto'>" + mensaje + "</div>" +
        "</div>" +
        "<h3 style='color:#38bdf8;margin:25px 0 12px'>Detalle por pregunta</h3>" +
        detalle
    );

    document.getElementById("btnReiniciar").style.display = "block";
}

// ===== REINICIAR TEST =====

function reiniciarTest() {
    renderizarTest();
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

// ===== CUENTA DE AHORROS =====

function calcularAhorro() {
    let capital = recuperarFloat("txtAhorroCapital");
    let tasa    = recuperarFloat("txtAhorroTasa") / 100;
    let tiempo  = recuperarFloat("txtAhorroTiempo");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0) {
        mostrarHTML("resultadoAhorro", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let vf = capital * Math.pow(1 + tasa, tiempo);

    mostrarHTML("resultadoAhorro",
        "<div class='filaResultado'>" +
            "<span>Depósito inicial:</span>" +
            "<strong>$" + capital.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Dinero acumulado:</span>" +
            "<strong>$" + vf.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "💰 En <strong>" + tiempo + " años</strong> tu ahorro crecerá de " +
            "<strong>$" + capital.toFixed(2) + "</strong> a " +
            "<strong>$" + vf.toFixed(2) + "</strong>." +
        "</div>"
    );
}

// ===== CRECIMIENTO DE INVERSIÓN =====

function calcularCrecimiento() {
    let capital = recuperarFloat("txtCrecimientoCapital");
    let tasa    = recuperarFloat("txtCrecimientoTasa") / 100;
    let tiempo  = recuperarFloat("txtCrecimientoTiempo");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0) {
        mostrarHTML("resultadoCrecimiento", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let vf      = capital * Math.pow(1 + tasa, tiempo);
    let ganancia = vf - capital;

    mostrarHTML("resultadoCrecimiento",
        "<div class='filaResultado'>" +
            "<span>Inversión inicial:</span>" +
            "<strong>$" + capital.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Valor final:</span>" +
            "<strong>$" + vf.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Ganancia obtenida:</span>" +
            "<strong style='color:#4ade80'>$" + ganancia.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "📈 Tu inversión creció <strong>$" + ganancia.toFixed(2) + "</strong> " +
            "en <strong>" + tiempo + " años</strong>." +
        "</div>"
    );
}

// ===== META DE AHORRO =====

function calcularMeta() {
    let capital  = recuperarFloat("txtMetaCapital");
    let tasa     = recuperarFloat("txtMetaTasa") / 100;
    let tiempo   = recuperarFloat("txtMetaTiempo");
    let objetivo = recuperarFloat("txtMetaObjetivo");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) || isNaN(objetivo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0   || objetivo <= 0) {
        mostrarHTML("resultadoMeta", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let vf         = capital * Math.pow(1 + tasa, tiempo);
    let diferencia = objetivo - vf;

    let veredicto = "";
    if (vf >= objetivo) {
        veredicto = "<div class='veredicto'>✅ <strong>¡Alcanzas tu meta!</strong> " +
                    "Incluso te sobran <strong style='color:#4ade80'>$" +
                    Math.abs(diferencia).toFixed(2) + "</strong>.</div>";
    } else {
        veredicto = "<div class='veredicto'>❌ Aún <strong>no alcanzas tu meta</strong>. " +
                    "Te faltan <strong style='color:#f87171'>$" +
                    diferencia.toFixed(2) + "</strong>.</div>";
    }

    mostrarHTML("resultadoMeta",
        "<div class='filaResultado'>" +
            "<span>Monto acumulado:</span>" +
            "<strong>$" + vf.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Valor de la meta:</span>" +
            "<strong>$" + objetivo.toFixed(2) + "</strong>" +
        "</div>" +
        veredicto
    );
}

// ===== FONDO PARA ESTUDIOS =====

function calcularFondoEstudios() {
    let capital = recuperarFloat("txtEstudiosCapital");
    let tasa    = recuperarFloat("txtEstudiosTasa") / 100;
    let tiempo  = recuperarFloat("txtEstudiosTiempo");
    let costo   = recuperarFloat("txtEstudiosCosto");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) || isNaN(costo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0   || costo <= 0) {
        mostrarHTML("resultadoEstudios", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let fondo      = capital * Math.pow(1 + tasa, tiempo);
    let diferencia = costo - fondo;

    let veredicto = "";
    if (fondo >= costo) {
        veredicto = "<div class='veredicto'>✅ <strong>¡El fondo cubre los estudios!</strong> " +
                    "Te sobran <strong style='color:#4ade80'>$" +
                    Math.abs(diferencia).toFixed(2) + "</strong>.</div>";
    } else {
        veredicto = "<div class='veredicto'>❌ <strong>No cubre el costo total.</strong> " +
                    "Faltan <strong style='color:#f87171'>$" +
                    diferencia.toFixed(2) + "</strong>.</div>";
    }

    mostrarHTML("resultadoEstudios",
        "<div class='filaResultado'>" +
            "<span>Fondo acumulado:</span>" +
            "<strong>$" + fondo.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Costo de estudios:</span>" +
            "<strong>$" + costo.toFixed(2) + "</strong>" +
        "</div>" +
        veredicto
    );
}

// ===== PRÉSTAMO PERSONAL =====

function calcularPrestamo() {
    let capital = recuperarFloat("txtPrestamoCapital");
    let tasa    = recuperarFloat("txtPrestamoTasa") / 100;
    let tiempo  = recuperarFloat("txtPrestamoTiempo");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0) {
        mostrarHTML("resultadoPrestamo", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let interes = capital * tasa * tiempo;
    let total   = capital + interes;

    mostrarHTML("resultadoPrestamo",
        "<div class='filaResultado'>" +
            "<span>Monto prestado:</span>" +
            "<strong>$" + capital.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Interés a pagar:</span>" +
            "<strong style='color:#f87171'>$" + interes.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total a devolver:</span>" +
            "<strong>$" + total.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "💳 Por un préstamo de <strong>$" + capital.toFixed(2) + "</strong> " +
            "durante <strong>" + tiempo + " años</strong>, " +
            "pagarás <strong style='color:#f87171'>$" + interes.toFixed(2) + "</strong> de interés." +
        "</div>"
    );
}

// ===== AHORRO SIMPLE =====

function calcularAhorroSimple() {
    let capital = recuperarFloat("txtAhorroSimpleCapital");
    let tasa    = recuperarFloat("txtAhorroSimpleTasa") / 100;
    let tiempo  = recuperarFloat("txtAhorroSimpleTiempo");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0) {
        mostrarHTML("resultadoAhorroSimple", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let ganancia = capital * tasa * tiempo;
    let total    = capital + ganancia;

    mostrarHTML("resultadoAhorroSimple",
        "<div class='filaResultado'>" +
            "<span>Dinero ahorrado:</span>" +
            "<strong>$" + capital.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Ganancia:</span>" +
            "<strong style='color:#4ade80'>$" + ganancia.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Monto final:</span>" +
            "<strong>$" + total.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "🏦 Ahorrar <strong>$" + capital.toFixed(2) + "</strong> durante " +
            "<strong>" + tiempo + " años</strong> te generará " +
            "<strong style='color:#4ade80'>$" + ganancia.toFixed(2) + "</strong> de ganancia." +
        "</div>"
    );
}

// ===== SIMULADOR DE INVERSIÓN (INTERÉS COMPUESTO) =====

function calcularSimulador() {
    let capital = recuperarFloat("txtSimCapital");
    let tasa    = recuperarFloat("txtSimTasa") / 100;
    let tiempo  = recuperarFloat("txtSimTiempo");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0) {
        mostrarHTML("resultadoSimulador", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let montoFinal = capital * Math.pow(1 + tasa, tiempo);
    let ganancia   = montoFinal - capital;

    mostrarHTML("resultadoSimulador",
        "<div class='filaResultado'>" +
            "<span>Capital inicial:</span>" +
            "<strong>$" + capital.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Monto final:</span>" +
            "<strong>$" + montoFinal.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Ganancia obtenida:</span>" +
            "<strong style='color:#4ade80'>$" + ganancia.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "📈 Tu inversión de <strong>$" + capital.toFixed(2) + "</strong> " +
            "crecerá a <strong>$" + montoFinal.toFixed(2) + "</strong> " +
            "en <strong>" + tiempo + " años</strong>." +
        "</div>"
    );
}

// ===== META DE AHORRO (INTERÉS COMPUESTO) =====

function calcularMetaIC() {
    let capital  = recuperarFloat("txtMetaICCapital");
    let tasa     = recuperarFloat("txtMetaICTasa") / 100;
    let tiempo   = recuperarFloat("txtMetaICTiempo");
    let objetivo = recuperarFloat("txtMetaICObjetivo");

    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) || isNaN(objetivo) ||
        capital <= 0   || tasa <= 0   || tiempo <= 0   || objetivo <= 0) {
        mostrarHTML("resultadoMetaIC", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let monto      = capital * Math.pow(1 + tasa, tiempo);
    let diferencia = objetivo - monto;

    let veredicto = "";
    if (monto >= objetivo) {
        veredicto =
            "<div class='veredicto'>✅ <strong>¡Alcanzas tu meta!</strong> " +
            "Te sobran <strong style='color:#4ade80'>$" +
            Math.abs(diferencia).toFixed(2) + "</strong>.</div>";
    } else {
        veredicto =
            "<div class='veredicto'>❌ <strong>No alcanzas tu meta.</strong> " +
            "Te faltan <strong style='color:#f87171'>$" +
            diferencia.toFixed(2) + "</strong>.</div>";
    }

    mostrarHTML("resultadoMetaIC",
        "<div class='filaResultado'>" +
            "<span>Monto acumulado:</span>" +
            "<strong>$" + monto.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Meta deseada:</span>" +
            "<strong>$" + objetivo.toFixed(2) + "</strong>" +
        "</div>" +
        veredicto
    );
}

// ===== CRÉDITO DE ELECTRODOMÉSTICO =====

function calcularElectro() {
    let precio = recuperarFloat("txtElectroPrecio");
    let tasa   = recuperarFloat("txtElectroTasa") / 100;
    let cuotas = recuperarFloat("txtElectroCuotas");

    if (isNaN(precio) || isNaN(tasa) || isNaN(cuotas) ||
        precio <= 0   || cuotas <= 0) {
        mostrarHTML("resultadoElectro", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let cuotaMensual;
    if (tasa === 0) {
        cuotaMensual = precio / cuotas;
    } else {
        cuotaMensual = precio * (tasa * Math.pow(1 + tasa, cuotas)) /
                       (Math.pow(1 + tasa, cuotas) - 1);
    }

    let totalPagar = cuotaMensual * cuotas;
    let totalInteres = totalPagar - precio;

    mostrarHTML("resultadoElectro",
        "<div class='filaResultado'>" +
            "<span>Precio del producto:</span>" +
            "<strong>$" + precio.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Número de cuotas:</span>" +
            "<strong>" + cuotas + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Cuota mensual:</span>" +
            "<strong>$" + cuotaMensual.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total intereses:</span>" +
            "<strong style='color:#f87171'>$" + totalInteres.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total a pagar:</span>" +
            "<strong>$" + totalPagar.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "🖥️ Pagarás <strong>$" + cuotaMensual.toFixed(2) + "</strong> por mes " +
            "durante <strong>" + cuotas + " meses</strong>. " +
            "El crédito te costará <strong style='color:#f87171'>$" +
            totalInteres.toFixed(2) + "</strong> en intereses." +
        "</div>"
    );
}

// ===== CRÉDITO DE AUTOMÓVIL =====

function calcularAuto() {
    let valor  = recuperarFloat("txtAutoValor");
    let tasa   = recuperarFloat("txtAutoTasa") / 100;
    let cuotas = recuperarFloat("txtAutoCuotas");

    if (isNaN(valor) || isNaN(tasa) || isNaN(cuotas) ||
        valor <= 0   || cuotas <= 0) {
        mostrarHTML("resultadoAuto", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let cuotaMensual;
    if (tasa === 0) {
        cuotaMensual = valor / cuotas;
    } else {
        cuotaMensual = valor * (tasa * Math.pow(1 + tasa, cuotas)) /
                       (Math.pow(1 + tasa, cuotas) - 1);
    }

    let totalPagar   = cuotaMensual * cuotas;
    let totalInteres = totalPagar - valor;

    mostrarHTML("resultadoAuto",
        "<div class='filaResultado'>" +
            "<span>Valor del vehículo:</span>" +
            "<strong>$" + valor.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Número de cuotas:</span>" +
            "<strong>" + cuotas + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Cuota mensual:</span>" +
            "<strong>$" + cuotaMensual.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total intereses:</span>" +
            "<strong style='color:#f87171'>$" + totalInteres.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total a pagar:</span>" +
            "<strong>$" + totalPagar.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='veredicto'>" +
            "🚗 Pagarás <strong>$" + cuotaMensual.toFixed(2) + "</strong> por mes " +
            "durante <strong>" + cuotas + " meses</strong>. " +
            "El financiamiento te costará <strong style='color:#f87171'>$" +
            totalInteres.toFixed(2) + "</strong> en intereses." +
        "</div>"
    );
}

// ===== TABLA DE AMORTIZACIÓN FRANCESA =====

function generarTablaFrancesa() {
    let monto  = recuperarFloat("txtTFMonto");
    let tasaAnual  = recuperarFloat("txtTFTasa") / 100;
    let tasa       = tasaAnual / 12;
    let cuotas = recuperarInt("txtTFCuotas");

    if (isNaN(monto) || isNaN(tasa) || isNaN(cuotas) ||
        monto <= 0   || tasa <= 0   || cuotas <= 0) {
        mostrarHTML("resultadoTF", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let cuotaFija = monto * (tasa * Math.pow(1 + tasa, cuotas)) /
                    (Math.pow(1 + tasa, cuotas) - 1);

    let totalPagar   = cuotaFija * cuotas;
    let totalInteres = totalPagar - monto;
    let saldo        = monto;

    let filas = "";
    for (let i = 1; i <= cuotas; i++) {
        let interesMes  = saldo * tasa;
        let capitalMes  = cuotaFija - interesMes;
        saldo          -= capitalMes;
        if (saldo < 0.01) saldo = 0;

        filas +=
            "<tr>" +
                "<td>" + i + "</td>" +
                "<td>$" + cuotaFija.toFixed(2) + "</td>" +
                "<td>$" + capitalMes.toFixed(2) + "</td>" +
                "<td style='color:#f87171'>$" + interesMes.toFixed(2) + "</td>" +
                "<td>$" + saldo.toFixed(2) + "</td>" +
            "</tr>";
    }

    mostrarHTML("resultadoTF",
        "<div class='filaResultado'>" +
            "<span>Cuota fija mensual:</span>" +
            "<strong>$" + cuotaFija.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total intereses:</span>" +
            "<strong style='color:#f87171'>$" + totalInteres.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total a pagar:</span>" +
            "<strong>$" + totalPagar.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='tablaContenedor'>" +
            "<table class='tablaAmortizacion'>" +
                "<thead>" +
                    "<tr>" +
                        "<th>Mes</th>" +
                        "<th>Cuota</th>" +
                        "<th>Capital</th>" +
                        "<th>Interés</th>" +
                        "<th>Saldo</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>" + filas + "</tbody>" +
            "</table>" +
        "</div>"
    );
}

// ===== TABLA DE AMORTIZACIÓN ALEMANA =====

function generarTablaAlemana() {
    let monto  = recuperarFloat("txtTAMonto");
    let tasaAnual = recuperarFloat("txtTATasa") / 100;
    let cuotas = recuperarInt("txtTACuotas");
    let tasa   = tasaAnual / 12;

    if (isNaN(monto)    || isNaN(tasaAnual) || isNaN(cuotas) ||
        monto <= 0      || tasaAnual <= 0   || cuotas <= 0) {
        mostrarHTML("resultadoTA", "⚠️ Por favor ingresa todos los datos correctamente.");
        return;
    }

    let capitalFijo  = monto / cuotas;
    let saldo        = monto;
    let totalInteres = 0;
    let totalPagar   = 0;

    let filas = "";
    for (let i = 1; i <= cuotas; i++) {
        let interesMes = saldo * tasa;
        let cuotaMes   = capitalFijo + interesMes;
        saldo         -= capitalFijo;
        if (saldo < 0.01) saldo = 0;

        totalInteres += interesMes;
        totalPagar   += cuotaMes;

        filas +=
            "<tr>" +
                "<td>" + i + "</td>" +
                "<td>$" + capitalFijo.toFixed(2) + "</td>" +
                "<td style='color:#f87171'>$" + interesMes.toFixed(2) + "</td>" +
                "<td>$" + cuotaMes.toFixed(2) + "</td>" +
                "<td>$" + saldo.toFixed(2) + "</td>" +
            "</tr>";
    }

    mostrarHTML("resultadoTA",
        "<div class='filaResultado'>" +
            "<span>Capital por cuota:</span>" +
            "<strong>$" + capitalFijo.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total intereses:</span>" +
            "<strong style='color:#f87171'>$" + totalInteres.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='filaResultado'>" +
            "<span>Total a pagar:</span>" +
            "<strong>$" + totalPagar.toFixed(2) + "</strong>" +
        "</div>" +
        "<div class='tablaContenedor'>" +
            "<table class='tablaAmortizacion'>" +
                "<thead>" +
                    "<tr>" +
                        "<th>Mes</th>" +
                        "<th>Capital</th>" +
                        "<th>Interés</th>" +
                        "<th>Cuota</th>" +
                        "<th>Saldo</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>" + filas + "</tbody>" +
            "</table>" +
        "</div>"
    );
}