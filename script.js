document.addEventListener('DOMContentLoaded', () => {
    // Baza de date extinsă (Exemple reprezentative pentru toate regiunile)
    const lacuriDB = [
        // SUD
        { nume: "Chiroiu 4", judet: "Ialomița", taxa: "100 RON / 12h", reguli: "C&R la crap peste 4kg. Max 4 lansete.", rating: 5 },
        { nume: "Hermes Periș", judet: "Ilfov", taxa: "150 RON / 24h", reguli: "Doar monturi fir de păr. Saltea obligatorie.", rating: 5 },
        { nume: "Moara Vlăsiei 2", judet: "Ilfov", taxa: "120 RON / 12h", reguli: "Fără momeală vie. Pescuit sportiv.", rating: 5 },
        // VEST / TRANSILVANIA
        { nume: "Lacul Ciuperca", judet: "Cluj", taxa: "60 RON", reguli: "Fără reținere. Max 3 lansete.", rating: 4 },
        { nume: "Săcueni", judet: "Bihor", taxa: "80 RON", reguli: "Crap și Ten. Monturi sigure.", rating: 5 },
        { nume: "Bezidu Nou", judet: "Mureș", taxa: "Permis ANPA", reguli: "Regim de stat. Respectați cotele.", rating: 4 },
        { nume: "Zetea", judet: "Harghita", taxa: "80 RON", reguli: "Fly fishing. Păstrăv și Clean.", rating: 4 },
        // EST / MOLDOVA
        { nume: "Larga Jijia", judet: "Iași", taxa: "70 RON", reguli: "Reținere 5kg inclusă.", rating: 3 },
        { nume: "Stânca Costești", judet: "Botoșani", taxa: "Permis ANPA", reguli: "Zonă frontieră. Aviz PG necesar.", rating: 5 },
        { nume: "Ciric", judet: "Iași", taxa: "40 RON", reguli: "Pescuit de zi. Caras și Plătică.", rating: 3 },
        // CONSTANTA / SUD-EST
        { nume: "Corbu", judet: "Constanța", taxa: "150 RON", reguli: "Pescuit competițional. C&R.", rating: 5 }
    ];

    const resetApp = () => {
        document.getElementById('details-section').classList.add('hidden');
        document.getElementById('calc-section').classList.add('hidden');
        document.getElementById('lake-search').value = "";
    };

    const showLake = (name) => {
        const l = lacuriDB.find(x => x.nume === name);
        if (!l) return;
        
        document.getElementById('loc-name').innerText = l.nume;
        document.getElementById('loc-taxa').innerText = l.taxa;
        document.getElementById('loc-judet').innerText = l.judet;
        document.getElementById('loc-reguli').innerText = l.reguli;
        document.getElementById('loc-rating').innerText = "⭐".repeat(l.rating);
        
        // Scroll lin către cardul de detalii
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderLakes = (data) => {
        const table = document.getElementById('main-table');
        if (data.length === 0) {
            table.innerHTML = "<tr><td colspan='3' style='text-align:center'>Nicio baltă găsită în acest județ.</td></tr>";
            return;
        }

        let html = `<thead><tr><th>Nume</th><th>Județ</th><th>Rating</th></tr></thead><tbody>`;
        data.forEach(l => {
            html += `<tr class="lake-row" data-name="${l.nume}" style="cursor:pointer">
                        <td><b>${l.nume}</b></td><td>${l.judet}</td><td>${"⭐".repeat(l.rating)}</td>
                     </tr>`;
        });
        html += `</tbody>`;
        table.innerHTML = html;

        // Re-atașăm evenimentele de click după fiecare filtrare
        document.querySelectorAll('.lake-row').forEach(row => {
            row.addEventListener('click', () => {
                showLake(row.getAttribute('data-name'));
            });
        });
    };

    const updateData = (type) => {
        resetApp();
        const section = document.getElementById('details-section');
        const searchContainer = document.getElementById('search-container');
        section.classList.remove('hidden');

        if(type === 'river') {
            searchContainer.classList.add('hidden');
            document.getElementById('loc-name').innerText = "Dunăre - Cotele Apelor";
            document.getElementById('main-table').innerHTML = `<thead><tr><th>Stație</th><th>Cotă</th><th>Trend</th></tr></thead>
                <tbody><tr><td>Baziaș</td><td>+12 cm</td><td>↗️</td></tr><tr><td>Giurgiu</td><td>+2 cm</td><td>➡️</td></tr><tr><td>Tulcea</td><td>-5 cm</td><td>↘️</td></tr></tbody>`;
        } else {
            searchContainer.classList.remove('hidden');
            document.getElementById('loc-name').innerText = "Bălți & Lacuri România";
            renderLakes(lacuriDB);
        }
    };

    // Navigație
    document.getElementById('nav-river').addEventListener('click', () => updateData('river'));
    document.getElementById('nav-lake').addEventListener('click', () => updateData('lake'));
    document.getElementById('btn-home').addEventListener('click', resetApp);
    
    // Calculator
    document.getElementById('nav-calc').addEventListener('click', () => {
        resetApp();
        document.getElementById('calc-section').classList.remove('hidden');
    });

    // FUNCȚIA DE CĂUTARE REPARATĂ
    document.getElementById('lake-search').addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        const filtered = lacuriDB.filter(l => 
            l.judet.toLowerCase().includes(val) || 
            l.nume.toLowerCase().includes(val)
        );
        renderLakes(filtered);
    });

    // Restul setărilor (Tema, Calculator etc.)
    document.getElementById('theme-select').addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.target.value);
    });

    document.getElementById('calc-temp').addEventListener('input', (e) => {
        document.getElementById('temp-val').innerText = e.target.value;
    });

    document.getElementById('btn-calculate').addEventListener('click', () => {
        const temp = document.getElementById('calc-temp').value;
        const res = document.getElementById('calc-result');
        res.style.display = "block";
        res.innerHTML = temp < 15 ? "<b>Rețetă Apă Rece:</b> Nadă fină, arome dulci (căpșună/miere), viermuși." : "<b>Rețetă Apă Caldă:</b> Pelete proteice, arome tari (scoică/usturoi), boilies.";
    });
});
