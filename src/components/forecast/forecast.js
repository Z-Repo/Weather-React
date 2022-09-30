import "../../index.css";
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

const Forecast = ({ data, tempType }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  let degree = "metric";
  {
    tempType === "metric" ? (degree = "°F") : (degree = "°C");
  }

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
                    {Math.round(item.main.temp_min)}
                    {degree}-{Math.round(item.main.temp_max)}
                    {degree}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">
                  {Math.round(item.main.feels_like)}
                  {degree}
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
