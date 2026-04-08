const translations = {
    ro: { 
        title: "Pescuit Exact", 
        dunare: "DUNĂRE", 
        balti: "BĂLȚI / LACURI", 
        select: "Selectează un loc", 
        river_ok: "Apă stabilă - Ideal feeder", 
        lake_ok: "Presiune perfectă! Peștele e activ." 
    },
    en: { 
        title: "Exact Fishing", 
        dunare: "DANUBE", 
        balti: "LAKES", 
        select: "Select a location", 
        river_ok: "Stable water - Ideal for feeder", 
        lake_ok: "Perfect pressure! Fish are active." 
    }
};

// Schimbare Limbă
document.getElementById('lang-select').addEventListener('change', (e) => {
    const lang = e.target.value;
    document.getElementById('title').innerText = translations[lang].title;
    document.getElementById('btn-dunare').innerText = translations[lang].dunare;
    document.getElementById('btn-balti').innerText = translations[lang].balti;
    
    // Actualizăm și textul de scor dacă a fost deja selectat ceva
    const currentScoreText = document.getElementById('score-text').innerText;
    if (currentScoreText !== "Selectează un loc de pescuit" && currentScoreText !== "Select a location") {
        const isRiver = document.getElementById('hydro-data').style.display === "block";
        document.getElementById('score-text').innerText = isRiver ? translations[lang].river_ok : translations[lang].lake_ok;
    }
});

// Schimbare Temă
document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
});

// Logică Selecție REPARATĂ
function selectType(type) {
    const scoreVal = document.getElementById('score-value');
    const scoreText = document.getElementById('score-text');
    const hydroBox = document.getElementById('hydro-data');
    const lang = document.getElementById('lang-select').value;

    if (type === 'river') {
        // Resetăm și forțăm afișarea pentru Dunăre
        scoreVal.innerText = "85%";
        scoreVal.style.color = "#00ff88";
        scoreText.innerText = translations[lang].river_ok;
        
        hydroBox.style.display = "block"; // Arătăm caseta
        document.getElementById('river-status').innerText = translations[lang].river_ok;
        console.log("Switch to River Mode");
    } else if (type === 'lake') {
        // Resetăm și ascundem pentru Bălți
        scoreVal.innerText = "70%";
        scoreVal.style.color = "#ff9900";
        scoreText.innerText = translations[lang].lake_ok;
        
        hydroBox.style.display = "none"; // Ascundem caseta de Dunăre
        console.log("Switch to Lake Mode");
    }
}
