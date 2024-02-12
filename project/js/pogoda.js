
const result = document.querySelector(".weather-widget");
//klucz api pogody
const apiKey = "";

var country="";
var city="";

//Pobieranie lokalizacji
$.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",

    success: function( location ) {
        country = location.country_name;
        city = location.city;
    },
    error: function (data, status, req) {
        console.log("Nie można pobrać lokalizacji");
        country="Poland";
        city="Lublin";
    }
});

//Pobieranie pogody
window.addEventListener("load", e => {
    e.preventDefault();

    let inputVal="";

    if (city==null || country==null) {
        inputVal = "Lublin,Poland";
    } else inputVal = city+","+country;
   
     
    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                weather[0]["icon"]
            }.svg`;
            
            const wid = document.createElement("div");
            const markup = `
        <div class="card-body">
            <p class="h4" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
            </p>
        
            <h1 class="display-3">${Math.round(main.temp)}<sup>°C</sup></h1>
            <figure>
            <img class="city-icon" src="${icon}" alt="${
                    weather[0]["description"]
                }">
            <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
        </div>
      `;
            wid.innerHTML = markup;
            result.appendChild(wid);
        })
        .catch(() => {
            console.log("Nie można pobrać pogody");
            const wid = document.createElement("div");
            wid.innerHTML = '<div class="card-body"> <p class="h4">Pogoda niedostępna</p></div>';
            result.appendChild(wid);
        });
    
});