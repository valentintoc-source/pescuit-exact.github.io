const db = {
    ro: {
        river: { score: "82%", status: "Dunărea este în palier!", pres: "1012 hPa", vant: "10 km/h SV", cota: "Giurgiu: +2cm", clar: "Tulbure medie", strat: "Feeder greu, coșuleț 120g, momeală vie la prag.",
                 table: "<tr><th>Stație</th><th>Cotă</th><th>Tendință</th></tr><tr><td>Baziaș</td><td>+15</td><td>Creștere</td></tr><tr><td>Giurgiu</td><td>+2</td><td>Stabil</td></tr><tr><td>Tulcea</td><td>-5</td><td>Scădere</td></tr>"
        },
        lake: { score: "65%", status: "Bălți: Presiune în creștere", pres: "1016 hPa", vant: "5 km/h E", cota: "Adâncime: 3.5m", clar: "Limpede", strat: "Method feeder, pelete 2mm, wafter roz." }
    }
};

function updateData(type) {
    const lang = document.getElementById('lang-select').value;
    const data = db[lang][type];
    const section = document.getElementById('details-section');
    
    section.classList.remove('hidden');
    document.getElementById('main-score').innerText = data.score;
    document.getElementById('status-text').innerText = data.status;
    document.getElementById('d-presiune').innerText = data.pres;
    document.getElementById('d-vant').innerText = data.vant;
    document.getElementById('d-cota').innerText = data.cota;
    document.getElementById('d-claritate').innerText = data.clar;
    document.getElementById('d-strat').innerText = data.strat;
    
    if(type === 'river') {
        document.getElementById('river-table').innerHTML = data.table;
        document.getElementById('h-prog').style.display = "block";
    } else {
        document.getElementById('river-table').innerHTML = "";
        document.getElementById('h-prog').style.display = "none";
    }
}

document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
});
