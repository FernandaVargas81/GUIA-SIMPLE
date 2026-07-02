document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    const searchInput = document.getElementById('faq-search');
    searchInput?.addEventListener('input', function(e) {
        const text = e.target.value.toLowerCase();
        faqItems.forEach(item => {
            const match = item.textContent.toLowerCase().includes(text);
            item.style.display = match ? "block" : "none";
        });
    });
});