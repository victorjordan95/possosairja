'use strict';

(function () {
  document.getElementById('app-sair').innerHTML = `
    <h1>Que horas posso sair?</h1>

    <div class="input-box">
        <label>Hora Entrada</label>
        <input type="text" id="horaEntrada" placeholder="Digite a hora que entrou!">

        <label>Saída para almoço</label>
        <input type="text" id="horaAlmoco1" placeholder="Digite a hora que saiu para o rango!">

        <label>Volta do almoço</label>
        <input type="text" id="horaAlmoco2" placeholder="Digite a hora que voltou!">

        <button onClick="calc()">Quero Sair</button>
    </div>

    <p id="saida" class="hidden"></p>
  `;
})();

function calc() {
    let he = document.getElementById("horaEntrada").value;
    let a1 = document.getElementById("horaAlmoco1").value;
    let a2 = document.getElementById("horaAlmoco2").value;

    a1 = moment(a1, 'HH:mm');
    a2 = moment(a2, 'HH:mm');

    let totalAlmoco = a2.diff(a1);
    totalAlmoco = ( totalAlmoco / 60 / 1000 );
    
    let horarioFinal = moment(he, 'HH:mm').add(8, 'hours').add(24, 'minutes').add(totalAlmoco, 'minutes');
    
    showHour(horarioFinal);
};

var input = document.getElementById("horaAlmoco2");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        calc();
    }
});


function showHour(horarioFinal) {
    var saida = document.getElementById("saida");
    saida.classList.remove("hidden")
    saida.innerHTML = `
    Horário oficial de saída: <b>${(horarioFinal).format('HH:mm')}</b> <br> <br>
    Podendo sair entre <b>${moment(horarioFinal, 'HH:mm').subtract(10, "minutes").format('HH:mm')}</b> e <b>${moment(horarioFinal, 'HH:mm').add(10, "minutes").format('HH:mm')}</b>
`;
};