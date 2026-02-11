// Variable de control: ¿Ya ganó?
let hasWon = false;

// Elementos
const slider = document.getElementById('loveSlider');

// --- 1. DIFICULTAD (Si suelta, regresa) ---
// Escuchamos tanto toque de celular como mouse de PC
slider.addEventListener('touchend', slideBack);
slider.addEventListener('mouseup', slideBack);

function slideBack() {
    // Si ya ganó, no hacemos nada
    if (hasWon) return;

    let currentValue = parseInt(slider.value);

    // Si suelta antes del 99%, retrocede
    if (currentValue < 99) {
        let interval = setInterval(() => {
            // Si gana durante el proceso, paramos
            if (hasWon) {
                clearInterval(interval);
                return;
            }

            // Velocidad de retroceso
            slider.value = parseInt(slider.value) - 2; 
            updateKmText(slider.value);

            // Si llega al inicio, paramos
            if (slider.value <= 0) {
                clearInterval(interval);
            }
        }, 15);
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
    // Si ya ganó, forzamos el slider al final y no hacemos nada más
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

    // --- DETECTAR VICTORIA (Al llegar al 99%) ---
    if (value >= 99) {
        hasWon = true; // ¡CANDADO ACTIVADO!
        
        kmText.innerText = "¡Juntas! ❤️";
        
        // A. Ocultar individuales
        goalMonky.classList.add('opacity-0');
        slider.classList.add('hide-thumb');
        
        // B. Mostrar abrazo
        hugSticker.classList.add('show');

        // C. LOGRO XBOX (Aparece sin bordes)
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
            
            // Deshabilitar el slider
            slider.disabled = true;
        }
    }
}
