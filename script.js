// Variabel global
let isInvitationOpen = false;
let currentSection = 'home';

// Fungsi untuk membuka undangan
function openInvitation() {
    const coverPage = document.getElementById('cover-page');
    const mainInvitation = document.getElementById('main-invitation');
    
    // Animasi fade out cover page
    coverPage.style.transition = 'opacity 1s ease, transform 1s ease';
    coverPage.style.opacity = '0';
    coverPage.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        coverPage.classList.add('hidden');
        mainInvitation.classList.remove('hidden');
        
        // Animasi fade in main invitation
        mainInvitation.style.opacity = '0';
        mainInvitation.style.transform = 'translateY(20px)';
        mainInvitation.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            mainInvitation.style.opacity = '1';
            mainInvitation.style.transform = 'translateY(0)';
            isInvitationOpen = true;
            
            // Mulai musik latar (jika ada)
            playBackgroundMusic();
            
            // Animasi elemen-elemen
            animateElements();
        }, 100);
    }, 1000);
}

// Fungsi untuk scroll ke section tertentu
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Offset untuk navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update active navigation
        updateActiveNavigation(sectionId);
        currentSection = sectionId;
    }
}

// Fungsi untuk update navigasi aktif
function updateActiveNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Fungsi untuk membuka Google Maps
function openMaps() {
    const address = "Jl. Lestari, Karang Sari";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// Fungsi untuk memutar musik latar
function playBackgroundMusic() {
    const audio = document.getElementById('background-music');
    if (audio) {
        audio.volume = 0.3; // Set volume rendah
        audio.play().catch(e => {
            console.log('Autoplay prevented:', e);
            // Tambahkan tombol play manual jika autoplay diblokir
            addMusicControl();
        });
    }
}

// Fungsi untuk menambahkan kontrol musik manual
function addMusicControl() {
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = `
        <button onclick="toggleMusic()" class="music-btn">
            <span id="music-icon">🎵</span>
        </button>
    `;
    musicControl.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1001;
    `;
    
    const musicBtn = musicControl.querySelector('.music-btn');
    musicBtn.style.cssText = `
        background: linear-gradient(135deg, #a8c8ec, #d4b5f7);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(168, 200, 236, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(musicControl);
}

// Fungsi untuk toggle musik
function toggleMusic() {
    const audio = document.getElementById('background-music');
    const icon = document.getElementById('music-icon');
    
    if (audio.paused) {
        audio.play();
        icon.textContent = '🎵';
    } else {
        audio.pause();
        icon.textContent = '🔇';
    }
}

// Fungsi untuk animasi elemen saat scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card, .gallery-item, .location-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Fungsi untuk animasi elemen awal
function animateElements() {
    // Animasi navbar
    const navbar = document.querySelector('.navbar');
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.8s ease';
    
    setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
    }, 500);
    
    // Setup scroll animations
    animateOnScroll();
}

// Fungsi untuk mendeteksi section aktif saat scroll
function handleScroll() {
    if (!isInvitationOpen) return;
    
    const sections = ['home', 'event', 'gallery', 'location'];
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                if (currentSection !== sectionId) {
                    updateActiveNavigation(sectionId);
                    currentSection = sectionId;
                }
            }
        }
    });
}

// Fungsi untuk efek parallax sederhana
function handleParallax() {
    if (!isInvitationOpen) return;
    
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floral-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Fungsi untuk menambahkan efek hover pada kartu
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.event-card, .gallery-item, .location-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
        });
    });
}

// Fungsi untuk menambahkan efek loading
function showLoadingEffect() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Memuat undangan...</p>
        </div>
    `;
    
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(248, 249, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(10px);
    `;
    
    const loadingContent = loadingOverlay.querySelector('.loading-content');
    loadingContent.style.cssText = `
        text-align: center;
        color: #5a6c7d;
    `;
    
    const spinner = loadingOverlay.querySelector('.loading-spinner');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid #e8f2ff;
        border-top: 4px solid #a8c8ec;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    `;
    
    // Tambahkan keyframe untuk spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loadingOverlay);
    
    // Hapus loading setelah 2 detik
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 500);
    }, 2000);
}

// Fungsi untuk menambahkan efek konfetti
function createConfetti() {
    const colors = ['#a8c8ec', '#d4b5f7', '#f4a6cd', '#e8f2ff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            z-index: 1000;
            border-radius: 50%;
            pointer-events: none;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        // Hapus confetti setelah animasi selesai
        setTimeout(() => {
            if (document.body.contains(confetti)) {
                document.body.removeChild(confetti);
            }
        }, 5000);
    }
    
    // Tambahkan keyframe untuk confetti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan efek loading saat halaman dimuat
    showLoadingEffect();
    
    // Setup event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleParallax);
    
    // Tambahkan efek hover pada kartu setelah DOM loaded
    setTimeout(() => {
        addCardHoverEffects();
    }, 100);
    
    // Tambahkan efek konfetti saat tombol "Buka Undangan" diklik
    const openBtn = document.querySelector('.open-invitation-btn');
    if (openBtn) {
        openBtn.addEventListener('click', function() {
            createConfetti();
        });
    }
    
    // Tambahkan smooth scroll untuk semua link internal
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Fungsi untuk menangani resize window
window.addEventListener('resize', function() {
    // Recalculate positions jika diperlukan
    if (isInvitationOpen) {
        handleScroll();
    }
});

// Fungsi untuk mencegah right-click (opsional, untuk proteksi)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Fungsi untuk menambahkan efek typing pada teks
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Fungsi untuk countdown (jika diperlukan)
function startCountdown(targetDate) {
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    countdownElement.style.cssText = `
        text-align: center;
        margin: 2rem 0;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 15px;
        backdrop-filter: blur(10px);
    `;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (distance > 0) {
            countdownElement.innerHTML = `
                <h3 style="color: #5a6c7d; margin-bottom: 1rem;">Menuju Hari Peneguhan Sidi</h3>
                <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #a8c8ec;">${days}</div>
                        <div style="color: #6b7280;">Hari</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #d4b5f7;">${hours}</div>
                        <div style="color: #6b7280;">Jam</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #f4a6cd;">${minutes}</div>
                        <div style="color: #6b7280;">Menit</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 2rem; font-weight: bold; color: #a8c8ec;">${seconds}</div>
                        <div style="color: #6b7280;">Detik</div>
                    </div>
                </div>
            `;
        } else {
            countdownElement.innerHTML = `
                <h3 style="color: #5a6c7d;">Hari Peneguhan Sidi Telah Tiba! 🎉</h3>
            `;
        }
    }
    
    // Update countdown setiap detik
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    return countdownElement;
}

// Export functions untuk penggunaan global
window.openInvitation = openInvitation;
window.scrollToSection = scrollToSection;
window.openMaps = openMaps;
window.toggleMusic = toggleMusic;