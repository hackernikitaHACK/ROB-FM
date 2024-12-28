document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const homeTemplate = document.getElementById('home-template').content.cloneNode(true);
    const loginTemplate = document.getElementById('login-template').content.cloneNode(true);
    const registerTemplate = document.getElementById('register-template').content.cloneNode(true);
    const addRadioTemplate = document.getElementById('add-radio-template').content.cloneNode(true);

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let stations = JSON.parse(localStorage.getItem('stations')) || [];
    let currentUser = null;

    function render(template) {
        app.innerHTML = '';
        app.appendChild(template);
    }

    function showHomePage() {
        render(homeTemplate);
        const radioList = homeTemplate.querySelector('.radio-list');
        stations.forEach(station => {
            const item = document.createElement('li');
            item.className = 'radio-item';
            item.innerHTML = `<strong>${station.name}</strong><br><a href="${station.url}" target="_blank">Прослушать</a>`;
            radioList.appendChild(item);
        });
    }

    function showLoginForm() {
        render(loginTemplate);
    }

    function showRegisterForm() {
        render(registerTemplate);
    }

    function showAddForm() {
        render(addRadioTemplate);
    }

    function backToHome() {
        showHomePage();
    }

    function logout() {
        currentUser = null;
        showLoginForm();
    }

    function login(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            showHomePage();
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
    }

    function register(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!users.some(u => u.username === username)) {
            users.push({
                username,
                email,
                password
            });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Регистрация успешна!');
            showLoginForm();
        } else {
            alert('Пользователь с таким именем уже существует.');
        }
    }

    function addRadioStation(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const url = event.target.url.value;

        stations.push({
            name,
            url
        });
        localStorage.setItem('stations', JSON.stringify(stations));
        alert('Радиостанция успешно добавлена.');
        backToHome();
    }

    if (currentUser) {
        showHomePage();
    } else {
        showLoginForm();
    }
});
