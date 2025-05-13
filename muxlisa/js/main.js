// Rasmlarni yuklash va modal oynalar uchun funksiyalar
document.addEventListener('DOMContentLoaded', () => {
    // Asosiy elementlarni topish
    const buttons = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.modal');
    const projectItems = document.querySelectorAll('.project-item');
    const projectModals = document.querySelectorAll('.project-modal');
    const articleButtons = document.querySelectorAll('.read-more-btn');
    const articleModals = document.querySelectorAll('.article-modal');

    // Modal oynani ochish funksiyasi
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Modal oynani yopish funksiyasi
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Asosiy tugmalarga bosilganda (Ta'lim, Tajriba va boshqalar)
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Loyiha elementlariga bosilganda
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            const modal = document.getElementById(`project-${projectId}`);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Maqola tugmalariga bosilganda
    articleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const articleItem = button.closest('.article-item');
            if (articleItem) {
                const articleId = articleItem.getAttribute('data-article');
                const modal = document.getElementById(`article-${articleId}`);
                if (modal) {
                    openModal(modal);
                }
            }
        });
    });

    // Barcha yopish tugmalariga bosilganda
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal, .project-modal, .article-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Modal oyna tashqarisiga bosilganda
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal') || 
            event.target.classList.contains('project-modal') || 
            event.target.classList.contains('article-modal')) {
            closeModal(event.target);
        }
    });

    // Escape tugmasiga bosilganda
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"], .project-modal[style*="display: block"], .article-modal[style*="display: block"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    // Rasmlarni kattalashtirish funksiyasi
    const zoomableImages = document.querySelectorAll('.zoomable');
    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            const zoomModal = document.createElement('div');
            zoomModal.className = 'zoom-modal';
            zoomModal.style.display = 'flex';
            zoomModal.innerHTML = `
                <span class="zoom-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            `;
            document.body.appendChild(zoomModal);
            document.body.style.overflow = 'hidden';

            // Yopish tugmasiga bosilganda
            const closeBtn = zoomModal.querySelector('.zoom-close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(zoomModal);
                document.body.style.overflow = '';
            });

            // Modal tashqarisiga bosilganda
            zoomModal.addEventListener('click', (e) => {
                if (e.target === zoomModal) {
                    document.body.removeChild(zoomModal);
                    document.body.style.overflow = '';
                }
            });
        });
    });

    // Rasmlarni oldindan yuklash
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src) {
                const newImg = new Image();
                newImg.src = img.src;
            }
        });
    }

    // Rasmlarni yuklash
    preloadImages();
});

// Rasmlarni sekin yuklash
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Aloqa formasi va Telegram integratsiyasi
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Forma ma'lumotlarini olish
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Forma tekshiruvi
        if (!name || !email || !message) {
            alert('Iltimos, barcha maydonlarni to\'ldiring');
            return;
        }

        // Email tekshiruvi
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Iltimos, to\'g\'ri email manzilini kiriting');
            return;
        }

        // Telegram bot sozlamalari
        const botToken = '7792458104:AAGI61NITytJ7GaGG6n2p9_q13t2IsC2R6s';
        const chatId = '7228090381';
        
        // Telegram uchun xabar formati
        const telegramMessage = `Yangi aloqa xabari:
👤 Ism: ${name}
📧 Email: ${email}
📝 Xabar: ${message}`;

        try {
            // Yuborish tugmasini o'chirish
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Yuborilmoqda...';

            // Telegramga xabar yuborish
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                // Formani tozalash
                contactForm.reset();
                
                // Muvaffaqiyat xabari
                alert('Xabaringiz muvaffaqiyatli yuborildi!');
            } else {
                throw new Error('Xabar yuborishda xatolik yuz berdi');
            }
        } catch (error) {
            console.error('Xatolik:', error);
            alert('Xabar yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
        } finally {
            // Yuborish tugmasini qayta yoqish
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Yuborish';
        }
    });
}

// Rasmlar bilan ishlash
document.addEventListener('DOMContentLoaded', () => {
    // Rasmni optimallashtirish
    const optimizeImage = (img) => {
        // Rasm turini aniqlash
        const isHero = img.closest('.hero-image') !== null;
        const isGallery = img.closest('.gallery-item') !== null;
        const isThumbnail = !isHero && !isGallery;

        // O'lchamlarni belgilash
        let maxWidth = isHero ? 1200 : (isGallery ? 800 : 400);
        let maxHeight = isHero ? 800 : (isGallery ? 600 : 300);

        // Optimallashtirishga zarurat borligini tekshirish
        if (img.naturalWidth > maxWidth || img.naturalHeight > maxHeight) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Yangi o'lchamlarni hisoblash
            let width = img.naturalWidth;
            let height = img.naturalHeight;
            
            if (width > maxWidth) {
                height = Math.floor(height * (maxWidth / width));
                width = maxWidth;
            }
            
            if (height > maxHeight) {
                width = Math.floor(width * (maxHeight / height));
                height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            
            return canvas.toDataURL('image/jpeg', 0.85);
        }
        return null;
    };

    // Rasm xatoliklarini boshqarish
    const handleImageError = (img) => {
        console.error('Rasm yuklanishida xatolik:', img.src);
        img.src = 'images/placeholder.jpg';
        img.alt = 'Rasm yuklanmadi';
    };

    // Barcha rasmlarni qayta ishlash
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
        
        img.addEventListener('error', () => handleImageError(img));
        
        img.addEventListener('load', () => {
            const optimizedSrc = optimizeImage(img);
            if (optimizedSrc) {
                img.src = optimizedSrc;
            }
        });
    });
});

// Loyihalar funksionalligi
document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const projectModals = document.querySelectorAll('.project-modal');
    const projectCloseButtons = document.querySelectorAll('.project-modal .close');

    // Loyiha modalni ochish
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            const modal = document.getElementById(`project-${projectId}`);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Loyiha modalni yopish
    projectCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.project-modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Modal tashqarisiga bosilganda yopish
    projectModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Escape tugmasi bilan yopish
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            projectModals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // Yuklab olish tugmasiga bosilganda
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Loyiha fayllari tez orada yuklab olish uchun tayyor bo'ladi!");
        });
    });
}); 