document.addEventListener('DOMContentLoaded', () => {
    const lacuriDB = [
        { nume: "Chiroiu 4", judet: "Ialomita", taxa: "100 RON", reguli: "C&R la crap >4kg. Max 4 lansete.", rating: 5, momeala: "Pop-up porumb" },
        { nume: "Hermes Peris", judet: "Ilfov", taxa: "150 RON", reguli: "Doar monturi fir de par. Sportiv.", rating: 5, momeala: "Solubile" },
        { nume: "Lacul Ciuperca", judet: "Cluj", taxa: "60 RON", reguli: "Fara retinere. Max 3 lansete.", rating: 4, momeala: "Porumb" },
        { nume: "Larga Jijia", judet: "Iasi", taxa: "70 RON", reguli: "Retinere 5kg inclusa.", rating: 3, momeala: "Rame" },
        { nume: "Bezidu Nou", judet: "Mures", taxa: "Permis ANPA", reguli: "Regim de stat.", rating: 4, momeala: "Viermusi" }
    ];

    const resetApp = () => {
        document.getElementById('details-section').classList.add('hidden');
        document.getElementById('calc-section').classList.add('hidden');
    };

    const showLake = (name) => {
        const l = lacuriDB.find(x => x.nume === name);
        if (!l) return;
        document.getElementById('loc-name').innerText = l.nume;
        document.getElementById('loc-taxa').innerText = l.taxa;
        document.getElementById('loc-judet').innerText = l.judet;
        document.getElementById('loc-reguli').innerText = l.reguli;
        document.getElementById('loc-rating').innerText = "⭐".repeat(l.rating);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderLakes = (data) => {
        let html = `<thead><tr><th>Nume</th><th>Județ</th><th>Rating</th></tr></thead><tbody>`;
        data.forEach(l => {
            html += `<tr class="lake-row" data-name="${l.nume}" style="cursor:pointer">
                        <td><b>${l.nume}</b></td><td>${l.judet}</td><td>${"⭐".repeat(l.rating)}</td>
                     </tr>`;
        });
        html += `</tbody>`;
        const table = document.getElementById('main-table');
        table.innerHTML = html;

        // Adaugăm evenimentul de click pe rânduri
        document.querySelectorAll('.lake-row').forEach(row => {
            row.addEventListener('click', () => showLake(row.getAttribute('data-name')));
        });
    };

    const updateData = (type) => {
        resetApp();
        const section = document.getElementById('details-section');
        const search = document.getElementById('search-container');
        section.classList.remove('hidden');

        if(type === 'river') {
            search.classList.add('hidden');
            document.getElementById('loc-name').innerText = "Dunăre - Cotele Apelor";
            document.getElementById('main-table').innerHTML = `<thead><tr><th>Stație</th><th>Cotă</th><th>Trend</th></tr></thead>
                <tbody><tr><td>Baziaș</td><td>+12</td><td>↗️</td></tr><tr><td>Giurgiu</td><td>+2</td><td>➡️</td></tr></tbody>`;
        } else {
            search.classList.remove('hidden');
            renderLakes(lacuriDB);
        }
    };

    // Evenimente Butoane Navigație
    document.getElementById('nav-river').addEventListener('click', () => updateData('river'));
    document.getElementById('nav-lake').addEventListener('click', () => updateData('lake'));
    document.getElementById('nav-calc').addEventListener('click', () => {
        resetApp();
        document.getElementById('calc-section').classList.remove('hidden');
    });
    document.getElementById('btn-home').addEventListener('click', resetApp);

    // Calculator
    document.getElementById('calc-temp').addEventListener('input', (e) => {
        document.getElementById('temp-val').innerText = e.target.value;
    });
    document.getElementById('btn-calculate').addEventListener('click', () => {
        const temp = document.getElementById('calc-temp').value;
        const res = document.getElementById('calc-result');
        res.style.display = "block";
        res.innerHTML = temp < 15 ? "<b>Apă Rece:</b> Nadă fină, fructe." : "<b>Apă Caldă:</b> Pelete, scoică.";
    });

    // Căutare
    document.getElementById('lake-search').addEventListener('keyup', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = lacuriDB.filter(l => l.judet.toLowerCase().includes(val) || l.nume.toLowerCase().includes(val));
        renderLakes(filtered);
    });

    // Temă
    document.getElementById('theme-select').addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.target.value);
    });
});
