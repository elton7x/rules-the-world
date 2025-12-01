// CONFIGURATION
const REWARDS = [15000, 17500, 14200, 18800, 16500, 13000, 17000];
const NAMES = ['Zemmabi d lixo', 'Elvisson Daniel', 'Helmer Castilho', 'Sara Cuca', 'Eraldina Santos'];
const AMOUNTS = ['15.000', '27.000', '35.000', '12.500'];

// VTURB CODES (Raw HTML)
const VIDEO_CODES = [
    `<vturb-smartplayer id="vid-692adee24fd612d7bf33701a" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer> <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/a32201f5-5e84-4186-86c3-fbc80b0de481/players/692adee24fd612d7bf33701a/v4/player.js", s.async=!0,document.head.appendChild(s); <\/script>`,
    `<vturb-smartplayer id="vid-692adef1ec174641c2b1fb4b" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer> <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/a32201f5-5e84-4186-86c3-fbc80b0de481/players/692adef1ec174641c2b1fb4b/v4/player.js", s.async=!0,document.head.appendChild(s); <\/script>`,
    `<vturb-smartplayer id="vid-692adedbeb5ec5285cec0c95" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer> <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/a32201f5-5e84-4186-86c3-fbc80b0de481/players/692adedbeb5ec5285cec0c95/v4/player.js", s.async=!0,document.head.appendChild(s); <\/script>`,
    `<vturb-smartplayer id="vid-692adecff0b2d76420cab773" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer> <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/a32201f5-5e84-4186-86c3-fbc80b0de481/players/692adecff0b2d76420cab773/v4/player.js", s.async=!0,document.head.appendChild(s); <\/script>`,
    `<vturb-smartplayer id="vid-692adebf4fd612d7bf336fd0" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer> <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/a32201f5-5e84-4186-86c3-fbc80b0de481/players/692adebf4fd612d7bf336fd0/v4/player.js", s.async=!0,document.head.appendChild(s); <\/script>`,
    `<vturb-smartplayer id="vid-692a41124fd612d7bf32fa03" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer> <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/a32201f5-5e84-4186-86c3-fbc80b0de481/players/692a41124fd612d7bf32fa03/v4/player.js", s.async=!0,document.head.appendChild(s); <\/script>`,
    `<vturb-smartplayer id="vid-692a40bef0b2d76420ca409f" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer> <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/a32201f5-5e84-4186-86c3-fbc80b0de481/players/692a40bef0b2d76420ca409f/v4/player.js", s.async=!0,document.head.appendChild(s); <\/script>`
];

// STATE
let state = {
    balance: 0,
    videoIndex: 0,
    count: 0
};

// INITIALIZATION
window.onload = function () {
    console.log("App Started");
    createSnow();
    startNotifications();
};

// NAVIGATION
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id + '-section').classList.remove('hidden');
    document.getElementById(id + '-section').classList.add('active');
}

// LOGIN
function startApp() {
    const val = document.getElementById('login-input').value;
    if (val.length > 0) {
        showSection('dashboard');
        loadVideo();
    } else {
        alert("Digite seus dados!");
    }
}

// VIDEO LOADING (ROBUST)
function loadVideo() {
    const slot = document.getElementById('video-slot');
    if (state.videoIndex < VIDEO_CODES.length) {
        // 1. Clear Slot
        slot.innerHTML = '';

        // 2. Create Temp Wrapper
        const temp = document.createElement('div');
        temp.innerHTML = VIDEO_CODES[state.videoIndex];

        // 3. Move and Execute Scripts
        while (temp.firstChild) {
            const child = temp.firstChild;
            if (child.tagName === 'SCRIPT') {
                const newScript = document.createElement('script');
                Array.from(child.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(child.innerHTML));
                slot.appendChild(newScript);
                temp.removeChild(child);
            } else {
                slot.appendChild(child);
            }
        }
    }
}

// RATING
function selectBtn(btn) {
    btn.parentElement.querySelectorAll('.action-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function submitRating() {
    // Target the specific button in the dashboard to avoid confusion
    const btn = document.querySelector('#dashboard-section .btn-main');

    // Fake Loading
    const originalText = btn.innerText;
    btn.innerText = "Enviando...";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;

        // Update State
        const reward = REWARDS[state.videoIndex] || 15000;
        state.balance += reward;
        state.count++;
        state.videoIndex++;

        // Update UI
        document.getElementById('balance-val').innerText = state.balance.toLocaleString('pt-AO', { minimumFractionDigits: 2 });
        document.getElementById('balance-val-final').innerText = state.balance.toLocaleString('pt-AO', { minimumFractionDigits: 2 });

        // Show Popup
        document.getElementById('popup-amount').innerText = reward.toLocaleString('pt-AO') + " KZS";
        document.getElementById('popup').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('popup').classList.add('hidden');

            // Next Step
            if (state.count >= REWARDS.length) {
                document.getElementById('final-amount-display').innerText = state.balance.toLocaleString('pt-AO', { minimumFractionDigits: 2 }) + " KZS";
                showSection('limit');
            } else {
                loadVideo();
                // Reset buttons
                document.querySelectorAll('.selected').forEach(b => b.classList.remove('selected'));
            }
        }, 1500);

    }, 1000);
}

// WITHDRAW
function showWithdraw() {
    showSection('withdraw');
}

function selectMethod(el) {
    document.querySelectorAll('.method').forEach(m => m.classList.remove('active'));
    el.classList.add('active');
}

function processWithdraw() {
    const iban = document.getElementById('iban-input').value;
    if (iban.length > 5) {
        const btn = document.querySelector('#withdraw-section .btn-main');
        const originalText = btn.innerText;
        btn.innerText = "Processando...";

        setTimeout(() => {
            btn.innerText = originalText;

            // Update error message with actual balance
            const finalAmount = state.balance.toLocaleString('pt-AO', { minimumFractionDigits: 2 }) + " KZS";
            document.getElementById('error-amount').innerText = finalAmount;

            showSection('error');
        }, 1500);
    } else {
        alert("Insira um IBAN ou número válido");
    }
}

// NOTIFICATIONS
function startNotifications() {
    const banner = document.getElementById('notification-banner');
    const text = document.getElementById('notify-text');

    setInterval(() => {
        const name = NAMES[Math.floor(Math.random() * NAMES.length)];
        const amount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];

        banner.style.opacity = '0';
        setTimeout(() => {
            text.innerText = `${name} sacou ${amount} KZS`;
            banner.style.opacity = '1';
        }, 500);
    }, 4000);
}

// SNOW
function createSnow() {
    const container = document.getElementById('snow-container');
    for (let i = 0; i < 30; i++) {
        const s = document.createElement('div');
        s.className = 'snowflake';
        s.innerHTML = '❄';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.fontSize = (Math.random() * 10 + 10) + 'px';
        s.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(s);
        s.addEventListener('animationend', () => {
            s.style.top = '-10px';
            s.style.left = Math.random() * 100 + 'vw';
        });
    }
}
