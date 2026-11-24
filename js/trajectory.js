const storyCards = document.querySelectorAll(".story-card");

const isTouchDevice = window.matchMedia("(hover: none)").matches;

function fecharCards() {
    document.querySelectorAll(".story-overlay").forEach((overlay) => {
        overlay.remove();
    });

    storyCards.forEach((card) => {
        card.classList.remove("is-trigger-active", "expanded");
        card.setAttribute("aria-expanded", "false");
    });
}

function abrirCard(card) {
    fecharCards();

    const overlay = card.cloneNode(true);

    overlay.classList.add("story-overlay", "expanded");
    overlay.setAttribute("aria-hidden", "true");
    overlay.removeAttribute("aria-expanded");

    card.classList.add("is-trigger-active", "expanded");
    card.setAttribute("aria-expanded", "true");

    document.body.appendChild(overlay);
}

storyCards.forEach((card) => {
    if (isTouchDevice) {
        card.addEventListener("click", () => {
            const jaAberto = card.classList.contains("expanded");

            fecharCards();

            if (!jaAberto) {
                abrirCard(card);
            }
        });

        return;
    }

    card.addEventListener("mouseenter", () => {
        abrirCard(card);
    });

    card.addEventListener("mouseleave", () => {
        fecharCards();
    });
});