import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8123";

const App = () => {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* Index route is the default child route that is going to be
              matched if non of the other routes mathc */}

          {/* ex. ...host:5173/app will show <CityList /> component as well as will
              ...host:5173/app/cities, that is because we defined an index route */}

          {/* <Navigate /> component is like a redirect, in this case it will
              redirect to /cities route */}

          {/* ex. NOW ...host:5173/app will redurect to ...host:5173/app/cities since
              we defined <Navigate /> in idex route*/}
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
