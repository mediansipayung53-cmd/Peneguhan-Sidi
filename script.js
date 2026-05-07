// Target date
const targetDate = new Date("2026-05-17T08:00:00").getTime();

// Open invitation
function openInvitation() {
    const cover = document.getElementById("cover-page");
    const main = document.getElementById("main-invitation");
    cover.style.transition = "opacity 1s ease";
    cover.style.opacity = "0";
    setTimeout(() => {
        cover.classList.add("hidden");
        main.classList.remove("hidden");
        document.getElementById("navbar").classList.add("visible");
        startAnimations();
    }, 1000);
}

// Start animations
function startAnimations() {
    createParticles();
    createPetals();
    createBokeh();
    startCountdown();
    observeElements();
}

// Particles
function createParticles() {
    const container = document.getElementById("coverParticles");
    if(!container) return;
    for(let i=0; i<30; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random()*100 + "%";
        p.style.width = p.style.height = (Math.random()*4+2) + "px";
        p.style.background = ["#a8c8ec","#d4b5f7","#f4a6cd"][Math.floor(Math.random()*3)];
        p.style.animationDuration = (Math.random()*5+8) + "s";
        p.style.animationDelay = Math.random()*5 + "s";
        container.appendChild(p);
    }
}

// Petals
function createPetals() {
    const container = document.getElementById("petalsContainer");
    if(!container) return;
    setInterval(() => {
        const p = document.createElement("div");
        p.className = "petal";
        p.textContent = ["🌸","🌺","🌼","🌻","🌷"][Math.floor(Math.random()*5)];
        p.style.left = Math.random()*100 + "%";
        p.style.animationDuration = (Math.random()*5+10) + "s";
        container.appendChild(p);
        setTimeout(() => p.remove(), 15000);
    }, 3000);
}

// Bokeh particles
function createBokeh() {
    const container = document.getElementById("bokehContainer");
    if(!container) return;
    const colors = [
        "rgba(168,200,236,0.4)",
        "rgba(212,181,247,0.4)",
        "rgba(244,166,205,0.4)",
        "rgba(255,255,255,0.5)"
    ];
    setInterval(() => {
        const b = document.createElement("div");
        b.className = "bokeh";
        const size = Math.random()*60 + 20;
        b.style.width = size + "px";
        b.style.height = size + "px";
        b.style.left = Math.random()*100 + "%";
        b.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random()*colors.length)]} 0%, transparent 70%)`;
        b.style.animationDuration = (Math.random()*8+12) + "s";
        b.style.filter = `blur(${Math.random()*10+5}px)`;
        container.appendChild(b);
        setTimeout(() => b.remove(), 20000);
    }, 800);
}

// Countdown
function startCountdown() {
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if(distance < 0) {
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }
        const days = Math.floor(distance / (1000*60*60*24));
        const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
        const seconds = Math.floor((distance % (1000*60)) / 1000);
        document.getElementById("days").textContent = String(days).padStart(2,"0");
        document.getElementById("hours").textContent = String(hours).padStart(2,"0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
    }, 1000);
}

// Music
let isPlaying = false;
function toggleMusic() {
    const wave = document.getElementById("musicWave");
    const icon = document.getElementById("musicIcon");
    isPlaying = !isPlaying;
    if(isPlaying) {
        wave.classList.remove("paused");
        icon.className = "fas fa-music";
    } else {
        wave.classList.add("paused");
        icon.className = "fas fa-pause";
    }
}

// Scroll to section
function scrollToSection(id) {
    const el = document.getElementById(id);
    if(el) {
        const offset = 80;
        const top = el.offsetTop - offset;
        window.scrollTo({top, behavior: "smooth"});
        updateActiveNav(id);
    }
}

// Update active nav
function updateActiveNav(id) {
    document.querySelectorAll(".navbar a").forEach(a => {
        a.classList.remove("active");
        if(a.getAttribute("href") === "#"+id) a.classList.add("active");
    });
}

// Toggle nav
function toggleNav() {
    document.querySelector(".navbar ul").classList.toggle("open");
}

// Observe elements
function observeElements() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, {threshold: 0.1});
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => observer.observe(el));
}

// Lightbox
let currentImg = 0;
function openLightbox(index) {
    currentImg = index;
    const lb = document.getElementById("lightbox");
    lb.classList.add("active");
}
function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}

// Maps
function openMaps() {
    window.open("https://www.google.com/maps/search/?api=1&query=Jl.+Lestari+Karang+Sari", "_blank");
}

// RSVP
function submitRSVP(e) {
    e.preventDefault();
    const name = document.getElementById("guestName").value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const message = document.getElementById("guestMessage").value;
    
    const list = document.getElementById("messagesList");
    const item = document.createElement("div");
    item.className = "message-item";
    item.innerHTML = `
        <div class="message-avatar">${name.charAt(0).toUpperCase()}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-name">${name}</span>
                <span class="message-badge ${attendance}">${attendance === "hadir" ? "Hadir" : "Tidak Hadir"}</span>
            </div>
            <p>${message}</p>
        </div>
    `;
    list.insertBefore(item, list.firstChild);
    
    document.getElementById("rsvpForm").reset();
    showToast("Terima kasih! Ucapan Anda telah terkirim 💝");
}

// Toast
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// Scroll detection
window.addEventListener("scroll", () => {
    const sections = ["home","event","countdown","gallery","location","rsvp"];
    const scrollPos = window.scrollY + 150;
    sections.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            if(scrollPos >= top && scrollPos < bottom) updateActiveNav(id);
        }
    });
});
