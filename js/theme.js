const botaoTema = document.getElementById('theme-toggle');
const iconeTema = document.getElementById('theme-icon');
const logoPrincipal = document.getElementById('logo-principal');
const logoRodape = document.getElementById('logo-rodape');

const temaSalvo = localStorage.getItem('tema') || 'dark';

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);

    if (iconeTema) {
        iconeTema.textContent = tema === 'dark' ? '☀' : '☾';
    }

    if (logoPrincipal) {
        logoPrincipal.src = tema === 'dark'
            ? 'assets/images/logo/logo-horizontal-dark.webp'
            : 'assets/images/logo/logo-horizontal-light.webp';
    }

    if (logoRodape) {
        logoRodape.src = tema === 'dark'
            ? 'assets/images/logo/logo-horizontal-dark.webp'
            : 'assets/images/logo/logo-horizontal-light.webp';
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