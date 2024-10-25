// Evento cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Configuración del canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed'; // Fija el canvas al viewport
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1'; // Coloca el canvas detrás del contenido
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Función para ajustar el tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Inicializar tamaño y agregar evento resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clase mejorada para las partículas
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2; // Partículas más pequeñas
            this.baseSize = this.size; // Tamaño base para animación
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = this.getRandomNeonColor();
        }

        // Genera colores neón aleatorios
        getRandomNeonColor() {
            const neonColors = [
                'rgba(0, 255, 255, 0.8)',  // Cian
                'rgba(255, 0, 255, 0.8)',  // Magenta
                'rgba(0, 255, 0, 0.8)',    // Verde neón
            ];
            return neonColors[Math.floor(Math.random() * neonColors.length)];
        }

        update() {
            // Actualización de posición
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebote en los bordes
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Efecto de "respiración" para las partículas
            this.size = this.baseSize + Math.sin(Date.now() * 0.005) * 0.5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Efecto de brillo
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    let particles = [];

    // Inicialización de partículas
    function init() {
        particles = [];
        const numberOfParticles = Math.min(150, (canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
    }

    // Función de animación mejorada
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Actualizar y dibujar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Dibujar líneas entre partículas cercanas
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    // Interacción mejorada con el mouse
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimer;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(() => {
            isMouseMoving = false;
        }, 100);

        particles.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.speedX += (dx / distance) * force * 0.5;
                particle.speedY += (dy / distance) * force * 0.5;
            }
        });
    });

    // Iniciar la animación
    init();
    animate();
});