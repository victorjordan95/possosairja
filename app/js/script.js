'use strict';

(function () {
  document.getElementById('app-sair').innerHTML = `
    <p id="saida" class="alert hidden"></p>
    
    <h1>Que horas posso sair?</h1>

    <div class="input-box">
        <div class="form-group">
            <label>Hora Entrada</label>
            <input type="time" id="horaEntrada" placeholder="Hora que entrou!">
        </div>
        <div class="form-group">
            <label>Saída para almoço</label>
            <input type="time" id="horaAlmoco1" placeholder="Hora que saiu para o rango!">
        </div>
        <div class="form-group">
            <label>Volta do almoço</label>
            <input type="time" id="horaAlmoco2" placeholder="Hora que voltou!">
        </div>
        <div class="form-group mb-16">
            <input type="checkbox" id="horaSobra">
            <label for="horaSobra">Possui hora sobrando?</label>
        </div>
        <div class="form-group hidden" id="js-horaSobrando">
            <label>Hora sobrando</label>
            <input type="time" id="valorHoraSobrando" placeholder="Quantas horas tem de sobra?">
        </div>

        <button onClick="calc()">Quero Sair</button>
    </div>

    <footer>By <a href="https://victorjordan95.github.io">Victor Jordan</a></footer>
  `;
})();

function calc() {
    let he = document.getElementById("horaEntrada").value;
    let a1 = document.getElementById("horaAlmoco1").value;
    let a2 = document.getElementById("horaAlmoco2").value;
    let hs = document.getElementById("valorHoraSobrando").value;

    a1 = moment(a1, 'HH:mm');
    a2 = moment(a2, 'HH:mm');

    let totalAlmoco = a2.diff(a1);
    totalAlmoco = ( totalAlmoco / 60 / 1000 );

    if (hs === "") {
        var horarioFinal = moment(he, 'HH:mm').add(8, 'hours').add(24, 'minutes').add(totalAlmoco, 'minutes');
        showHour(horarioFinal);
    } else {
        var minutes = parseToMinute(hs);
        if (minutes >= 480) {
            showError();
        } else {
            var horarioFinal = moment(he, 'HH:mm').add(8, 'hours').subtract(minutes, 'minutes').add(24, 'minutes').add(totalAlmoco, 'minutes');
            showHour(horarioFinal);
        }
        
    }
    
};

var input = document.getElementById("horaAlmoco2");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        calc();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#horaSobra').addEventListener('change', changeHandler);
});


function changeHandler(){
    if(horaSobra.checked){
        let inputHS = document.getElementById("valorHoraSobrando").value = '';
        document.getElementById('js-horaSobrando').classList.remove('hidden');
    }
    else{
        let inputHS = document.getElementById("valorHoraSobrando").value = '';
        document.getElementById('js-horaSobrando').classList.add('hidden');
    }
 }

function showHour(horarioFinal) {
    var saida = document.getElementById("saida");
    saida.classList.remove("hidden");
    saida.classList.add("alert-success");
    saida.innerHTML = `
    <span class="close-alert" id="js-closeAlert">&times;</span>
    Horário oficial de saída: <b>${(horarioFinal).format('HH:mm')}</b>  
`;

    var closeAlertBtn = document.getElementById('js-closeAlert');
    closeAlertBtn.addEventListener("click", function () {
        var saida = document.getElementById("saida");
        saida.classList.add("hidden");
        saida.classList.remove("alert-success");
    });

};

function showError() {
    var saida = document.getElementById("saida");
    saida.classList.remove("hidden");
    saida.classList.add("alert-error");
    saida.innerHTML = `
        <span class="close-alert" id="js-closeAlert">&times;</span>
        Cara, você tem mais que 1 dia em horas sobrando <br>
        Por que você veio trabalhar?
    `;

    var closeAlertBtn = document.getElementById('js-closeAlert');
    closeAlertBtn.addEventListener("click", function () {
        var saida = document.getElementById("saida");
        saida.classList.add("hidden");
        saida.classList.remove("alert-error");
    });
};

function parseToMinute(hs){
    var hms = hs;
    var a = hms.split(':');
    var minutes = (+a[0]) * 60 + (+a[1]);
    return minutes
};