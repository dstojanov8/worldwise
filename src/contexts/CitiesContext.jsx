import { useReducer, useEffect, createContext, useContext } from "react";

const BASE_URL = "http://localhost:8123";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
};

// eslint-disable-next-line react/prop-types
const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, seIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        // seIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(data);
      } catch {
        // alert("There was an error loading data...", err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
      //  finally {
      //   seIsLoading(false);
      // }
    };

    fetchCities();
  }, []);

  const getCity = async (id) => {
    if (id === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      // seIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
      // setCurrentCity(data);
    } catch (err) {
      // alert("There was an error loading data...", err);
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
    //  finally {
    //   seIsLoading(false);
    // }
  };

  const createCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      // seIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
      // setCities((cities) => [...cities, data]);
    } catch (err) {
      // alert("There was an error creating city.", err);
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
    // finally {
    //   seIsLoading(false);
    // }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      // seIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
      // const newCitiesArray = cities.filter((city) => city.id !== id);
      // setCities(newCitiesArray);
    } catch (err) {
      // alert("There was an error deleteing city.", err);
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
    // finally {
    //   seIsLoading(false);
    // }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
