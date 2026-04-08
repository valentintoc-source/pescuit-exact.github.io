const content = {
    ro: {
        river: "DUNĂRE", lake: "BĂLȚI", strat: "Folosește momeală vie pe pragul de 4m.",
        lake_strat: "Pescuit fin la method feeder cu pelete de 2mm.",
        meteo: "METEO & PRESIUNE", sol: "SOLUNAR", prog: "Prognoză pe Ore"
    },
    en: {
        river: "DANUBE", lake: "LAKES", strat: "Use live bait on the 4m shelf.",
        lake_strat: "Fine method feeder with 2mm pellets.",
        meteo: "WEATHER & PRESSURE", sol: "SOLUNAR", prog: "Hourly Forecast"
    }
};

function selectType(type) {
    const lang = document.getElementById('lang-select').value;
    const container = document.getElementById('data-container');
    const strat = document.getElementById('val-strategie');
    const scoreVal = document.getElementById('score-value');
    
    container.style.display = "block";
    
    if(type === 'river') {
        scoreVal.innerText = "82%";
        strat.innerText = content[lang].river;
        document.getElementById('val-presiune').innerText = "1011 hPa (În scădere)";
        document.getElementById('val-strategie').innerText = content[lang].strat;
    } else {
        scoreVal.innerText = "65%";
        document.getElementById('val-presiune').innerText = "1015 hPa (Stabil)";
        document.getElementById('val-strategie').innerText = content[lang].lake_strat;
    }
    
    // Scroll automat la date
    container.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
});
