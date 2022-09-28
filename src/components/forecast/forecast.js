import "../../index.css";
import { celciusToFerienhiet } from "../current-weather/current-weather";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="title"></label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="temp-range">
                    {Math.round(item.main.temp_min)}°C-
                    {Math.round(item.main.temp_max)}°C
                  </label>
                  <label className="temp-rangeF">
                    {Math.round(celciusToFerienhiet(item.main.temp_min))}°F-
                    {Math.round(celciusToFerienhiet(item.main.temp_max))}°F
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">
                  {Math.round(item.main.feels_like)}°C/
                  {Math.round(celciusToFerienhiet(item.main.feels_like))}°F
                </span>
              </div>
              <div className="daily-details">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{item.main.humidity}%</span>
              </div>
              <div className="daily-details">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{item.main.pressure} hPa</span>
              </div>
              <div className="daily-details">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{item.wind.speed} m/s</span>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
