import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import countriesService from "./services/countries";
import DisplayCountries from "./components/DisplayCountries";

function App() {
  const [filter, setfilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  const handleFilterChange = (event) => {
    setfilter(event.target.value);
  };

  return (
    <div>
      <SearchInput
        filter={filter}
        handleFilterChange={handleFilterChange}
      ></SearchInput>
      <p>{}</p>
      <DisplayCountries
        filter={filter}
        countries={countries}
        setFilter={setfilter}
      ></DisplayCountries>
    </div>
  );
}

export default App;
