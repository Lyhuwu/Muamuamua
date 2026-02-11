// Variable de control: ¿Ya ganó?
let hasWon = false;

// Elementos
const slider = document.getElementById('loveSlider');

// --- 1. DIFICULTAD (Si suelta, regresa) ---
slider.addEventListener('touchend', slideBack);
slider.addEventListener('mouseup', slideBack);

function slideBack() {
    // Si ya ganó, NO hacemos nada (se queda quieto)
    if (hasWon) return;

    let currentValue = parseInt(slider.value);

    // Si no ha llegado al 99%, retrocede
    if (currentValue < 99) {
        let interval = setInterval(() => {
            // Si ya ganó durante el retroceso (raro pero posible), paramos
            if (hasWon) {
                clearInterval(interval);
                return;
            }

            slider.value = parseInt(slider.value) - 2; // Velocidad de retroceso
            updateKmText(slider.value); // Actualizar texto visual

            if (slider.value <= 0) {
                clearInterval(interval);
            }
        }, 15);
    }
}

// Auxiliar para texto
function updateKmText(val) {
    const kmText = document.getElementById('kmText');
    let maxKm = 3000;
    let currentKm = Math.round(maxKm - (maxKm * (val / 100)));
    
    // Solo mostramos km si no ha ganado
    if (!hasWon) {
        kmText.innerText = currentKm + " km restantes";
    }
}

// --- 2. LÓGICA PRINCIPAL ---
function checkHug() {
    const value = parseInt(slider.value);
    const letter = document.getElementById('hidden-letter');
    const goalMonky = document.getElementById('goalMonky');
    const hugSticker = document.getElementById('hugSticker');
    const kmText = document.getElementById('kmText');
    const body = document.querySelector('body');
    const achievement = document.getElementById('achievement');

    // Si ya ganó, aseguramos que todo se quede como victoria y salimos
    if (hasWon) {
        slider.value = 100; // Forzar al final
        return; 
    }

    updateKmText(value);

    // --- DETECTAR VICTORIA ---
    if (value >= 99) {
        hasWon = true; // ¡CANDADO! Ya no se podrá activar de nuevo
        
        kmText.innerText = "¡Juntas! ❤️";
        
        // A. Ocultar individuales
        goalMonky.classList.add('opacity-0');
        slider.classList.add('hide-thumb');
        
        // B. Mostrar abrazo
        hugSticker.classList.add('show');

        // C. LOGRO XBOX (Solo saldrá esta vez)
        achievement.classList.add('show');
        // Opcional: Que se quite solito a los 5 segundos
        setTimeout(() => {
            achievement.classList.remove('show');
        }, 5000);

        // D. Fondo y efectos
        body.style.backgroundColor = "#ffcdd2"; 

        if (!letter.classList.contains('show')) {
            letter.classList.add('show');
            
            // Confeti
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
            
            // Deshabilitar slider para que no interactúe más
            slider.disabled = true;
        }
    }
}
