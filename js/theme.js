const botaoTema = document.getElementById('theme-toggle');
const iconeTema = document.getElementById('theme-icon');
const logoPrincipal = document.getElementById('logo-principal');
const logoRodape = document.getElementById('logo-rodape');

// Localiza a pasta de imagens a partir do próprio arquivo JS
const caminhoLogos = new URL('../assets/images/logo/', document.currentScript.src);

const temaSalvo = localStorage.getItem('tema') || 'dark';

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);

    if (iconeTema) {
        iconeTema.textContent = tema === 'dark' ? '☀' : '☾';
    }

    const arquivoLogo = tema === 'dark'
        ? 'logo-horizontal-dark.webp'
        : 'logo-horizontal-light.webp';

    const caminhoLogo = new URL(arquivoLogo, caminhoLogos).href;

    if (logoPrincipal) {
        logoPrincipal.src = caminhoLogo;
    }

    if (logoRodape) {
        logoRodape.src = caminhoLogo;
    }
}

aplicarTema(temaSalvo);

if (botaoTema) {
    botaoTema.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

        aplicarTema(novoTema);
        localStorage.setItem('tema', novoTema);
    });
}