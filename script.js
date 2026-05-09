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
        // Autoplay musik saat undangan dibuka
        startMusic();
    }, 1000);
}

// Start animations
function startAnimations() {
    createParticles();
    createFireflies();
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

// Fireflies (Kunang-kunang)
function createFireflies() {
    const container = document.getElementById("firefliesContainer");
    if(!container) return;
    setInterval(() => {
        const f = document.createElement("div");
        f.className = "firefly";
        f.style.left = Math.random()*100 + "%";
        f.style.top = (Math.random()*50 + 50) + "%"; // Start from bottom half
        const duration = Math.random()*8 + 12; // 12-20 seconds
        f.style.animationDuration = duration + "s";
        f.style.animationDelay = Math.random()*2 + "s";
        container.appendChild(f);
        setTimeout(() => f.remove(), (duration + 2) * 1000);
    }, 1500);
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

function getAudio() {
    return document.getElementById("bgMusic");
}

function startMusic() {
    const audio = getAudio();
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            updateMusicUI();
        }).catch(() => {
            // Autoplay diblokir browser — biarkan user klik manual
            isPlaying = false;
            updateMusicUI();
        });
    }
}

function toggleMusic() {
    const audio = getAudio();
    if (!audio) return;
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
    updateMusicUI();
}

function updateMusicUI() {
    const wave = document.getElementById("musicWave");
    const icon = document.getElementById("musicIcon");
    if (isPlaying) {
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

// Observe elements - dengan animasi saat scroll naik dan turun
function observeElements() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Element masuk viewport - tampilkan
                entry.target.classList.add("visible");
            } else {
                // Element keluar viewport - sembunyikan lagi untuk animasi ulang
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.15, // Trigger saat 15% element terlihat
        rootMargin: "-50px" // Offset untuk trigger lebih smooth
    });
    
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
    
    // --- INTEGRASI WHATSAPP ---
    // Ganti nomor di bawah jika ingin dikirim ke nomor lain (gunakan format 62...)
    const myPhoneNumber = "6285286084353"; 
    const statusHadir = attendance === "hadir" ? "HADIR" : "TIDAK HADIR";
    
    const waMessage = `Happy confirmation day yaa ecca!`;
    
    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;
    
    document.getElementById("rsvpForm").reset();
    showToast("Terima kasih! Membuka WhatsApp... 💝");

    // Buka WhatsApp di tab baru setelah 1.5 detik agar user sempat baca toast
    setTimeout(() => {
        window.open(waUrl, "_blank");
    }, 1500);
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
    const sections = ["home","event","countdown","location","rsvp"];
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
