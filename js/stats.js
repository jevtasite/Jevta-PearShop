var tableVisible = false;
var toggleButton = document.getElementById("toggleButton");
var currencyTable = document.getElementById("currencyTable");

    toggleButton.addEventListener("click", function() {
        tableVisible = !tableVisible;
         if (tableVisible) {
            currencyTable.style.display = "table";
            toggleButton.innerText = "Sakrij Kursnu Listu";
        } else {
            currencyTable.style.display = "none";
            toggleButton.innerText = "Prikaži Kursnu Listu";
        }
});

function fetchCurrencyData() {
     fetch("https://open.er-api.com/v6/latest/RSD")
        .then(response => response.json())
        .then(data => {
            const currencyList = document.getElementById("currency-list");
            for (const currency in data.rates) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${currency}</td>
                    <td>${data.rates[currency]}</td>
                    <td>${(1 / data.rates[currency]).toFixed(4)}</td>
                `;
                currencyList.appendChild(row);
            }
        })
         .catch(error => console.error(error));
}

fetchCurrencyData();

document.getElementById("fetchWeatherButton").addEventListener("click", function() {
    const apiKey = '3e6a33d24d194ef7880202008232210';
    const city = document.getElementById("cityInput").value;
    const language = 'sr'; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=${language}`;
        
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const humidity = data.current.humidity;
            const windKph = data.current.wind_kph;
        
            const weatherData = document.getElementById("weatherData");
            weatherData.innerHTML = `
                <p>Trenutna temperatura: ${temperature}°C</p>
                <p>Vreme: ${condition}</p>
                <p>Vlažnost vazduha: ${humidity}%</p>
                <p>Brzina vetra: ${windKph} km/h</p>
                `;
            })
            .catch(error => {
                const weatherData = document.getElementById("weatherData");
                weatherData.innerHTML = "Greška prilikom preuzimanja vremenskih podataka.";
                console.error(error);
             });
});




