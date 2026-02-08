function openLetter(event, element) {
    // 1. Efecto visual de abrir
    element.classList.add('open');
    
    // 2. Efecto de partículas (Sparkles de corazón)
    var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['#42a5f5', '#1565c0', '#82b1ff', '#ffffff'] // Azules y blanco
    };
    
    // Lanzar corazones normales
    confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['heart']
    });
    
    // Lanzar corazones pequeños (brillitos)
    confetti({
        ...defaults,
        particleCount: 20,
        scalar: 0.75,
        shapes: ['heart']
    });
}

function closeLetter(event, btn) {
    event.stopPropagation();
    // Cierra la carta buscando el contenedor padre
    btn.closest('.envelope-wrapper').classList.remove('open');
}
