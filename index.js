const apiKey = "ADD KEY HERE";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const searchInput = document.querySelector('#search')
const toggleSwitch = document.querySelector('.theme-switch');
const currentTheme = localStorage.getItem('theme');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.weather').style.display = 'none'
        document.querySelector('.error').style.display = 'block'
    } else {
        var data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        switch (data.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = 'images/clouds.png'
                break;
            case 'Clear':
                weatherIcon.src = 'images/clear.png'
                break;
            case 'Rain':
                weatherIcon.src = 'images/rain.png'
                break;
            case 'Drizzle':
                weatherIcon.src = 'images/drizzle.png'
                break;
            case 'Mist':
                weatherIcon.src = 'images/mist.png'
                break;
            case 'Snow':
                weatherIcon.src = 'images/snow.png'
                break;
        };

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none'
    };

};

document.querySelector('.error').style.display = 'none'

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value)
    }
});

searchBtn.addEventListener('click', function () {
    checkWeather(searchBox.value)
});

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);