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

// Înlocuiește 'YOUR_API_KEY' cu o cheie gratuită de pe openweathermap.org
const WEATHER_API_KEY = 'YOUR_API_KEY'; 

async function fetchLakeData(lat = 44.4268, lon = 26.1025) { // Coordonate implicite (București)
    const scoreTextEl = document.getElementById('score-text');
    const scoreValueEl = document.getElementById('score-value');
    const currentLang = document.getElementById('lang-select').value;

    try {
        // În faza de test, folosim o simulare de date meteo (8 Aprilie 2026)
        // Presiunea de azi: 1012 hPa (în scădere ușoară)
        const pressure = 1012; 
        
        let activityScore = 0;
        let advice = "";

        // ALGORITM TEHNIC BĂLȚI
        if (pressure >= 1010 && pressure <= 1015) {
            activityScore = 85; // Presiune ideală
            advice = (currentLang === 'ro') ? "Presiune perfectă! Peștele este activ." : "Perfect pressure! Fish are active.";
        } else if (pressure < 1010) {
            activityScore = 60; // Apă "grea", peștele poate fi la suprafață
            advice = (currentLang === 'ro') ? "Presiune scăzută. Încearcă Zig-Rig." : "Low pressure. Try Zig-Rig.";
        } else {
            activityScore = 30; // Presiune mare, peștele e letargic
            advice = (currentLang === 'ro') ? "Presiune ridicată. Pescuit dificil." : "High pressure. Difficult fishing.";
        }

        // Actualizăm UI
        scoreValueEl.innerText = activityScore + "%";
        scoreTextEl.innerText = advice;
        
        // Schimbăm culoarea cercului în funcție de scor
        const circle = document.querySelector('.score-circle');
        circle.style.borderColor = activityScore > 70 ? "#00ff88" : (activityScore > 40 ? "#ff9900" : "#ff4444");

    } catch (error) {
        scoreTextEl.innerText = "Eroare la preluarea datelor meteo.";
    }
}

// Modificăm funcția de selecție
function selectType(type) {
    const hydroBox = document.getElementById('hydro-data');
    if (type === 'river') {
        fetchRiverData(); // Funcția de Dunăre de mai devreme
    } else {
        hydroBox.classList.add('hidden'); // Ascundem datele de Dunăre
        fetchLakeData(); // Activăm algoritmul de bălți
    }
}
