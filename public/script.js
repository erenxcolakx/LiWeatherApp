// ------------------------ City Search and Find -------------------------//
async function fetchAndDisplaySuggestions() {
const inputBox = $("#citySearch");
const userInput = inputBox.val().trim();

if (userInput.length === 0) {
  $("#exampleCities").html('');
  return;
}

try {
  const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${userInput}&count=50&language=en&format=json`);
  const suggestions = response.data.results;

  // Clear previous suggestions
  $("#exampleCities").html('');

  // Create and append individual suggestion elements
  suggestions.forEach(result => {
    const cityName = result.name;
    const country = result.admin1 == null ? "" : result.admin1;
    const id = result.id;
    const latitude = result.latitude;
    const longitude = result.longitude;

    const suggestionElement = $(`<li></li>`)
      .attr({
        "id": id,
        "latitude": latitude,
        "longitude": longitude,
      })
      .text(`${cityName}, ${country}`);

    $("#exampleCities").append(suggestionElement);
  });

  // Receive updated list of suggestions

  // Add click event listener to each suggestion
  $("#exampleCities li").on('click', async function () {
    const selectedItem = $(this).text();
    const latitude = $(this).attr("latitude");
    const longitude = $(this).attr("longitude");
    const city = selectedItem.split(',')[0].trim();
    $("#exampleCities").html(''); // Clean suggestions list
    inputBox.val("");
    // Assuming latitude, longitude, and city are variables containing your data
    const queryString = `?latitude=${latitude}&longitude=${longitude}&cityName=${city}`;
    // Redirect to /weather with query parameters
    window.location.href = '/weather' + queryString;
  });

} catch (error) {
  console.error(error);
  $("#exampleCities").html('<li style="color: red;"> Could not find the city. Please try again.</li>');
}
}

$("#citySearch").on('input', fetchAndDisplaySuggestions);

const citySuggestions = $("#exampleCities li"); // unorderedList items

const API_URL = "https://api.open-meteo.com/v1/forecast?";
const current =["temperature_2m","apparent_temperature","rain,snowfall","weather_code","wind_speed_10m","relative_humidity_2m"];
const daily =["weather_code","temperature_2m_max","temperature_2m_min,sunshine_duration"];
const timezone = "auto";
const forecast_days = 1;
