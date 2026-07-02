document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 3;
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');

    function updateUI() {
        for (let i = 1; i <= totalSteps; i++) {
            document.getElementById(`panel-${i}`)?.classList.toggle('active', i === currentStep);
            const bubble = document.getElementById(`bubble-${i}`);
            if (bubble) {
                bubble.classList.toggle('active', i === currentStep);
                bubble.classList.toggle('completed', i < currentStep);
            }
        }
        if (btnPrev) btnPrev.disabled = (currentStep === 1);
        if (btnNext) btnNext.textContent = (currentStep === totalSteps) ? "Finalizar" : "Siguiente Paso";
    }

    btnNext?.addEventListener('click', () => {
        if (currentStep < totalSteps) { currentStep++; updateUI(); } 
        else { alert('Trámite finalizado con éxito.'); window.location.href = "dashboard.html"; }
    });
    btnPrev?.addEventListener('click', () => { if (currentStep > 1) { currentStep--; updateUI(); } });
    updateUI();
});