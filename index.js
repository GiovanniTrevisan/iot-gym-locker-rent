// Variáveis para armazenar as informações do servidor, porta e tópico
var server;
var port;
var topic;

let armarioSelecionado = 0;

// Criar um cliente MQTT
var client = new Paho.MQTT.Client(server, Number(port), "clientId");

// Função para conectar ao servidor MQTT
function connect() {
    console.log("Tentando se conectar ao servidor MQTT...");
    client.connect({
        onSuccess: function () {
            console.log("Conectado com sucesso!");
            // Inscrever-se no tópico especificado
            client.subscribe(topic);
        },
        onFailure: function (message) {
            console.log("Falha ao conectar: " + message.errorMessage);
        },
    });
}

var selectArmario = document.getElementById("formControlSelectArmario");

function sendMessage() {

    var selectedOption = selectArmario.options[selectArmario.selectedIndex].value;
    client.send(message);
    var message = new Paho.MQTT.Message("Seu armário " + selectedOption.toString() + " foi solicitado");
    message.destinationName = topic;
    client.send(message);
}

// Atribua valores às variáveis ​​do servidor, porta e tópico
document.getElementById("server").addEventListener("change", function (event) {
    server = event.target.value;
});

document.getElementById("port").addEventListener("change", function (event) {
    port = event.target.value;
});

document.getElementById("topic").addEventListener("change", function (event) {
    topic = event.target.value;
});

// Adicione um event listener ao botão Solicitar
document.getElementById("solicitar").addEventListener("click", function () {
    connect();
    sendMessage();
});