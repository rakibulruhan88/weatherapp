let apiUrl =
  "https://api.weatherapi.com/v1/current.json?key=5c2079669f20472daca60905241905&q=";
let searchBtn = document.querySelector(".search button");
let inputField = document.querySelector(".search input");
let weatherIcon = document.querySelector(".weather img");

async function cheakWeather(city) {
  const response = await fetch(apiUrl + city);
  console.log(response);
  if (response.status === 400) {
    document.querySelector(".valid").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML =
      Math.floor(data.current.temp_c) + "°C";
    document.querySelector(".country").innerHTML = data.location.country;
    document.querySelector(".time").innerHTML = data.current.last_updated;
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " kp/h";
    document.querySelector(".humidity").innerHTML =
      data.current.humidity + " %";

    if (data.current.condition.text == "Partly Cloudy") {
      weatherIcon.src = "/images/cloud.png";
    } else if (data.current.condition.text == "Sunny") {
      weatherIcon.src = "/images/clear.png";
    } else if (data.current.condition.text == "Mist") {
      weatherIcon.src = "/images/wind.png";
    } else if (data.current.condition.text == "Partly cloudy") {
      weatherIcon.src = "/images/cloud.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".valid").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  cheakWeather(inputField.value);
  inputField.value = "";
});
