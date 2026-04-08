const translations = {
    ro: { title: "Pescuit Exact", dunare: "DUNĂRE", balti: "BĂLȚI", score: "Șanse mari de captură!" },
    en: { title: "Exact Fishing", dunare: "DANUBE", balti: "LAKES", score: "High activity forecast!" }
};

document.getElementById('lang-select').addEventListener('change', (e) => {
    const lang = e.target.value;
    document.getElementById('title').innerText = translations[lang].title;
    document.getElementById('btn-dunare').innerText = translations[lang].dunare;
    document.getElementById('btn-balti').innerText = translations[lang].balti;
    document.getElementById('score-text').innerText = translations[lang].score;
});

document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
});

// Funcția pentru a prelua cotele de la Dunăre
async function fetchRiverData() {
    const station = "GIURGIU"; // Putem schimba stația în funcție de selecție
    const riverStatusEl = document.getElementById('river-status');
    const riverLevelEl = document.getElementById('river-level');
    const infoBox = document.getElementById('hydro-data');

    try {
        // Simulăm apelul către API-ul hidrologic (în producție folosim endpoint-ul INHGA/AFDJ)
        // Pentru test, folosim datele de azi, 8 Aprilie 2026
        const mockData = {
            level: "+2 cm",
            trend: "stabil",
            temp: "11°C",
            status_ro: "Apă stabilă - Ideal pentru feeder.",
            status_en: "Stable water - Ideal for feeder fishing."
        };

        infoBox.classList.remove('hidden');
        riverLevelEl.innerText = mockData.level;
        
        // Verificăm limba setată pentru a afișa statusul corect
        const currentLang = document.getElementById('lang-select').value;
        riverStatusEl.innerText = (currentLang === 'ro') ? mockData.status_ro : mockData.status_en;

    } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
        riverStatusEl.innerText = "Date momentan indisponibile.";
    }
}

// Apelăm funcția când se apasă butonul DUNĂRE
function selectType(type) {
    if (type === 'river') {
        fetchRiverData();
    } else {
        alert("Modul Bălți: Analizăm presiunea atmosferică...");
    }
}
