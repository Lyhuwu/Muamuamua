function checkHug() {
    const slider = document.getElementById('loveSlider');
    const value = slider.value;
    const letter = document.getElementById('hidden-letter');
    const goal = document.querySelector('.goal');
    const kmText = document.getElementById('kmText');
    const body = document.querySelector('body');

    // 1. Calcular Kilómetros restantes (Efecto visual)
    // Suponemos 3000km de distancia máxima (puedes cambiar este número)
    let maxKm = 3000; 
    let currentKm = Math.round(maxKm - (maxKm * (value / 100)));
    
    if (currentKm <= 0) {
        kmText.innerText = "¡Juntas! ❤️";
    } else {
        kmText.innerText = currentKm + " km restantes";
    }

    // 2. Si las Monkys están cerca (más del 98%)
    if (value > 98) {
        
        // Animación de abrazo: La Monky meta se inclina hacia la viajera
        goal.style.transform = "scale(1.3) rotate(-10deg) translateX(-10px)";
        
        // Cambiar color de fondo a celebración
        body.style.backgroundColor = "#ffcdd2"; // Un rosa más intenso

        if (!letter.classList.contains('show')) {
            letter.classList.add('show');
            
            // ¡CONFETI DOBLE! (Lluvia de corazones)
            var defaults = {
                spread: 360,
                ticks: 50,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
                colors: ['#d81b60', '#f06292', '#ffffff']
            };

            confetti({
                ...defaults,
                particleCount: 100,
                scalar: 1.2,
                shapes: ['heart']
            });

            // Bloquear slider para que se queden abrazadas
            slider.disabled = true;
        }
    }
}
