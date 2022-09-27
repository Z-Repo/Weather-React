import Search from "./components/search/search";
import "./App.css";
import { CW_API_URL, FC_API_URL, UNSPLASH_API_URL } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";
import Photo from "./components/photoBG/photo";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(searchData.label);
    const currentWeatherFetch = fetch(
      `${CW_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OW_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${FC_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OW_KEY}&units=metric`
    );
    const photoFetch = fetch(
      `${UNSPLASH_API_URL}${process.env.REACT_APP_UNSPLASH_KEY}&page=1&query=${searchData.label}cityline`
    );

    Promise.all([currentWeatherFetch, forecastFetch, photoFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const photoResponse = await response[2].json();

        setCurrentWeather({ City: searchData.label, ...weatherResponse });
        setForecast({ City: searchData.label, ...forecastResponse });
        setPhoto({ City: searchData.label, ...photoResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather, forecast, photo);

  return (
    <div className="container">
      {photo && <Photo data={photo} />}
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
