document.addEventListener('DOMContentLoaded', () => {
    const locationCards = document.querySelectorAll('#locations-list .widget-card');
    const mapPin = document.getElementById('map-pin');
    const pinText = document.getElementById('pin-text');

    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            locationCards.forEach(c => c.classList.remove('bg-orange-50/50', 'border-primary'));
            card.classList.add('bg-orange-50/50');
            if (pinText && mapPin) {
                pinText.textContent = card.getAttribute('data-name');
                mapPin.style.transform = "scale(1.1) translateY(-10px)";
                setTimeout(() => mapPin.style.transform = "scale(1) translateY(0)", 200);
            }
        });
    });
});