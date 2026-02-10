function checkHug() {
    const slider = document.getElementById('loveSlider');
    const value = slider.value;
    const letter = document.getElementById('hidden-letter');
    
    // Elementos nuevos
    const goalMonky = document.getElementById('goalMonky');
    const hugSticker = document.getElementById('hugSticker');
    const kmText = document.getElementById('kmText');
    const body = document.querySelector('body');

    // 1. Calcular Kilómetros
    let maxKm = 3000; 
    let currentKm = Math.round(maxKm - (maxKm * (value / 100)));
    
    if (currentKm <= 0) {
        kmText.innerText = "¡Juntas! ❤️";
    } else {
        kmText.innerText = currentKm + " km restantes";
    }

    // 2. DETECTAR EL ENCUENTRO (Final del slider)
    if (value > 98) {
        
        // --- AQUÍ OCURRE LA MAGIA DEL CAMBIO ---
        
        // A. Ocultar los individuales
        goalMonky.classList.add('opacity-0');       // Oculta meta
        slider.classList.add('hide-thumb');         // Oculta viajera
        
        // B. Mostrar el abrazo
        hugSticker.classList.add('show');

        // C. Cambiar fondo
        body.style.backgroundColor = "#ffcdd2"; 

        // D. Mostrar carta y confeti (si no ha salido ya)
        if (!letter.classList.contains('show')) {
            letter.classList.add('show');
            
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

            // Bloquear slider
            slider.disabled = true;
        }
    }
}
