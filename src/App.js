import classes from "./App.module.scss";
import { useState } from "react";

function App() {
  const apiKey = "b8ee2d3ff7031837cfa90b10d6a515a1";

  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [description, setDescription] = useState("");

  async function getCurrentWeather(e) {
    if (city) {
      e.preventDefault();
      await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          apiKey +
          "&units=metric"
      )
        .then((response) => response.json())
        .then((data) => {
          setTemp(data?.main?.temp);
          setHumidity(data?.main?.humidity);
          setDescription(data?.weather[0]?.description);
        });
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <p>Виконав Шіхерт Антон ЛА-22мп</p>
        <div>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getCurrentWeather(e);
              }
            }}
          >
            <input
              className={classes.searchInput}
              placeholder="enter your city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className={classes.btn}
              onClick={(e) => {
                getCurrentWeather(e);
                e.preventDefault();
              }}
              type="submit"
            >
              Check
            </button>
          </form>
        </div>
        <div>
          {city ? (
            temp && (
              <div>
                <h4 className={classes.title}>
                  Current Temperature in <span> {city} </span>
                </h4>
                <p className={classes.temperature}>{Math.round(temp)}°C</p>
                <p className={classes.title}>Humidity: {humidity}</p>
                <p className={classes.title}> Description: {description}</p>
              </div>
            )
          ) : (
            <h4 className={classes.titleEnterCity}>Please enter the city</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
