import Search from "./components/search/search";
import "./App.css";
import { CW_API_URL, FC_API_URL } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${CW_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OW_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${FC_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OW_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ City: searchData.label, ...weatherResponse });
        setForecast({ City: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather, forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
