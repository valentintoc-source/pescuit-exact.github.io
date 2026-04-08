const lacuriDB = [
    { nume: "Chiroiu 4", judet: "Ialomita", taxa: "100 RON", reguli: "C&R la crap >4kg. Max 4 lansete.", rating: 5, momeala: "Pop-up porumb" },
    { nume: "Hermes Peris", judet: "Ilfov", taxa: "150 RON", reguli: "Doar monturi fir de par. Sportiv.", rating: 5, momeala: "Solubile" },
    { nume: "Lacul Ciuperca", judet: "Cluj", taxa: "60 RON", reguli: "Fara retinere. Max 3 lansete.", rating: 4, momeala: "Porumb" },
    { nume: "Larga Jijia", judet: "Iasi", taxa: "70 RON", reguli: "Retinere 5kg inclusa.", rating: 3, momeala: "Rame" },
    { nume: "Bezidu Nou", judet: "Mures", taxa: "Permis ANPA", reguli: "Regim de stat.", rating: 4, momeala: "Viermusi" }
];

function resetApp() {
    document.getElementById('details-section').classList.add('hidden');
    document.getElementById('calc-section').classList.add('hidden');
    document.getElementById('main-score').innerText = "--%";
    document.getElementById('status-text').innerText = "Selectează destinația";
}

function updateData(type) {
    resetApp();
    const section = document.getElementById('details-section');
    const search = document.getElementById('search-container');
    section.classList.remove('hidden');

    if(type === 'river') {
        search.classList.add('hidden');
        document.getElementById('main-score').innerText = "85%";
        document.getElementById('status-text').innerText = "Dunăre: 8 Aprilie 2026";
        document.getElementById('loc-name').innerText = "Dunăre - Cotele Apelor";
        document.getElementById('loc-reguli').innerText = "Prohibiția generală începe pe 9 Aprilie!";
        renderRiver();
    } else {
        search.classList.remove('hidden');
        document.getElementById('main-score').innerText = "72%";
        document.getElementById('status-text').innerText = "Bălți & Lacuri";
        renderLakes(lacuriDB);
    }
}

function renderLakes(data) {
    let html = `<tr><th>Nume</th><th>Județ</th><th>Rating</th></tr>`;
    data.forEach(l => {
        html += `<tr onclick="showLake('${l.nume}')" style="cursor:pointer">
                    <td><b>${l.nume}</b></td><td>${l.judet}</td><td>${"⭐".repeat(l.rating)}</td>
                 </tr>`;
    });
    document.getElementById('main-table').innerHTML = html;
}

function renderRiver() {
    document.getElementById('main-table').innerHTML = `<tr><th>Stație</th><th>Cotă</th><th>Trend</th></tr>
        <tr><td>Baziaș</td><td>+12</td><td>↗️</td></tr>
        <tr><td>Giurgiu</td><td>+2</td><td>➡️</td></tr>`;
}

function filterLakes() {
    const val = document.getElementById('lake-search').value.toLowerCase();
    const filtered = lacuriDB.filter(l => l.judet.toLowerCase().includes(val) || l.nume.toLowerCase().includes(val));
    renderLakes(filtered);
}

function showLake(name) {
    const l = lacuriDB.find(x => x.nume === name);
    document.getElementById('loc-name').innerText = l.nume;
    document.getElementById('loc-taxa').innerText = l.taxa;
    document.getElementById('loc-judet').innerText = l.judet;
    document.getElementById('loc-reguli').innerText = l.reguli;
    document.getElementById('loc-rating').innerText = "⭐".repeat(l.rating);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCalculator() {
    resetApp();
    document.getElementById('calc-section').classList.remove('hidden');
}

function updateTempLabel(val) { document.getElementById('temp-val').innerText = val; }

function calculateBait() {
    const temp = document.getElementById('calc-temp').value;
    const res = document.getElementById('calc-result');
    res.style.display = "block";
    res.innerHTML = temp < 15 ? "<b>Rețetă Apă Rece:</b> Nadă fină, arome de fructe, viermuși." : "<b>Rețetă Apă Caldă:</b> Pelete, arome de scoică/rac, boilies tare.";
}

document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
});
