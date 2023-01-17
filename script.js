let background = {
    loadBackground: function(city) {
    let citySearch = city.replace(/\s/g,"+");
    clientID = config.clientID;
    let endpoint= `https://api.unsplash.com/photos/random/?client_id=${clientID}&query=${citySearch}`;
    let background = document.querySelector("body");
    fetch(endpoint) 
        .then(function (response) {
        return response.json(); 
        })
        .then(function(jsonData) {
            background.style.backgroundImage = "url("+ jsonData.urls.regular +")";
        })
    }
}
let weather = {
    search: function() {
        let cityDisplay = document.getElementById("city");
        let i = document.querySelector(".search-bar").value;
        this.fetchWeather(i);
        document.getElementById("search").value='';
    },
    "apiKey": config.apiKey,
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=imperial`)
        .then((resonse) => resonse.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const{ temp, humidity } = data.main;
        const { speed } = data.wind;
        let { dt } = data;
        let { timezone } = data;


        console.log(timezone)

        date = new Date()
        let utcOffset =  date.getTimezoneOffset();
        let weatherOffset = (timezone/60)
        let localTime = date.getTime();
        console.log("Local: " + date.toLocaleTimeString())
        let utcTime = new Date(localTime + utcOffset * 60 * 1000);
        console.log("UTC: " + utcTime.toLocaleTimeString())
        let weatherTime;

        if (weatherOffset > 0) {
        weatherTime = new Date(utcTime + weatherOffset * 60 * 1000);
        weatherTimeString = weatherTime.toLocaleTimeString();
        console.log("Weather: " + weatherTime.toLocaleTimeString());
        } else {
        weatherTime = new Date(utcTime - (Math.abs(weatherOffset)) * 60 * 1000);
        weatherTimeString = weatherTime.toLocaleTimeString();
        console.log("Weather:  " + weatherTime.toLocaleTimeString());
        };
        let localTimeString = (weatherTimeString.length == 11) ? weatherTimeString.slice(0,5) + " " +weatherTimeString.slice(-2) : weatherTimeString.slice(0,4) + " " +weatherTimeString.slice(-2);
 
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°F";
        document.querySelector(".humidity").innerText =  "Humidity: "+ Math.round(humidity) + "%";
        document.querySelector(".wind").innerText = "Wind Speed: "+ speed + " mi/h"; 
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".datetime").innerText = "Local Time: " + localTimeString;
        background.loadBackground(name);
    },
};

window.addEventListener('load', weather.fetchWeather("New York"));


document
.querySelector(".search button")
.addEventListener("click", function(){
    weather.search();
});

document.
querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});