document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchContainer = searchInput?.parentElement;
    if (searchInput && searchContainer) {
        searchInput.addEventListener('focus', () => searchContainer.classList.add('scale-[1.01]', 'border-primary'));
        searchInput.addEventListener('blur', () => searchContainer.classList.remove('scale-[1.01]', 'border-primary'));
    }
});