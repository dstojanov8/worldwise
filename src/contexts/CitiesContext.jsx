import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:8123";

const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, seIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        seIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        alert("There was an error", err);
      } finally {
        seIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      seIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (err) {
      alert("There was an error loading data...", err);
    } finally {
      seIsLoading(false);
    }
  };

  const createCity = async (newCity) => {
    console.log(newCity);
    try {
      seIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert("There was an error creating city.", err);
    } finally {
      seIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      seIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const newCitiesArray = cities.filter((city) => city.id !== id);
      setCities(newCitiesArray);
    } catch (err) {
      alert("There was an error deleteing city.", err);
    } finally {
      seIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outisde the CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };
