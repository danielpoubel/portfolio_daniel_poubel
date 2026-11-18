const botaoTema = document.getElementById('theme-toggle');
const iconeTema = document.getElementById('theme-icon');
const logoPrincipal = document.getElementById('logo-principal');

const temaSalvo = localStorage.getItem('tema') || 'dark';

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);

    iconeTema.textContent = tema === 'dark' ? '☀' : '☾';

    logoPrincipal.src = tema === 'dark'
        ? 'assets/images/logo/logo-horizontal-dark.png'
        : 'assets/images/logo/logo-horizontal-light.png';
}

aplicarTema(temaSalvo);

botaoTema.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    aplicarTema(novoTema);
    localStorage.setItem('tema', novoTema);
});