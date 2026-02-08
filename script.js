function openLetter(event, element) {
    // 1. Abrir la carta visualmente
    element.classList.add('open');

    // 2. ¡Lanzar los confetis de corazón! ✨
    // Usamos la librería 'confetti' que cargamos en el HTML
    confetti({
        particleCount: 150,    // Cantidad de confeti
        spread: 100,           // Qué tanto se expande
        origin: { y: 0.6 },    // Desde dónde sale (un poco más abajo del centro)
        colors: ['#42a5f5', '#1565c0', '#ffffff', '#FFD700'], // Azules, blanco y dorado
        shapes: ['heart'],     // ¡La clave! Forma de corazón
        scalar: 1.2            // Un poquito más grandes los corazones
    });
}

function closeLetter(event, btn) {
    event.stopPropagation();
    const wrapper = btn.closest('.envelope-wrapper');
    wrapper.classList.remove('open');
}
