import { useState } from "react";

const Image = ({ iconId }) => {
  if (iconId) {
    return (
      <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt="" />
    );
  }
};

const Weather = (props) => {
  const [temp, setTemp] = useState("");
  const [iconId, setIconId] = useState(null);
  const [wind, setWind] = useState("");
  const { data } = props;

  const temperatureConverter = (valNum) => {
    valNum = parseFloat(valNum);
    return "temperature: " + (valNum - 273.15).toFixed(2) + " C";
  };

  data.then((data) => {
    setTemp(data.main.temp);
    setWind(data.wind.speed);
    setIconId(data.weather[0].icon);
  });

  return (
    <div>
      <p>{temperatureConverter(temp)}</p>
      <Image iconId={iconId}></Image>
      <p>wind: {wind} m/s</p>
    </div>
  );
};

export default Weather;
