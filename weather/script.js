// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi={
    key:"cfba38a4f1e3fe4b49bffcded1cc10e0",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('inputbox');

searchInputBox.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) { 
    event.preventDefault(); // Prevent page reload
  
      getWeatherReport(searchInputBox.value);
      document.querySelector('.weather-body').style.display = "block";
    }
  }
);


// Get the search button element
const searchBtn = document.getElementById('searchBtn');


searchBtn.addEventListener('click', () => {

    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";

});


// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.floor(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate)
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('clear.avif')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('cloudy.avif')";}
        else if(weatherType.textContent == 'Sunny') {

            document.body.style.backgroundImage = "url('sunny.avif')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('haze.avif')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('rain.avif')";}

        else if(weatherType.textContent == 'Drizzle') {
        
        document.body.style.backgroundImage = "url('drizzle.avif')";}

        else if(weatherType.textContent == 'Smoke') {
        
            document.body.style.backgroundImage = "url('smoke.avif')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('snow.avif')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('thunder.avif')";

        
    } ;

}
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}
