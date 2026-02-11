// Variable para controlar si ya ganó
let hasWon = false;

// --- LÓGICA DE DIFICULTAD (Retroceso) ---
const slider = document.getElementById('loveSlider');

// Escuchar cuando suelta el dedo o el mouse
slider.addEventListener('touchend', slideBack);
slider.addEventListener('mouseup', slideBack);

function slideBack() {
    // Si ya ganó, no hacemos nada
    if (hasWon) return;

    let currentValue = parseInt(slider.value);

    // Si no ha llegado al final (menos de 99), regresamos
    if (currentValue < 99) {
        let interval = setInterval(() => {
            // Bajamos el valor
            slider.value = parseInt(slider.value) - 2; // Velocidad de retroceso
            
            // Actualizamos el texto de KM visualmente mientras baja
            updateKmText(slider.value);

            // Si llega a 0, paramos
            if (slider.value <= 0) {
                clearInterval(interval);
            }
        }, 20); // Cada 20ms se mueve un poquito
    }
}

// Función auxiliar para actualizar texto (para usar en el retroceso)
function updateKmText(val) {
    const kmText = document.getElementById('kmText');
    let maxKm = 3000;
    let currentKm = Math.round(maxKm - (maxKm * (val / 100)));
    if (currentKm > 0) {
        kmText.innerText = currentKm + " km restantes";
    }
}


// --- LÓGICA PRINCIPAL ---
function checkHug() {
    // Si ya ganó, ignoramos movimientos
    if (hasWon) return;

    const value = slider.value;
    const letter = document.getElementById('hidden-letter');
    const goalMonky = document.getElementById('goalMonky');
    const hugSticker = document.getElementById('hugSticker');
    const kmText = document.getElementById('kmText');
    const body = document.querySelector('body');
    const achievement = document.getElementById('achievement');

    // 1. Calcular Kilómetros
    updateKmText(value);

    // 2. DETECTAR VICTORIA
    if (value > 98) {
        hasWon = true; // Marcamos que ya ganó para que no retroceda
        kmText.innerText = "¡Juntas! ❤️";
        
        // A. Ocultar individuales
        goalMonky.classList.add('opacity-0');
        slider.classList.add('hide-thumb');
        
        // B. Mostrar abrazo
        hugSticker.classList.add('show');

        // C. MOSTRAR LOGRO XBOX (Baja de arriba)
        achievement.classList.add('show');

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

            // Bloquear slider completamente
            slider.disabled = true;
        }
    }
}
