const lacuriDB = [
    // SUD
    { nume: "Chiroiu 4", judet: "Ialomița", taxa: "100 RON", reguli: "C&R la crap >4kg.", momeala: "Pop-up" },
    { nume: "Moara Vlăsiei 2", judet: "Ilfov", taxa: "120 RON", reguli: "Pescuit sportiv intens.", momeala: "Tigernuts" },
    // TRANSILVANIA
    { nume: "Lacul Ciuperca", judet: "Cluj", taxa: "60 RON", reguli: "Max 3 lansete. Fără momeală vie.", momeala: "Pelete" },
    { nume: "Bezidu Nou", judet: "Mureș", taxa: "Permis ANPA", reguli: "Respectare legislație stat.", momeala: "Râmă/Porumb" },
    { nume: "Zetea", judet: "Harghita", taxa: "80 RON", reguli: "Păstrăv și Clean. Fly fishing.", momeala: "Muște/Năluci" },
    // MOLDOVA
    { nume: "Larga Jijia", judet: "Iași", taxa: "70 RON", reguli: "Max 5kg reținere.", momeala: "Mămăligă" },
    { nume: "Stânca Costești", judet: "Botoșani", taxa: "Permis ANPA", reguli: "Zonă frontieră. Aviz PG.", momeala: "Peștișor/Nălucă" },
    { nume: "Ciric", judet: "Iași", taxa: "40 RON", reguli: "Pescuit de zi.", momeala: "Viermuși" }
];

function updateData(type) {
    const section = document.getElementById('details-section');
    const search = document.getElementById('search-container');
    const table = document.getElementById('main-table');
    section.classList.remove('hidden');

    if(type === 'river') {
        search.classList.add('hidden');
        document.getElementById('main-score').innerText = "85%";
        document.getElementById('status-text').innerText = "Dunăre: 8 Aprilie 2026";
        document.getElementById('d-strat').innerText = "Atenție: Prohibiția începe mâine (9 aprilie)!";
        table.innerHTML = `<tr><th>Stație</th><th>Cotă</th><th>Tendință</th></tr>
                           <tr><td>Baziaș</td><td>+12</td><td>↗️</td></tr>
                           <tr><td>Giurgiu</td><td>+2</td><td>➡️</td></tr>`;
    } else {
        search.classList.remove('hidden');
        document.getElementById('main-score').innerText = "75%";
        document.getElementById('status-text').innerText = "Bălți Private & Lacuri";
        renderLakes(lacuriDB);
    }
}

function renderLakes(data) {
    let html = `<tr><th>Nume</th><th>Județ</th><th>Taxă</th></tr>`;
    data.forEach((l, i) => {
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
