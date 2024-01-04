import countriesService from "../services/countries";
import Weather from "./Weather";
const DisplayCountries = (props) => {
  const { countries, filter, setFilter } = props;

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );
  console.log(filtered.length);
  const clickButton = (btn) => {
    setFilter(btn);
  };
  if (filtered.length === 1) {
    return (
      <div>
        {filtered.map((country) => (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <h3>Capital:</h3>
            <p>{country.capital}</p>
            <h3>Area</h3>
            <p>{country.area}</p>
            <h3>Languages:</h3>
            <ul>
              {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt="" />
            <p>Weather in {country.capital}:</p>
            <Weather
              data={countriesService.wheater(
                country.capitalInfo.latlng[0],
                country.capitalInfo.latlng[1],
              )}
            ></Weather>
          </div>
        ))}
      </div>
    );
  } else if (filtered.length <= 10) {
    return (
      <div>
        {filtered.map((country) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}
              <button onClick={() => clickButton(country.name.common)}>
                Show
              </button>
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    return <p>Too many countries</p>;
  }
};

export default DisplayCountries;
