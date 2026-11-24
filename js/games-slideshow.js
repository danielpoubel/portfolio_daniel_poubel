document.addEventListener('DOMContentLoaded', () => {

    const slideshow = document.querySelector('.game-slideshow');

    if (!slideshow) return;

    const imagens = slideshow.querySelectorAll('.slideshow-image');

    if (imagens.length <= 1) return;

    let imagemAtual = 0;

    setInterval(() => {

        imagens[imagemAtual].classList.remove('active');

        imagemAtual = (imagemAtual + 1) % imagens.length;

        imagens[imagemAtual].classList.add('active');

    }, 2000);

});