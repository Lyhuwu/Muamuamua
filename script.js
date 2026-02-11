function checkHug() {
    const slider = document.getElementById('loveSlider');
    const value = slider.value;
    const letter = document.getElementById('hidden-letter');
    
    // Elementos para el cambio de stickers
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

    // 2. DETECTAR EL ENCUENTRO
    if (value > 98) {
        
        // A. Ocultar los individuales
        goalMonky.classList.add('opacity-0');       
        slider.classList.add('hide-thumb');         
        
        // B. Mostrar el abrazo gigante
        hugSticker.classList.add('show');

        // C. Cambiar fondo
        body.style.backgroundColor = "#ffcdd2"; 

        // D. Mostrar carta y confeti
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

            // Bloquear slider para que se queden abrazadas
            slider.disabled = true;
        }
    }
}
