document.addEventListener('DOMContentLoaded', () => {

    const slideshow = document.querySelector('.game-slideshow');

    if (!slideshow) return;

    const imagens = slideshow.querySelectorAll('.slideshow-image');

    if (imagens.length <= 1) return;

    let imagemAtual = 0;

    function carregarImagem(imagem) {

        if (imagem.complete && imagem.naturalWidth > 0) {
            return Promise.resolve(true);
        }

        const caminho = imagem.dataset.src;

        if (!caminho) return Promise.resolve(false);

        return new Promise(resolve => {

            imagem.onload = () => resolve(true);
            imagem.onerror = () => resolve(false);

            imagem.src = caminho;
            delete imagem.dataset.src;

        });
    }

    async function avancarImagem() {

        const proxima = (imagemAtual + 1) % imagens.length;

        const carregada = await Promise.all([
            carregarImagem(imagens[proxima]),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]);

        if (carregada[0]) {

            imagens[imagemAtual].classList.remove('active');
            imagens[proxima].classList.add('active');

        }

        imagemAtual = proxima;

        avancarImagem();
    }

    avancarImagem();

});