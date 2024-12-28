// Функция для загрузки неподтвержденных радиостанций
function loadUnapprovedStations() {
    let stations = JSON.parse(localStorage.getItem('stations')) || [];
    return stations;
}

// Функция для подтверждения радиостанции
function approveStation(index) {
    let stations = loadUnapprovedStations();
    let approvedStation = stations.splice(index, 1)[0];
    let approvedStations = JSON.parse(localStorage.getItem('approvedStations')) || [];
    approvedStations.push(approvedStation);
    localStorage.setItem('approvedStations', JSON.stringify(approvedStations));
    localStorage.setItem('stations', JSON.stringify(stations));
}

// Вывод неподтвержденных радиостанций для модератора
let unapprovedStations = loadUnapprovedStations();
if (unapprovedStations.length > 0) {
    console.log("Неодобренные радиостанции:");
    unapprovedStations.forEach((station, index) => {
        console.log(`${index + 1}. ${station.name} (${station.url})`);
        console.log(`Чтобы подтвердить эту радиостанцию, выполните команду: approveStation(${index});`);
    });
} else {
    console.log("Нет неподтвержденных радиостанций.");
}
    if (currentUser) {
        showHomePage();
    } else {
        showLoginForm();
    }
});
