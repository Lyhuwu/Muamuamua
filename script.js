function openLetter(event, element) {
    // 1. Abrir la carta
    element.classList.add('open');
    
    // 2. Confeti (Corazones azules y blancos)
    var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['#42a5f5', '#1565c0', '#82b1ff', '#ffffff'] 
    };
    
    confetti({
        ...defaults,
        particleCount: 50,
        scalar: 1.2,
        shapes: ['heart']
    });
    
    confetti({
        ...defaults,
        particleCount: 30,
        scalar: 0.75,
        shapes: ['heart']
    });
}

function closeLetter(event, btn) {
    event.stopPropagation();
    btn.closest('.envelope-wrapper').classList.remove('open');
}
