// ===== CARROSSEL DE TECNOLOGIAS =====

const techTrack = document.getElementById('tech-track');
const techContainer = document.getElementById('tech-container');
const techPrev = document.getElementById('tech-prev');
const techNext = document.getElementById('tech-next');

if (techTrack && techContainer && techPrev && techNext) {

    // Guarda os itens originais
    const techItems = Array.from(techTrack.children);

    // Duplica os itens para criar o looping infinito
    techItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        techTrack.appendChild(clone);
    });

    let position = 0;
    let loopWidth = 0;
    let previousTime = 0;

    let animacaoManual = null;
    let pausaAte = 0;

    const velocidade = 75;
    const duracaoTransicao = 350;

    // Calcula a largura de um conjunto
    function calcularLargura() {
        const primeiro = techTrack.children[0];
        const primeiraCopia = techTrack.children[techItems.length];

        loopWidth =
            primeiraCopia.getBoundingClientRect().left -
            primeiro.getBoundingClientRect().left;
    }

    // Normaliza a posição dentro do ciclo
    function normalizarPosicao(valor) {
        return ((valor % loopWidth) + loopWidth) % loopWidth;
    }

    // Atualiza a posição visual
    function atualizarPosicao() {
        techTrack.style.transform =
            `translate3d(${-position}px, 0, 0)`;
    }

    calcularLargura();

    window.addEventListener('resize', calcularLargura);

    // Navegação manual com transição suave
    function moverCarrossel(direcao) {

        if (loopWidth <= 0) return;

        const primeiroItem = techItems[0];

        const gap = parseFloat(
            getComputedStyle(techTrack).gap
        ) || 0;

        const passo = primeiroItem.getBoundingClientRect().width + gap;

        // Se estiver próximo do início, prepara o ciclo anterior
        if (direcao < 0 && position < passo) {
            position += loopWidth;
            atualizarPosicao();
        }

        const inicio = position;
        const destino = inicio + (direcao * passo);

        animacaoManual = {
            inicio,
            destino,
            tempo: performance.now()
        };

        pausaAte = Infinity;
    }

    // Botões
    techNext.addEventListener('click', () => {
        moverCarrossel(1);
    });

    techPrev.addEventListener('click', () => {
        moverCarrossel(-1);
    });

    // Loop principal
    function animarCarrossel(timestamp) {

        if (!previousTime) {
            previousTime = timestamp;
        }

        const deltaTime = Math.min(timestamp - previousTime, 50);
        previousTime = timestamp;

        const pausado =
            techContainer.matches(':hover') ||
            document.hidden;

        if (animacaoManual) {

            const progresso = Math.min(
                (timestamp - animacaoManual.tempo) / duracaoTransicao,
                1
            );

            // Curva de suavização
            const suavizacao =
                1 - Math.pow(1 - progresso, 3);

            position =
                animacaoManual.inicio +
                (animacaoManual.destino - animacaoManual.inicio) *
                suavizacao;

            atualizarPosicao();

            if (progresso >= 1) {
                position = normalizarPosicao(position);
                atualizarPosicao();

                animacaoManual = null;
                pausaAte = timestamp + 1200;
            }

        } else if (
            !pausado &&
            timestamp >= pausaAte &&
            loopWidth > 0
        ) {

            position += velocidade * deltaTime / 1000;

            if (position >= loopWidth) {
                position -= loopWidth;
            }

            atualizarPosicao();
        }

        requestAnimationFrame(animarCarrossel);
    }

    requestAnimationFrame(animarCarrossel);
}
