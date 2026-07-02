document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATOS REALES DE LOS TRÁMITES ---
    const tramitesData = {
        licencia: {
            title: "Datos Claves: Licencia de Conducción",
            context: "Según las leyes de movilidad vigentes, los exámenes médicos certificados cargados en la plataforma del RUNT tienen una vigencia máxima de 180 días calendario. Asegúrate de que el Centro de Reconocimiento de Conductores (CRC) se encuentre plenamente homologado y en la misma jurisdicción departamental.",
            checklist: [
                "Estar inscrito de forma activa ante el sistema central del RUNT.",
                "Estar completamente a paz y salvo por concepto de multas, comparendos o infracciones de tránsito estatales.",
                "Certificado de aptitud física, mental y de coordinación motriz expedido por un CRC autorizado.",
                "Documento de identidad original físico o Cédula Digital vigente."
            ]
        },
        pasaporte: {
            title: "Datos Claves: Pasaporte Ordinario",
            context: "Las solicitudes y agendamientos en las plataformas de las gobernaciones o Cancillería se habilitan en días hábiles específicos de manera gratuita. Los pagos se dividen en dos impuestos separados: un arancel nacional y una tasa de estampida departamental que varía según la región geográfica.",
            checklist: [
                "Diligenciar por completo el formulario de prerregistro en el sitio web de la Cancillería.",
                "Agendamiento web exitoso del módulo de cita presencial biométrica.",
                "Presentar la cédula de ciudadanía original en formato físico o digital de última generación.",
                "Comprobante original de pago impreso o confirmación digital de pago por pasarela PSE."
            ]
        }
    };

    // --- MANEJO DEL INTERRUPTOR DE TRÁMITES ---
    const btnLicencia = document.getElementById('btn-select-licencia');
    const btnPasaporte = document.getElementById('btn-select-pasaporte');
    const boxTitle = document.getElementById('data-box-title');
    const boxContent = document.getElementById('data-box-content');
    const checklistContainer = document.getElementById('checklist-container');

    function renderTramiteContent(key) {
        const data = tramitesData[key];
        if (!data) return;

        boxTitle.textContent = data.title;
        boxContent.textContent = data.context;

        checklistContainer.innerHTML = '';
        data.checklist.forEach((requisito, index) => {
            const label = document.createElement('label');
            label.className = "flex items-start gap-3 bg-background p-3 rounded-xl cursor-pointer hover:bg-surface-container/50 transition-colors border border-gray-100";
            label.innerHTML = `
                <input type="checkbox" class="rounded text-primary border-gray-300 focus:ring-primary mt-0.5" id="chk-${key}-${index}">
                <span class="text-xs text-on-surface-variant leading-relaxed">${requisito}</span>
            `;
            checklistContainer.appendChild(label);
        });
    }

    btnLicencia?.addEventListener('click', () => {
        btnLicencia.classList.add('ring-2', 'ring-tertiary', 'bg-orange-50/30');
        btnLicencia.classList.remove('grayscale', 'opacity-70');
        btnPasaporte.classList.remove('ring-2', 'ring-primary', 'bg-orange-50/30');
        btnPasaporte.classList.add('grayscale', 'opacity-70');
        renderTramiteContent('licencia');
    });

    btnPasaporte?.addEventListener('click', () => {
        btnPasaporte.classList.add('ring-2', 'ring-primary', 'bg-orange-50/30');
        btnPasaporte.classList.remove('grayscale', 'opacity-70');
        btnLicencia.classList.remove('ring-2', 'ring-tertiary', 'bg-orange-50/30');
        btnLicencia.classList.add('grayscale', 'opacity-70');
        renderTramiteContent('pasaporte');
    });


    // --- SISTEMA DEL CALENDARIO INTERACTIVO CORREGIDO (Junio 2026) ---
    const calendarGrid = document.getElementById('calendar-grid');
    const eventPanel = document.getElementById('calendar-event-panel');
    const selectedDateLabel = document.getElementById('selected-date-label');
    const eventInput = document.getElementById('event-input');
    const btnSaveEvent = document.getElementById('btn-save-event');

    let selectedDayGlobal = null;
    const yearTarget = 2026;
    const monthTarget = 5; // Junio (Base 0)
    const totalDaysInMonth = 30;

    // Cargar eventos guardados
    let savedEvents = JSON.parse(localStorage.getItem('guia_simple_events')) || {};

    function renderCalendar() {
        if (!calendarGrid) return;
        calendarGrid.innerHTML = '';

        for (let day = 1; day <= totalDaysInMonth; day++) {
            const dayButton = document.createElement('button');
            const dateKey = `${yearTarget}-${monthTarget + 1}-${day}`;
            
            // Contenedor base de la casilla (Estable y limpio)
            dayButton.className = "p-1 rounded-xl text-center font-medium transition-all hover:bg-orange-50 border border-gray-100 flex flex-col items-center justify-center min-h-[48px] bg-white text-on-surface relative";
            
            // Añadimos el número envuelto en un span aislado (Evita que el texto se esconda o se mueva)
            // NOTA: Usa 'rounded-full' para un círculo o cámbialo a 'rounded-lg' si prefieres un cuadrado.
            dayButton.innerHTML = `
                <span class="day-number w-8 h-8 flex items-center justify-center font-bold text-xs transition-all">
                    ${day}
                </span>
            `;

            const dayNumberSpan = dayButton.querySelector('.day-number');

            // Puntito indicador si el día tiene eventos guardados
            if (savedEvents[dateKey]) {
                const dot = document.createElement('span');
                dot.className = "w-1.5 h-1.5 bg-tertiary rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2";
                dayButton.appendChild(dot);
            }

            // CORRECCIÓN: Resaltar con fondo naranja el día 18 (Día de entrada actual) de forma automática al cargar
            if (day === 18 && !selectedDayGlobal) {
                selectedDayGlobal = dateKey;
                dayNumberSpan.classList.add('bg-primary', 'text-white', 'rounded-full');
                
                if (selectedDateLabel && eventPanel && eventInput) {
                    selectedDateLabel.textContent = `Evento para el día 18 de Junio, 2026:`;
                    eventInput.value = savedEvents[dateKey] || '';
                    eventPanel.classList.remove('hidden');
                }
            } else if (selectedDayGlobal === dateKey) {
                // Mantener el estilo activo si ya estaba seleccionado al redibujar
                dayNumberSpan.classList.add('bg-primary', 'text-white', 'rounded-full');
            }

            // Evento al dar clic encima de la fecha
            dayButton.addEventListener('click', () => {
                // Limpiar la clase de selección de todos los números del mes anterior sin alterarlos
                document.querySelectorAll('#calendar-grid .day-number').forEach(span => {
                    span.classList.remove('bg-primary', 'text-white', 'rounded-full');
                });
                
                // Rodear e iluminar con fondo naranja el día presionado
                dayNumberSpan.classList.add('bg-primary', 'text-white', 'rounded-full');
                
                selectedDayGlobal = dateKey;
                if (selectedDateLabel && eventPanel && eventInput) {
                    selectedDateLabel.textContent = `Evento para el día ${day} de Junio, 2026:`;
                    eventInput.value = savedEvents[dateKey] || '';
                    eventPanel.classList.remove('hidden');
                }
            });

            calendarGrid.appendChild(dayButton);
        }
    }

    btnSaveEvent?.addEventListener('click', () => {
        if (!selectedDayGlobal) return;
        const textValue = eventInput.value.trim();

        if (textValue === '') {
            delete savedEvents[selectedDayGlobal];
        } else {
            savedEvents[selectedDayGlobal] = textValue;
        }

        localStorage.setItem('guia_simple_events', JSON.stringify(savedEvents));
        renderCalendar(); // Refrescar los indicadores visuales
        alert('Agenda guardada con éxito.');
    });

    // --- INICIALIZACIÓN POR DEFECTO ---
    renderTramiteContent('licencia');
    renderCalendar();
});