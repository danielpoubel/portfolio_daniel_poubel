const storyCards = document.querySelectorAll(".story-card");
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

function fecharCards() {
    storyCards.forEach((card) => {
        card.classList.remove("expanded");
        card.setAttribute("aria-expanded", "false");
    });
}

function abrirCard(card) {
    fecharCards();

    card.classList.add("expanded");
    card.setAttribute("aria-expanded", "true");
}

storyCards.forEach((card) => {
    card.setAttribute("aria-expanded", "false");

    if (isTouchDevice) {
        // Tablet e celular: abrir e fechar com toque
        card.addEventListener("click", () => {
            const jaAberto = card.classList.contains("expanded");

            if (jaAberto) {
                fecharCards();
            } else {
                abrirCard(card);
            }
        });

        return;
    }

    // Computador: abrir ao passar o mouse
    card.addEventListener("mouseenter", () => {
        abrirCard(card);
    });

    card.addEventListener("mouseleave", () => {
        fecharCards();
    });
});

// Fechar com a tecla ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        fecharCards();
    }
});