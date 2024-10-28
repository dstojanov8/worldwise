import { useState, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:8123";

const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, seIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        seIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        console.log(data);
        setCities(data);
      } catch (err) {
        alert("There was an error", err);
      } finally {
        seIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
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
