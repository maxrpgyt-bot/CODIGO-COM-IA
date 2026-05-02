document.addEventListener("DOMContentLoaded", function () {

    let pontos = {
        sanguineo: 0,
        colerico: 0,
        melancolico: 0,
        fleumatico: 0
    };

    let perguntasRespondidas = 0;

    const perguntas = document.querySelectorAll(".question");
    const totalPerguntas = perguntas.length;

    const botoes = document.querySelectorAll(".answers button");
    const resultadoEl = document.getElementById("resultado");
    const restartBtn = document.getElementById("restart-btn");

    // clique nas respostas
    botoes.forEach(botao => {
        botao.addEventListener("click", function () {

            const pergunta = botao.closest(".question");

            // se já respondeu essa pergunta, ignora
            if (!pergunta || pergunta.classList.contains("respondida")) return;

            // marca como respondida
            pergunta.classList.add("respondida");
            perguntasRespondidas++;

            const tipo = botao.dataset.tipo;

            // soma ponto
            if (pontos[tipo] !== undefined) {
                pontos[tipo]++;
            }

            // desativa botões dessa pergunta
            const botoesDaPergunta = pergunta.querySelectorAll("button");
            botoesDaPergunta.forEach(b => b.disabled = true);

            // quando terminar tudo
            if (perguntasRespondidas === totalPerguntas) {
                mostrarResultado();
                window.scrollTo({ top: 0, behavior: "smooth" }); // sobe pra mostrar
            }

        });
    });

    function mostrarResultado() {
        let maior = "sanguineo";

        for (let tipo in pontos) {
            if (pontos[tipo] > pontos[maior]) {
                maior = tipo;
            }
        }

        let mensagem = "";

        if (maior === "sanguineo") {
            mensagem = "Sanguíneo: comunicativo, energético e sociável.";
        } else if (maior === "colerico") {
            mensagem = "Colérico: intenso, decidido e líder.";
        } else if (maior === "melancolico") {
            mensagem = "Melancólico: profundo, analítico e sensível.";
        } else if (maior === "fleumatico") {
            mensagem = "Fleumático: calmo, equilibrado e paciente.";
        }

        resultadoEl.innerText = "Seu temperamento é: " + mensagem;
    }

    // botão reiniciar
    restartBtn.addEventListener("click", function () {

        pontos = {
            sanguineo: 0,
            colerico: 0,
            melancolico: 0,
            fleumatico: 0
        };

        perguntasRespondidas = 0;

        resultadoEl.innerText = "";

        // reativa botões
        botoes.forEach(botao => botao.disabled = false);

        // remove marcação
        perguntas.forEach(pergunta => {
            pergunta.classList.remove("respondida");
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});