
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Abrir e fechar o menu
menuToggle.addEventListener('click', () => {
    const menuAberto = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', menuAberto);
    console.log('Menu aberto:', menuAberto);
    console.log('Classes do menu:', navMenu.className);

    menuToggle.setAttribute('aria-expanded', menuAberto);

    menuToggle.setAttribute(
        'aria-label',
        menuAberto ? 'Fechar menu' : 'Abrir menu'
    );
});

// Fechar o menu ao clicar em um link
const navLinks = navMenu.querySelectorAll('a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    const clicouNoMenu = navMenu.contains(event.target);
    const clicouNoBotao = menuToggle.contains(event.target);

    if (!clicouNoMenu && !clicouNoBotao) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active')

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    }
});

// Fechar o menu ao pressionar ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
    }
});

// Botão voltar ao topo
const voltarTopo = document.getElementById('voltar-topo');

window.addEventListener('scroll', () => {
    voltarTopo.classList.toggle('visivel', window.scrollY > 300);
});

voltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});