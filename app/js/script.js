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
            <input type="checkbox" id="add24" checked="true">
            <label for="add24">Adicionar 24 minutos?</label>
        </div>

        <div class="form-group mb-16">
            <input type="checkbox" id="isEstag">
            <label for="isEstag">É estagiário?</label>
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

    <footer>By <a href="https://backefront.com.br">Victor Jordan</a></footer>
  `;
})();

function calc() {

    const user = {
        he: document.getElementById("horaEntrada").value,
        a1: document.getElementById("horaAlmoco1").value,
        a2: document.getElementById("horaAlmoco2").value,
        hs: document.getElementById("valorHoraSobrando").value,
        isEstagiario: document.getElementById('isEstag').checked,
        add24: document.getElementById('add24').checked
    };
    
    user.a1 = moment(user.a1, 'HH:mm');
    user.a2 = moment(user.a2, 'HH:mm');

    user.totalAlmoco = user.a2.diff(user.a1);
    user.totalAlmoco = (user.totalAlmoco / 60 / 1000);

    if (user.hs === "") {
        var horarioFinal = 
            moment(user.he, 'HH:mm')
                .add(user.isEstagiario ? 6 : 8, 'hours')
                .add(user.isEstagiario || !user.add24 ? 0 : 24, 'minutes').add(user.totalAlmoco, 'minutes');
        showHour(horarioFinal);
    } else {
        var minutes = parseToMinute(user.hs);
        if (minutes >= 480) {
            showError();
        } else {
            var horarioFinal = 
                moment(user.he, 'HH:mm')
                    .add(user.isEstagiario ? 6 : 8, 'hours')
                    .add(user.isEstagiario || !user.add24 ? 0 : 24, 'minutes').add(user.totalAlmoco, 'minutes');
            showHour(horarioFinal);
        }
    }

};

document.getElementById("horaAlmoco2").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        calc();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#horaSobra').addEventListener('change', changeHandler);
});

function changeHandler() {
    if (horaSobra.checked) {
        let inputHS = document.getElementById("valorHoraSobrando").value = '';
        document.getElementById('js-horaSobrando').classList.remove('hidden');
    } else {
        let inputHS = document.getElementById("valorHoraSobrando").value = '';
        document.getElementById('js-horaSobrando').classList.add('hidden');
    }
};

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

    setTimeout(() => {
        saida.classList.add("hidden");
    }, 5000);

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

    document.getElementById('js-closeAlert').addEventListener("click", function () {
        var saida = document.getElementById("saida");
        saida.classList.add("hidden");
        saida.classList.remove("alert-error");
    });

    setTimeout(() => {
        saida.classList.add("hidden");
    }, 5000);
};

function parseToMinute(hs) {
    var a = hs.split(':');
    var minutes = (+a[0]) * 60 + (+a[1]);
    return minutes
};