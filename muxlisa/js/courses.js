document.addEventListener('DOMContentLoaded', () => {
    // Modal elementlarini topish
    const modal = document.getElementById('enrollModal');
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const closeButton = document.querySelector('.close');
    const enrollForm = document.getElementById('enrollForm');
    const courseSelect = document.getElementById('course');

    // Kursga yozilish tugmasiga bosilganda
    enrollButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseName = button.getAttribute('data-course');
            courseSelect.value = courseName;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Modal oynani yopish
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Modal tashqarisiga bosilganda
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Escape tugmasiga bosilganda
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Telefon raqami formatini tekshirish
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 12) {
            value = value.slice(0, 12);
        }
        if (value.length > 0) {
            if (value.length <= 3) {
                value = '+' + value;
            } else if (value.length <= 5) {
                value = '+' + value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 8) {
                value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5);
            } else if (value.length <= 10) {
                value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 8) + ' ' + value.slice(8);
            } else {
                value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 8) + ' ' + value.slice(8, 10) + ' ' + value.slice(10);
            }
        }
        e.target.value = value;
    });

    // Formani yuborish
    enrollForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Forma ma'lumotlarini olish
        const name = document.getElementById('name').value.trim();
        const phone = phoneInput.value.trim();
        const course = courseSelect.value;

        // Telegram bot sozlamalari
        const botToken = '7792458104:AAGI61NITytJ7GaGG6n2p9_q13t2IsC2R6s';
        const chatId = '7228090381';
        
        // Telegram uchun xabar formati
        const telegramMessage = `📩 Yangi kursga yozilish so'rovi!
👤 Ism: ${name}
📱 Telefon: ${phone}
📘 Kurs: ${course}`;

        try {
            // Yuborish tugmasini o'chirish
            const submitBtn = enrollForm.querySelector('.submit-btn');
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
                enrollForm.reset();
                
                // Modal oynani yopish
                modal.style.display = 'none';
                document.body.style.overflow = '';
                
                // Muvaffaqiyat xabari
                alert('Rahmat! So\'rovingiz qabul qilindi. Tez orada siz bilan bog\'lanamiz!');
            } else {
                throw new Error('Xabar yuborishda xatolik yuz berdi');
            }
        } catch (error) {
            console.error('Xatolik:', error);
            alert('Xabar yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
        } finally {
            // Yuborish tugmasini qayta yoqish
            const submitBtn = enrollForm.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Yuborish';
        }
    });
}); 