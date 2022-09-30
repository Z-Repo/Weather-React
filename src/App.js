import Search from "./components/search/search";
import "./index.css";
import { CW_API_URL, FC_API_URL, UNSPLASH_API_URL } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import { createContext, useState } from "react";
import Forecast from "./components/forecast/forecast";
import Photo from "./components/photoBG/photo";
import ReactSwitch from "react-switch";

/* context API */
export const ThemeContext = createContext(null);

function App() {
  /*Dark Mode/LightMode */
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };
  /* Temperature type */
  const [tempType, setTempType] = useState("metric");
  console.log(tempType);
  const toggleTemp = () => {
    setTempType((currentTemp) =>
      currentTemp === "metric" ? "imperial" : "metric"
    );
  };

  /* Stores data in variables */
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cityLabel, setCityLabel] = useState(null);

  /* Fetches data from APIs after retrieving searchData from search.js */
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(searchData.label);
    const currentWeatherFetch = fetch(
      `${CW_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OW_KEY}&units=${tempType}`
    );
    const forecastFetch = fetch(
      `${FC_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OW_KEY}&units=${tempType}`
    );
    const photoFetch = fetch(
      `${UNSPLASH_API_URL}${process.env.REACT_APP_UNSPLASH_KEY}&page=1&query=${searchData.label}cityline`
    );

    /* Converts responses into .json in order by index of array */
    Promise.all([currentWeatherFetch, forecastFetch, photoFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const photoResponse = await response[2].json();

        /* Places response body's .json into a variable form */
        setCurrentWeather({ City: searchData.label, ...weatherResponse });
        setForecast({ City: searchData.label, ...forecastResponse });
        setPhoto({ City: searchData.label, ...photoResponse });
        setCityLabel(searchData);
      })
      .catch((err) => console.log(err));
  };
  /* Shows you what data is being passed so you can try to access them */
  console.log(currentWeather, forecast, photo, tempType);

  /* Pass data to other components in a variable and populate html */
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="container" id={theme}>
        {photo && <Photo data={photo} />}
        <Search onSearchChange={handleOnSearchChange} />
        <div className="switch">
          <ReactSwitch onChange={toggleTheme} checked={theme === "light"} />
          <label>{theme === "light" ? "Dark Mode" : "Light Mode"}</label>
          <div className="switch2">
            <ReactSwitch
              onChange={() => {
                handleOnSearchChange(cityLabel);
                toggleTemp();
              }}
              checked={tempType === "metric"}
            />
            <label>{tempType === "metric" ? "°F" : "°C"}</label>
          </div>
        </div>
        {currentWeather && (
          <CurrentWeather data={currentWeather} tempType={tempType} />
        )}
        {forecast && <Forecast data={forecast} tempType={tempType} />}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
