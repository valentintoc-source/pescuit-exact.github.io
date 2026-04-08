const lacuriDB = [
    { nume: "Chiroiu 4", judet: "Ialomita", taxa: "100 RON", reguli: "C&R la crap >4kg. Max 4 lansete.", rating: 5, momeala: "Pop-up porumb" },
    { nume: "Hermes Peris", judet: "Ilfov", taxa: "150 RON", reguli: "Fir de par obligatoriu. Doar sportiv.", rating: 5, momeala: "Solubile 20mm" },
    { nume: "Moara Vlasiei 2", judet: "Ilfov", taxa: "120 RON", reguli: "Pescuit sportiv. Fara momeala vie.", rating: 4, momeala: "Pelete" },
    { nume: "Lacul Ciuperca", judet: "Cluj", taxa: "60 RON", reguli: "Max 3 lansete. Fara retinere.", rating: 4, momeala: "Porumb" },
    { nume: "Larga Jijia", judet: "Iasi", taxa: "70 RON", reguli: "Retinere 5kg inclusa.", rating: 3, momeala: "Ramă/Viermusi" },
    { nume: "Sacueni", judet: "Bihor", taxa: "80 RON", reguli: "Crap si Ten. Doar monturi sigure.", rating: 5, momeala: "Boilies" },
    { nume: "Zetea", judet: "Harghita", taxa: "90 RON", reguli: "Pastrav/Clean. Fly fishing.", rating: 4, momeala: "Naluci" },
    { nume: "Dunare - Giurgiu", judet: "Giurgiu", taxa: "Permis ANPA", reguli: "Respecta prohibitia 2026.", rating: 4, momeala: "Mamaliga/Rame" }
    // Aici poti adauga oricate lacuri doresti urmand modelul
];

function updateData(type) {
    resetApp();
    const section = document.getElementById('details-section');
    const search = document.getElementById('search-container');
    section.classList.remove('hidden');

    if(type === 'river') {
        search.classList.add('hidden');
        document.getElementById('loc-name').innerText = "Dunărea Live";
        renderRiverTable();
    } else {
        search.classList.remove('hidden');
        document.getElementById('loc-name').innerText = "Top Bălți România";
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

function showLake(name) {
    const l = lacuriDB.find(x => x.name === name || x.nume === name);
    document.getElementById('loc-name').innerText = l.nume;
    document.getElementById('loc-taxa').innerText = l.taxa;
    document.getElementById('loc-judet').innerText = l.judet;
    document.getElementById('loc-reguli').innerText = l.reguli;
    document.getElementById('loc-rating').innerText = "⭐".repeat(l.rating);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterLakes() {
    const val = document.getElementById('lake-search').value.toLowerCase();
    const filtered = lacuriDB.filter(l => l.judet.toLowerCase().includes(val) || l.nume.toLowerCase().includes(val));
    renderLakes(filtered);
}

// CALCULATOR MOMELI (Punctul 3)
function showCalculator() {
    resetApp();
    document.getElementById('calc-section').classList.remove('hidden');
}

function updateTempLabel(val) { document.getElementById('temp-val').innerText = val; }

function calculateBait() {
    const specia = document.getElementById('calc-fish').value;
    const temp = document.getElementById('calc-temp').value;
    let reteta = "";

    if(temp < 12) {
        reteta = "Apă rece: Nadă fină, aromă fructată, viermuși puțini. Momeală critic echilibrată (6mm).";
    } else if(temp > 22) {
        reteta = "Apă caldă: Nadă proteică (făină pește), pelete de 4-6mm, arome de scoică/rac. Boilies tare.";
    } else {
        reteta = "Condiții medii: Mix cereale + pelete, aromă dulce/picantă. Porumb sau Wafters.";
    }

    const res = document.getElementById('calc-result');
    res.style.display = "block";
    res.innerHTML = `<strong>Recomandare ${specia.toUpperCase()}:</strong><br>${reteta}`;
}

function resetApp() {
    document.getElementById('details-section').classList.add('hidden');
    document.getElementById('calc-section').classList.add('hidden');
    document.getElementById('calc-result').style.display = "none";
}





/*
const lacuriDB = [
    { nume: "Chiroiu 4", judet: "Ialomița", taxa: "100 RON", reguli: "C&R la crap >4kg.", momeala: "Pop-up" },
    { nume: "Moara Vlăsiei 2", judet: "Ilfov", taxa: "120 RON", reguli: "Pescuit sportiv intens.", momeala: "Tigernuts" },
    { nume: "Lacul Ciuperca", judet: "Cluj", taxa: "60 RON", reguli: "Max 3 lansete.", momeala: "Pelete" },
    { nume: "Bezidu Nou", judet: "Mureș", taxa: "Permis ANPA", reguli: "Legislație stat.", momeala: "Râmă/Porumb" },
    { nume: "Zetea", judet: "Harghita", taxa: "80 RON", reguli: "Fly fishing.", momeala: "Năluci" },
    { nume: "Larga Jijia", judet: "Iași", taxa: "70 RON", reguli: "Max 5kg reținere.", momeala: "Mămăligă" },
    { nume: "Stânca Costești", judet: "Botoșani", taxa: "Permis ANPA", reguli: "Aviz PG obligatoriu.", momeala: "Peștișor" }
];

function resetApp() {
    // Ascunde secțiunea de detalii
    document.getElementById('details-section').classList.add('hidden');
    // Resetează scorul și textul
    document.getElementById('main-score').innerText = "--%";
    document.getElementById('status-text').innerText = "Selectează destinația";
    // Șterge căutarea
    document.getElementById('lake-search').value = "";
    // Scroll sus
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateData(type) {
    const section = document.getElementById('details-section');
    const search = document.getElementById('search-container');
    const table = document.getElementById('main-table');
    section.classList.remove('hidden');

    if(type === 'river') {
        search.classList.add('hidden');
        document.getElementById('main-score').innerText = "85%";
        document.getElementById('status-text').innerText = "Dunăre: Mod Activ";
        document.getElementById('d-strat').innerText = "Atenție: Prohibiție din 9 aprilie!";
        table.innerHTML = `<tr><th>Stație</th><th>Cotă</th><th>Trend</th></tr>
                           <tr><td>Baziaș</td><td>+12</td><td>↗️</td></tr>
                           <tr><td>Giurgiu</td><td>+2</td><td>➡️</td></tr>`;
    } else {
        search.classList.remove('hidden');
        document.getElementById('main-score').innerText = "75%";
        document.getElementById('status-text').innerText = "Bălți & Lacuri";
        renderLakes(lacuriDB);
    }
}

function renderLakes(data) {
    let html = `<tr><th>Nume</th><th>Județ</th><th>Taxă</th></tr>`;
    data.forEach((l) => {
        html += `<tr onclick="showLake('${l.nume}')" style="cursor:pointer">
                    <td><b>${l.nume}</b></td><td>${l.judet}</td><td>${l.taxa}</td>
                 </tr>`;
    });
    document.getElementById('main-table').innerHTML = html;
}

function filterLakes() {
    const val = document.getElementById('lake-search').value.toLowerCase();
    const filtered = lacuriDB.filter(l => l.judet.toLowerCase().includes(val) || l.nume.toLowerCase().includes(val));
    renderLakes(filtered);
}

function showLake(name) {
    const l = lacuriDB.find(x => x.nume === name);
    document.getElementById('status-text').innerText = l.nume;
    document.getElementById('d-strat').innerText = `REGULI: ${l.reguli} | MOMEALĂ: ${l.momeala}`;
    document.getElementById('d-cota').innerText = `Taxă: ${l.taxa}`;
    document.getElementById('d-claritate').innerText = `Județ: ${l.judet}`;
}

document.getElementById('theme-select').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
});
