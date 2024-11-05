const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPause = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarPausarTexto = document.querySelector("#start-pause span");
const iniciarPausarImagem = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("/sons/luna-rise-part-one.mp3");
const playMusica = new Audio("/sons/play.wav");
const pauseMusica = new Audio("/sons/pause.mp3");
const acabouMusica = new Audio("/sons/beep.mp3");
musica.loop = true;

let tempoCorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBt.addEventListener("click", () => {
    tempoCorridoEmSegundos = 1500;
    mostrarTempo();
    alterarContexto("foco");
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
    tempoCorridoEmSegundos = 300;
    mostrarTempo();
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
    tempoCorridoEmSegundos = 900;
    mostrarTempo();
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");
});

function alterarContexto(contexto) {
    botoes.forEach((botoes) => {
        botoes.classList.remove("active");
    });
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoCorridoEmSegundos <= 0) {
        // acabouMusica.play();
        alert("tempo finalizado");
        iniciarPausarImagem.setAttribute("src", "/imagens/play_arrow.png");
        iniciarPausarTexto.textContent = "Começar";
        zerar();
        return;
    }
    tempoCorridoEmSegundos -= 1;
    mostrarTempo();
};

startPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        pauseMusica.play();
        iniciarPausarImagem.setAttribute("src", "/imagens/play_arrow.png");
        iniciarPausarTexto.textContent = "Começar";
        zerar();
        return;
    }
    playMusica.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarPausarImagem.setAttribute("src", "/imagens/pause.png");
    iniciarPausarTexto.textContent = "Pausar";
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoCorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", { minute: "2-digit", second: "2-digit" });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
