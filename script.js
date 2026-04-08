/*document.addEventListener('DOMContentLoaded', () => {
    // Baza de date extinsă cu exemple din județe cheie
    const lacuriDB = [
        { nume: "Chiroiu 4", judet: "Ialomița", taxa: "100 RON / 12h", reguli: "C&R la crap peste 4kg. Max 4 lansete.", rating: 5 },
        { nume: "Hermes Periș", judet: "Ilfov", taxa: "150 RON / 24h", reguli: "Doar monturi fir de păr. Saltea obligatorie.", rating: 5 },
        { nume: "Moara Vlăsiei 2", judet: "Ilfov", taxa: "120 RON / 12h", reguli: "Pescuit sportiv. Fără momeală vie.", rating: 5 },
        { nume: "Lacul Ciuperca", judet: "Cluj", taxa: "60 RON", reguli: "Fără reținere. Max 3 lansete.", rating: 4 },
        { nume: "Tureni", judet: "Cluj", taxa: "80 RON", reguli: "Crap și caras. Max 4 lansete.", rating: 3 },
        { nume: "Larga Jijia", judet: "Iași", taxa: "70 RON", reguli: "Reținere 5kg inclusă.", rating: 3 },
        { nume: "Ciric", judet: "Iași", taxa: "40 RON", reguli: "Pescuit de zi. Caras.", rating: 3 },
        { nume: "Săcueni", judet: "Bihor", taxa: "80 RON", reguli: "Crap și Ten. Monturi sigure.", rating: 5 },
        { nume: "Bezidu Nou", judet: "Mureș", taxa: "Permis ANPA", reguli: "Regim de stat. Respectați cotele.", rating: 4 },
        { nume: "Corbu", judet: "Constanța", taxa: "150 RON", reguli: "Pescuit competițional. C&R.", rating: 5 }
    ];

    const resetApp = () => {
        document.getElementById('details-section').classList.add('hidden');
        document.getElementById('calc-section').classList.add('hidden');
        document.getElementById('lake-search').value = "";
        document.getElementById('loc-name').innerText = "Selectează Locația";
        document.getElementById('loc-taxa').innerText = "--";
        document.getElementById('loc-judet').innerText = "--";
        document.getElementById('loc-reguli').innerText = "Selectează o opțiune din listă.";
        document.getElementById('loc-rating').innerText = "";
    };

    // Funcția care afișează detaliile unei bălți în cardul de sus
    const showLakeDetails = (name) => {
        const balta = lacuriDB.find(l => l.nume === name);
        if (balta) {
            document.getElementById('loc-name').innerText = balta.nume;
            document.getElementById('loc-taxa').innerText = balta.taxa;
            document.getElementById('loc-judet').innerText = balta.judet;
            document.getElementById('loc-reguli').innerText = balta.reguli;
            document.getElementById('loc-rating').innerText = "⭐".repeat(balta.rating);
            
            // Scroll automat către cardul de detalii (sus)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Funcția care randează tabelul (Lista)
    const renderTable = (data) => {
        const table = document.getElementById('main-table');
        if (data.length === 0) {
            table.innerHTML = "<tr><td colspan='3' style='text-align:center; padding: 20px;'>Nu s-au găsit rezultate. Încearcă alt județ.</td></tr>";
            return;
        }

        let html = `<thead><tr><th>Nume Baltă</th><th>Județ</th><th>Rating</th></tr></thead><tbody>`;
        data.forEach(l => {
            html += `<tr class="clickable-row" style="cursor:pointer">
                        <td><strong>${l.nume}</strong></td>
                        <td>${l.judet}</td>
                        <td>${"⭐".repeat(l.rating)}</td>
                     </tr>`;
        });
        html += `</tbody>`;
        table.innerHTML = html;

        // Adăugăm evenimentul de click pe fiecare rând după generare
        const rows = table.getElementsByClassName('clickable-row');
        for (let i = 0; i < rows.length; i++) {
            rows[i].addEventListener('click', function() {
                const name = this.cells[0].innerText;
                showLakeDetails(name);
            });
        }
    };

    // Funcția principală de update (Butoanele Mari)
    window.updateData = function(type) {
        resetApp();
        const section = document.getElementById('details-section');
        const searchContainer = document.getElementById('search-container');
        section.classList.remove('hidden');

        if (type === 'river') {
            searchContainer.classList.add('hidden');
            document.getElementById('loc-name').innerText = "Dunăre - Cotele Apelor";
            document.getElementById('main-table').innerHTML = `
                <thead><tr><th>Stație</th><th>Cotă</th><th>Trend</th></tr></thead>
                <tbody>
                    <tr><td>Baziaș</td><td>+12 cm</td><td>↗️</td></tr>
                    <tr><td>Giurgiu</td><td>+2 cm</td><td>➡️</td></tr>
                    <tr><td>Tulcea</td><td>-5 cm</td><td>↘️</td></tr>
                </tbody>`;
        } else {
            searchContainer.classList.remove('hidden');
            document.getElementById('loc-name').innerText = "Bălți & Lacuri România";
            renderTable(lacuriDB);
        }
    };

    // Filtrarea la tastare (Search)
    document.getElementById('lake-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const filtered = lacuriDB.filter(l => 
            l.judet.toLowerCase().includes(searchTerm) || 
            l.nume.toLowerCase().includes(searchTerm)
        );
        renderTable(filtered);
    });

    // Alte funcții (Home, Calculator, Temă)
    window.resetApp = resetApp;
    window.showCalculator = function() {
        resetApp();
        document.getElementById('calc-section').classList.remove('hidden');
    };

    window.updateTempLabel = function(val) {
        document.getElementById('temp-val').innerText = val;
    };

    window.calculateBait = function() {
        const temp = document.getElementById('calc-temp').value;
        const res = document.getElementById('calc-result');
        res.style.display = "block";
        res.innerHTML = temp < 15 ? 
            "<b>Rețetă Apă Rece:</b> Nadă fină, arome dulci, viermuși puțini." : 
            "<b>Rețetă Apă Caldă:</b> Pelete proteice, arome de scoică/usturoi, boilies.";
    };

    document.getElementById('theme-select').addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.target.value);
    });
});
