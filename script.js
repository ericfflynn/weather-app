let background = {
    loadBackground: function(city) {
    clientID = "Lw-h_6Nn2e3eUPA3dcSvOpsPuH6jdQ_QtErfRE5s8r0";
    let endpoint= `https://api.unsplash.com/photos/random/?client_id=${clientID}&query=${city}`;
    console.log(endpoint)
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
        cityDisplay.innerHTML = "Weather in " +i;
        background.loadBackground(i);
        document.getElementById("search").value='';
    },
};

window.
addEventListener('load', background.loadBackground("New+York"));


document
.querySelector(".search button")
.addEventListener("click", function(){
    weather.search();
});

document.
querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        let i = document.querySelector(".search-bar").value;
        weather.search();
    }
});