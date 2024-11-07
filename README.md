# App Overview

This project is an exercise for creating a frontend React app. For backend `json-server` was installed and a file `cities.json` is used for reading and writing data. One of the main subjects of this app was using `react-router-dom` for routing between pages. Below I listed some of the components that utilize `react-router-dom` and its components/hooks. In this app we are using **React Context API** for managing global state. In order to remove prop drilling and to move all _fetching_ and _state_ logic into one place we created a **Context** file `CitiesContext.json`. In this file we have simple CRUD operations (GET, POST, DELETE) where we are calling the endpoints exposed by our `json-server` and manage our data. All global state is also in this file and is managed by `useReducer` hook.

Main app functionality is in the **Sidebar** and the **Map**. In the sidebar there are a couple of views all managed by `react-router-dom`. By using the URL of the page we are displaying different components in our `<Outlet />`(Located in our **Sidebar**). There are the CityList, City, CountryList and Form views. When clicking on map we receive the position (lat, lng) and we fetch information on the location (city name, country ...). We are redirected to our Form view and display the city name or locality information in our form. We are using a _DatePicker_ component from `react-datepicker` library. With all the data in place we are submitting the data to our json-server api where we are writing new information. All function responsible for fetching and adding cities are in CitiesContext.jsx file.

# Important Components related to react-router-dom

1. App.jsx - where all the routes are
2. Sidebar.jsx - where <Outlet /> is to render all of the sub routes
3. BackButton.jsx - where BACK button functionality is implemented
4. Map.jsx - where useNavigate hook is used to redirect (also useSearchParams is here used too)
5. City.jsx (useUrlPosition.js) - where useParams and useSearchParams is used to take ULR parameters
6. PageNav.jsx - where <NavLink /> is used to navigate pages
7. CityItem.jsx - where we use Link as a button to navigate (don't need to use useNavigate). IMPORTANT NOTE: check how cityId and lat + lng is stored in url

For more information search react-router-dom in project

# Other Components

1. Button.jsx
2. Map.module.css - Check to see how css is set with :global(function())
3. PageNav.global.css - Also check to see css and :global
4. Map.jsx - All map functionality (positioning, moving based on selected city,Popup text).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
