//inicializacion de variables

let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;


//apuntando a documentos html
let mostrarMovimeintos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restantes");

// audio

let winAudio = new Audio(`../sonido/click - copia.wav`);
let loseAudio = new Audio(`../sonido/lose.wav`);
let clickAudio = new Audio(`../sonido/right.wav`);
let rightAudio = new Audio(`../sonido/win.wav`);
let wrongAudio = new Audio(`../sonido/wrong.wav`);





//generacion de numeros alatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
    return Math.random() - 0.5
});
console.log(numeros);

//funciones 
function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `tiempo: ${timer} segundos;`;
        if (timer == 0) {
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
            loseAudio.play();

        }

    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = ` <img src="../img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}
//funcion principal

function destapar(id) {


    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }


    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //mostrar id
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = ` <img src="../img/${primerResultado}.png" alt="">`;
        clickAudio.play();
        //deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //mostrar segundo numeros
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = ` <img src="../img/${segundoResultado}.png" alt="">`;

        //desabilitar segundo boton
        tarjeta2.disabled = true;

        //incrementar movimientos
        movimientos++;
        mostrarMovimeintos.innerHTML = ` movmientos: ${movimientos} `;

        if (primerResultado == segundoResultado) {
            //encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} `;
            rightAudio.play();

            if (aciertos == 8) {
                winAudio.play();
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} `;
                mostrarTiempo.innerHTML = `Fantastico solo te demoraste ${timerInicial = timer} segundos`;
                mostrarMovimeintos.innerHTML = `Movimientos: ${movimientos} `;
            }

        } else {
            //mostrar momentaniamente y despues tapar
            wrongAudio.play();
            setTimeout(() => {
                tarjeta1.innerHTML = ``;
                tarjeta2.innerHTML = ``;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }


    }

}