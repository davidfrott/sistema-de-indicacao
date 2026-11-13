const SVG_PATH_SHOW = "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z";
const SVG_PATH_HIDE = "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z";
const API_URL = 'http://localhost:3001';
const pageLogin = document.getElementById('page-login');
const pageRegister = document.getElementById('page-register');
const pageProfile = document.getElementById('page-profile');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginSenhaInput = document.getElementById('login-senha');
const loginError = document.getElementById('login-error');
const toggleLoginPasswordButton = document.getElementById('toggle-login-password');
const registerForm = document.getElementById('register-form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const registerError = document.getElementById('register-error');
const togglePasswordButton = document.getElementById('toggle-password');
const profileNome = document.getElementById('profile-nome');
const profilePontuacao = document.getElementById('profile-pontuacao');
const profileLink = document.getElementById('profile-link');
const copyLinkButton = document.getElementById('copy-link-button');
const copySuccess = document.getElementById('copy-success');
const logoutButton = document.getElementById('logout-button');

// --- Funções de Controle ---
function showPage(pageName) {
    pageLogin.classList.add('hidden');
    pageRegister.classList.add('hidden');
    pageProfile.classList.add('hidden');
    if (pageName === 'login') pageLogin.classList.remove('hidden');
    else if (pageName === 'register') pageRegister.classList.remove('hidden');
    else if (pageName === 'profile') pageProfile.classList.remove('hidden');
}

function updateProfile(userData) {
    profileNome.textContent = userData.nome;
    profilePontuacao.textContent = userData.pontuacao;
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    profileLink.value = `${baseUrl}?ref=${userData.codigoIndicacao}`;
}

function togglePasswordVisibility(input, button) {
    const isPassword = input.getAttribute('type') === 'password';
    const iconPath = button.querySelector('svg path');
    if (isPassword) {
        input.setAttribute('type', 'text');
        iconPath.setAttribute('d', SVG_PATH_HIDE);
    } else {
        input.setAttribute('type', 'password');
        iconPath.setAttribute('d', SVG_PATH_SHOW);
    }
}

// --- Lógica de Eventos ---
showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showPage('register'); });
showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showPage('login'); });

togglePasswordButton.addEventListener('click', () => togglePasswordVisibility(senhaInput, togglePasswordButton));
toggleLoginPasswordButton.addEventListener('click', () => togglePasswordVisibility(loginSenhaInput, toggleLoginPasswordButton));

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginEmailInput.value, senha: loginSenhaInput.value }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        localStorage.setItem('userEmail', result.email);
        updateProfile(result);
        showPage('profile');
    } catch (error) {
        loginError.textContent = error.message;
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    registerError.textContent = '';
    
    const email = emailInput.value;
    const senha = senhaInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        registerError.textContent = 'Por favor, insira um formato de e-mail válido.';
        return;
    }
    if (senha.length < 8 || !/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
        registerError.textContent = 'A senha deve ter no mínimo 8 caracteres, com letras e números.';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    const userData = { nome: nomeInput.value, email: email, senha: senha };
    if (referralCode) { userData.referredBy = referralCode; }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        localStorage.setItem('userEmail', result.email);
        updateProfile(result);
        showPage('profile');
    } catch (error) {
        registerError.textContent = error.message;
    }
});

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('userEmail');
    showPage('login');
});

copyLinkButton.addEventListener('click', () => {
    navigator.clipboard.writeText(profileLink.value).then(() => {
        copySuccess.textContent = 'Link copiado!';
        setTimeout(() => { copySuccess.textContent = '' }, 3000);
    }).catch(err => { console.error('Falha ao copiar o link:', err); });
});

// --- Lógica de Inicialização ---
async function checkLoggedInUser() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        try {
            const response = await fetch(`${API_URL}/profile/${userEmail}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);
            updateProfile(result);
            showPage('profile');
        } catch (error) {
            localStorage.removeItem('userEmail');
            showPage('login');
        }
    } else {
        showPage('login');
    }
}

checkLoggedInUser();