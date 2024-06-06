document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('neural-network');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = document.querySelector('.hero-section').clientWidth;
        canvas.height = document.querySelector('.hero-section').clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const neurons = [];
    const numNeurons = 50; // Number of neurons
    const connectionThreshold = 200; // Maximum distance to draw a connection

    class Neuron {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 5;
            this.dx = (Math.random() - 0.5) * 2;
            this.dy = (Math.random() - 0.5) * 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = '#e74c3c'; // Bright Red
            ctx.fill();
            ctx.closePath();
        }

        update() {
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    function init() {
        for (let i = 0; i < numNeurons; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            neurons.push(new Neuron(x, y));
        }
    }

    function connectNeurons() {
        for (let i = 0; i < neurons.length; i++) {
            for (let j = i + 1; j < neurons.length; j++) {
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionThreshold) {
                    ctx.beginPath();
                    ctx.moveTo(neurons[i].x, neurons[i].y);
                    ctx.lineTo(neurons[j].x, neurons[j].y);
                    ctx.strokeStyle = `rgba(236, 240, 241, ${1 - distance / connectionThreshold})`; // Light Gray with transparency
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        neurons.forEach(neuron => neuron.update());
        connectNeurons();
    }

    init();
    animate();
});


document.addEventListener("DOMContentLoaded", function() {
    const menuOpen = document.getElementById("menu-open");
    const menuClose = document.getElementById("menu-close");
    const navUl = document.querySelector("nav ul");

    menuOpen.addEventListener("click", function() {
        navUl.classList.toggle("show");
        menuOpen.style.display = "none";
        menuClose.style.display = "block";
    });

    menuClose.addEventListener("click", function() {
        navUl.classList.toggle("show");
        menuOpen.style.display = "block";
        menuClose.style.display = "none";
    });

    navUl.addEventListener("click", function(e) {
        if (e.target.tagName === "A") {
            navUl.classList.remove("show");
            menuOpen.style.display = "block";
            menuClose.style.display = "none";
        }
    });
});
