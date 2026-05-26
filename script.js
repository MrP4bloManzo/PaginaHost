// ======================================================
// MQTT
// ======================================================

const broker =
"wss://284ea00207d1472198a41001bc987372.s1.eu.hivemq.cloud:8884/mqtt";

const options = {

    username:
    "hivemq.webclient.1762360309320",

    password:
    "7HW2O@xyh1.YId$9,ucG"
};

const client =
    mqtt.connect(broker, options);

// ======================================================
// TOPICS
// ======================================================

const topicSensores =
"petstation/device01/sensores";

const topicComandos =
"petstation/device01/comandos";

const topicLogs =
"petstation/device01/logs";

// ======================================================
// ELEMENTOS
// ======================================================

const circleAgua =
document.getElementById("circleAgua");

const circleComida =
document.getElementById("circleComida");

const textoAlerta =
document.getElementById("textoAlerta");

const estadoWifi =
document.getElementById("estadoWifi");

const estadoSensores =
document.getElementById("estadoSensores");

const historialBody =
document.getElementById("historialBody");

// ======================================================
// MQTT CONNECT
// ======================================================

client.on("connect", () => {

    estadoWifi.textContent =
    "Conectado ✅";

    client.subscribe(topicSensores);

    client.subscribe(topicLogs);

    textoAlerta.textContent =
    "PETSTATION ONLINE 🚀";
});

// ======================================================
// MQTT MESSAGE
// ======================================================

client.on("message",
(topic, message) => {

    const data =
    message.toString();

    // SENSORES

    if(topic === topicSensores){

        const json =
        JSON.parse(data);

        actualizarCirculo(
            circleAgua,
            json.agua
        );

        actualizarCirculo(
            circleComida,
            json.comida
        );

        estadoSensores.textContent =
        `Agua ${json.agua}% | Comida ${json.comida}%`;

        // ALERTAS

        if(json.agua < 20){

            textoAlerta.textContent =
            "⚠️ Agua Baja ⚠️";
        }

        else if(json.comida < 20){

            textoAlerta.textContent =
            "⚠️ Comida Baja ⚠️";
        }

        else{

            textoAlerta.textContent =
            "🐶 Todo Petibien 🐱";
        }
    }

    // LOGS

    if(topic === topicLogs){

        agregarHistorial(
            "Sistema",
            data
        );
    }
});

// ======================================================
// CIRCULOS
// ======================================================

function actualizarCirculo(
    elemento,
    porcentaje
){

    elemento.innerHTML =
    `<span>${porcentaje}%</span>`;

    elemento.style.background =
    `conic-gradient(
        #ff9800 ${porcentaje * 3.6}deg,
        #333 0deg
    )`;
}

// ======================================================
// BOTONES
// ======================================================

document
.getElementById("btnRellenarComida")
.addEventListener("click", () => {

    client.publish(
        topicComandos,
        "DISPENSAR_ALIMENTO"
    );

    agregarHistorial(
        "Comida",
        "Dispensado Manual"
    );
});

document
.getElementById("btnRellenarAgua")
.addEventListener("click", () => {

    client.publish(
        topicComandos,
        "BOMBA_ON"
    );

    agregarHistorial(
        "Agua",
        "Bomba Activada"
    );

    setTimeout(() => {

        client.publish(
            topicComandos,
            "BOMBA_OFF"
        );

    }, 5000);
});

// ======================================================
// HISTORIAL
// ======================================================

function agregarHistorial(
    tipo,
    accion
){

    const fila =
    document.createElement("tr");

    fila.innerHTML = `

        <td>
        ${new Date().toLocaleString()}
        </td>

        <td>${tipo}</td>

        <td>${accion}</td>
    `;

    historialBody.prepend(fila);
}

// ======================================================
// BORRAR HISTORIAL
// ======================================================

document
.getElementById("btnBorrarHistorial")
.addEventListener("click", () => {

    historialBody.innerHTML = "";
});