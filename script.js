// Set dynamic copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Nav Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Typing Effect
const typingSpan = document.getElementById('typing');
const words = ['Full-Stack Developer', 'UI/UX Architect', 'Web Engineer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
type();

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Stats Counters Animation
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100 && !hasCounted) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / 40; 
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        hasCounted = true;
    }
});

// Back to Top Button
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topBtn.style.display = 'flex';
    } else {
        topBtn.style.display = 'none';
    }
});
topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Canvas Particle Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
init();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Interactive Form Feedback & Web3Forms Integration
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMsg = document.getElementById('formMessage');
    const submitBtn = this.querySelector('button[type="submit"]');
    
    formMsg.style.color = 'var(--accent-cyan)';
    formMsg.textContent = '⚡ Transmitting data to server...';
    submitBtn.style.opacity = '0.5';
    submitBtn.disabled = true;

    const formData = new FormData(this);
    
    // Web3Forms Access Key Yahan Par Dalein
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            formMsg.style.color = '#25d366';
            formMsg.textContent = '✔ Signal Received! Details sent to your Gmail.';
            this.reset();
        } else {
            formMsg.style.color = 'var(--accent-pink)';
            formMsg.textContent = '❌ Error: ' + json.message;
        }
    })
    .catch(error => {
        formMsg.style.color = 'var(--accent-pink)';
        formMsg.textContent = '❌ Transmission failed. Please try again.';
    })
    .finally(() => {
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        setTimeout(() => {
            formMsg.textContent = '';
        }, 5000);
    });
});