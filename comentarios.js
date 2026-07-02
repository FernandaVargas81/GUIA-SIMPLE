document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comment-form');
    const timeline = document.getElementById('comments-timeline');

    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        const comment = document.getElementById('user-comment').value;

        const card = document.createElement('div');
        card.className = "widget-card bg-white border-l-4 border-primary animate-fade-in";
        card.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-sm text-primary">${name}</span>
                <span class="text-[11px] text-primary font-semibold">Ahora mismo</span>
            </div>
            <p class="text-xs text-gray-600">"${comment}"</p>
        `;
        timeline.insertBefore(card, timeline.firstChild);
        form.reset();
    });
});