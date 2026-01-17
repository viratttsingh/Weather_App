document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let cityValue = document.getElementById("city").value;

  if (cityValue === "") {
    alert("Please enter a city name");
    return;
  }

  let sindex = cityValue.indexOf(" ");
  if (sindex !== -1) {
    cityValue =
      cityValue.substring(0, sindex) +
      "_" +
      cityValue.substring(sindex + 1);
  }

  let apiUrl =
    "https://api.weatherapi.com/v1/current.json?key=02ae428d8b1f41b7b7c165948232307&q=" +
    cityValue;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (actualdata) {
      
      let locationObj = actualdata.location;
      let weatherObj = actualdata.current;

      let countryName = locationObj.country;
      let cityname = locationObj.name;
      let timezone = locationObj.tz_id;
      let latitude = locationObj.lat;
      let longitude = locationObj.lon;
      let localdatetime = locationObj.localtime;

      let locationText =
        "Country Name: " + countryName + "\n" +
        "City: " + cityname + "\n" +
        "Time: " + localdatetime.substring(10) + "\n" +
        "Date: " + localdatetime.substring(0, 10) + "\n" +
        "Latitude: " + latitude + "\n" +
        "Longitude: " + longitude + "\n" +
        "Time Zone: " + timezone;

      let celsius = weatherObj.temp_c;
      let wind_direction = weatherObj.wind_dir;
      let speed = weatherObj.wind_kph;
      let isday = weatherObj.is_day;
      let UV = weatherObj.uv;
      let skyCondition = weatherObj.condition.text;

      let dayStatus;
      if (isday === 1) {
        dayStatus = "DAY";
      } else {
        dayStatus = "NIGHT";
      }

      let weatherText =
        "Condition of Sky = " + skyCondition + "\n" +
        "Temperature in Celsius = " + celsius + "\n" +
        "Wind Direction is from " + wind_direction + "\n" +
        "Speed of the wind is " + speed + " km/hr\n" +
        "Presently it's \"" + dayStatus + "\" at " + cityValue + "\n" +
        "UV Index Value (1-10) = " + UV;

      document.getElementById("output1").textContent = locationText;
      document.getElementById("output2").textContent = weatherText;
    })
    .catch(function (error) {
      console.log(error);
      document.getElementById("output1").textContent =
        "Error fetching location data.";
      document.getElementById("output2").textContent =
        "Error fetching weather data.";
    });
});