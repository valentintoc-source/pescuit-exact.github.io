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