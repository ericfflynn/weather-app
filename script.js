let background = {
    loadBackground: function(city) {
    let citySearch = city.replace(/\s/g,"+");
    clientID = "Lw-h_6Nn2e3eUPA3dcSvOpsPuH6jdQ_QtErfRE5s8r0";
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
    "apiKey": "ff8b85cbe6a39f0e7497223ee8a1f967",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=imperial`)
        .then((resonse) => resonse.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const{ temp, humidity } = data.main;
        const{ speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp) + "°F";
        document.querySelector(".humidity").innerText =  "Humidity: "+ Math.round(humidity) + "%";
        document.querySelector(".wind").innerText = "Wind Speed: "+ speed + " mi/h"; 
        document.querySelector(".weather").classList.remove("loading");
        background.loadBackground(name);
    }
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