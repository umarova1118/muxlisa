// Maqolalar ma'lumotlari
const articles = {
    'retopology': {
        title: 'Retopologiya vositalari',
        content: `
            <h2>3ds Max 2025 Retopologiya vositalari</h2>
            <p>3ds Max 2025 versiyasida retopologiya jarayoni yanada takomillashtirildi. Yangi vositalar quyidagi imkoniyatlarni taqdim etadi:</p>
            <ul>
                <li>Avtomatik retopologiya - bir necha bosqichda yuqori poligonli modellarni optimallashtirilgan modelga aylantirish</li>
                <li>Yarim avtomatik retopologiya - foydalanuvchi tomonidan boshqariladigan retopologiya jarayoni</li>
                <li>Real vaqtda oldindan ko'rish - o'zgarishlarni darhol kuzatish imkoniyati</li>
                <li>Topology Paint - modelning muhim qismlarini belgilash orqali retopologiya sifatini oshirish</li>
            </ul>
            <p>Bu yangi vositalar orqali siz:</p>
            <ul>
                <li>Game Engine uchun modellarni optimallashtirishingiz</li>
                <li>Animatsiya uchun qulay topologiya yaratishingiz</li>
                <li>3D bosib chiqarish uchun modellarni tayyorlashingiz mumkin</li>
            </ul>
            <p class="article-source">Manba: Autodesk 3ds Max 2025 Release Notes</p>
        `
    },
    'smart-extrude': {
        title: 'Smart Extrude',
        content: `
            <h2>Smart Extrude - Modellashtirish Revolutsiyasi</h2>
            <p>Smart Extrude funksiyasi 3ds Max 2025 da modellashtirish jarayonini tubdan o'zgartiradi:</p>
            <ul>
                <li>Kontekstga asoslangan extrude - atrofdagi geometriyani hisobga olgan holda</li>
                <li>Avtomatik kesishishlarni bartaraf etish</li>
                <li>Real vaqtda preview va sozlash imkoniyatlari</li>
                <li>Yangi shortcut va hotkey'lar</li>
            </ul>
            <h3>Asosiy afzalliklar:</h3>
            <ul>
                <li>Tezkor modellashtirish</li>
                <li>Kamroq xatolar</li>
                <li>Yuqori aniqlik</li>
                <li>Intuitiv interfeys</li>
            </ul>
            <p class="article-source">Manba: Autodesk 3ds Max 2025 Documentation</p>
        `
    },
    'modifier-stack': {
        title: 'Modifier Stack Workflow',
        content: `
            <h2>Yangilangan Modifier Stack</h2>
            <p>3ds Max 2025 da Modifier Stack interfeysi va funksionalligi sezilarli darajada yaxshilandi:</p>
            <ul>
                <li>Yangi vizual interfeys</li>
                <li>Drag-and-drop funksionalligi</li>
                <li>Modifikatorlarni guruhlash imkoniyati</li>
                <li>Preset va template'lar bilan ishlash</li>
            </ul>
            <h3>Yangi modifikatorlar:</h3>
            <ul>
                <li>Advanced Symmetry</li>
                <li>Smart Smooth</li>
                <li>Dynamic Pattern</li>
                <li>Enhanced UV Tools</li>
            </ul>
            <p class="article-source">Manba: Autodesk 3ds Max 2025 Features Overview</p>
        `
    },
    'usd-integration': {
        title: 'USD integratsiyasi',
        content: `
            <h2>Universal Scene Description (USD) integratsiyasi</h2>
            <p>3ds Max 2025 da USD formati bilan ishlash imkoniyatlari kengaytirildi:</p>
            <ul>
                <li>To'g'ridan-to'g'ri USD import/export</li>
                <li>USD Preview va Layout Tools</li>
                <li>Material va teksturalarni USD formatida saqlash</li>
                <li>Pipeline integratsiyasi uchun API</li>
            </ul>
            <h3>USD bilan ishlash afzalliklari:</h3>
            <ul>
                <li>Kross-platforma qo'llab-quvvatlash</li>
                <li>Yuqori unumdorlik</li>
                <li>Keng formatlar bilan moslashuvchanlik</li>
                <li>Studio-miqyosidagi pipeline'lar uchun optimallashtirilgan</li>
            </ul>
            <p class="article-source">Manba: Autodesk USD Implementation Guide</p>
        `
    },
    'python-support': {
        title: 'Python 3 qo\'llab-quvvatlash',
        content: `
            <h2>Python 3 integratsiyasi</h2>
            <p>3ds Max 2025 da Python 3 bilan ishlash imkoniyatlari:</p>
            <ul>
                <li>Python 3.9+ qo'llab-quvvatlash</li>
                <li>Yangi Python API</li>
                <li>MaxScript va Python integratsiyasi</li>
                <li>Kengaytirilgan debugging imkoniyatlari</li>
            </ul>
            <h3>Avtomatlashtirish imkoniyatlari:</h3>
            <ul>
                <li>Batch processing</li>
                <li>Custom tool yaratish</li>
                <li>Pipeline avtomatizatsiyasi</li>
                <li>Asset management</li>
            </ul>
            <p class="article-source">Manba: Autodesk Developer Network</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Modal elementlarini olish
    const modal = document.getElementById('articleModal');
    const modalContent = modal.querySelector('.article-content');
    const closeBtn = modal.querySelector('.close');

    // Maqola ochish funksiyasi
    function openArticle(articleId) {
        const article = articles[articleId];
        if (article) {
            modalContent.innerHTML = article.content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Modal yopish funksiyasi
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Event listener'larni qo'shish
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', () => {
            const articleId = button.getAttribute('data-article');
            openArticle(articleId);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Modal tashqarisiga bosilganda yopish
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC tugmasi bosilganda modal oynani yopish
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}); 