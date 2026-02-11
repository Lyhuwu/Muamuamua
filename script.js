// Variable de control
let hasWon = false;

const slider = document.getElementById('loveSlider');

// --- 1. DIFICULTAD (Si suelta, regresa) ---
slider.addEventListener('touchend', slideBack);
slider.addEventListener('mouseup', slideBack);

function slideBack() {
    // Si ya ganó, no se regresa
    if (hasWon) return;

    let currentValue = parseInt(slider.value);

    // Si suelta antes de llegar al 99%
    if (currentValue < 99) {
        let interval = setInterval(() => {
            // Si por alguna razón gana mientras retrocede (raro), paramos
            if (hasWon) {
                clearInterval(interval);
                return;
            }
            
            // Retrocede
            slider.value = parseInt(slider.value) - 2; 
            updateKmText(slider.value);

            // Si llega al inicio, paramos
            if (slider.value <= 0) {
                clearInterval(interval);
            }
        }, 15); // Velocidad del retroceso
    }
}

function updateKmText(val) {
    const kmText = document.getElementById('kmText');
    let maxKm = 3000;
    let currentKm = Math.round(maxKm - (maxKm * (val / 100)));
    
    if (!hasWon) {
        kmText.innerText = currentKm + " km restantes";
    }
}

// --- 2. LÓGICA PRINCIPAL ---
function checkHug() {
    // Si ya ganó, no hacemos nada más que forzar el final
    if (hasWon) {
        slider.value = 100;
        return; 
    }

    const value = parseInt(slider.value);
    const letter = document.getElementById('hidden-letter');
    const goalMonky = document.getElementById('goalMonky');
    const hugSticker = document.getElementById('hugSticker');
    const kmText = document.getElementById('kmText');
    const body = document.querySelector('body');
    const achievement = document.getElementById('achievement');

    updateKmText(value);

    // --- DETECTAR VICTORIA ---
    if (value >= 99) {
        hasWon = true; // ¡Bloqueamos para que solo pase una vez!
        
        kmText.innerText = "¡Juntas! ❤️";
        
        // Cambio de Monkys
        goalMonky.classList.add('opacity-0');
        slider.classList.add('hide-thumb');
        hugSticker.classList.add('show');
        
        // Muestra el logro (SOLO UNA VEZ GRACIAS A hasWon)
        achievement.classList.add('show');
        setTimeout(() => {
            achievement.classList.remove('show');
        }, 5000);

        body.style.backgroundColor = "#ffcdd2"; 

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
            
            // Deshabilitar slider
            slider.disabled = true;
        }
    }
}
