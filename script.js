:root {
    --bg-color: #0b0e14;
    --text-color: #ffffff;
    --accent-color: #00ff88;
}

[data-theme="solar"] {
    --bg-color: #f4f4f4;
    --text-color: #1a1a1a;
    --accent-color: #ff8800;
}

[data-theme="camo"] {
    --bg-color: #353a1c;
    --text-color: #f0e68c;
    --accent-color: #8b4513;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Segoe UI', Tahoma, sans-serif;
    transition: 0.3s;
    margin: 0; padding: 20px;
}

.top-bar { display: flex; justify-content: space-between; margin-bottom: 30px; }

.score-circle {
    width: 120px; height: 120px;
    border: 5px solid var(--accent-color);
    border-radius: 50%;
    margin: 20px auto;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; font-weight: bold;
}

.selection-cards { display: flex; gap: 10px; justify-content: center; margin-top: 30px; }

.card {
    background: rgba(128, 128, 128, 0.2);
    border: 2px solid var(--accent-color);
    color: var(--text-color);
    padding: 15px; border-radius: 12px;
    cursor: pointer; flex: 1; max-width: 150px;
}

.card:hover { transform: scale(1.05); }
