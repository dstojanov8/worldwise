# App Overview

This project is an exercise for creating a frontend React app. For backend `json-server` was installed and a file `cities.json` is used for reading and writing data. One of the main subjects of this app was using `react-router-dom` for routing between pages. Below I listed some of the components that utilize `react-router-dom` and its components/hooks. In this app we are using **React Context API** for managing global state. In order to remove prop drilling and to move all _fetching_ and _state_ logic into one place we created a **Context** file `CitiesContext.json`. In this file we have simple CRUD operations (GET, POST, DELETE) where we are calling the endpoints exposed by our `json-server` and manage our data. All global state is also in this file and is managed by `useReducer` hook.

Main app functionality is in the **Sidebar** and the **Map**. In the sidebar there are a couple of views all managed by `react-router-dom`. By using the URL of the page we are displaying different components in our `<Outlet />`(Located in our **Sidebar**). There are the CityList, City, CountryList and Form views. When clicking on map we receive the position (lat, lng) and we fetch information on the location (city name, country ...). We are redirected to our Form view and display the city name or locality information in our form. We are using a _DatePicker_ component from `react-datepicker` library. With all the data in place we are submitting the data to our json-server api where we are writing new information. All function responsible for fetching and adding cities are in CitiesContext.jsx file.

In the app we do have a fake Authentication system implemented, but the concepts are the same. Authentication is briefly explained below. The **Fake** part of our authentication is in the first step. We will not ask for user credentials from an api, but instead we will have a hardcoded user object in our application.

- We will simply check if the user and password are correct. We will be _storing_ our logged in user in our **state** and we will be storing if the user is logged in or not. This way we can protect our application from unauthorized access.
- We Will create a new Context where we will store that state and give the entire application three access to that state.
- **Logout** functionality is implemented in `User.jsx` file

# Important Components related to react-router-dom

1. `App.jsx` - where all the routes are
2. `Sidebar.jsx` - where <Outlet /> is to render all of the sub routes
3. `BackButton.jsx` - where BACK button functionality is implemented
4. `Map.jsx` - where useNavigate hook is used to redirect (also useSearchParams is here used too)
5. `City.jsx` (useUrlPosition.js) - where useParams and useSearchParams is used to take ULR parameters
6. `PageNav.jsx` - where <NavLink /> is used to navigate pages
7. `CityItem.jsx` - where we use Link as a button to navigate (don't need to use useNavigate). IMPORTANT NOTE: check how cityId and lat + lng is stored in url
8. `Login.jsx` - where we use {replace: true} in our navigate function, important when we have navigate inside an effect (back button wont work)

For more information search react-router-dom in project

# Other Components

1. Button.jsx
2. Map.module.css - Check to see how css is set with :global(function())
3. PageNav.global.css - Also check to see css and :global
4. Map.jsx - All map functionality (positioning, moving based on selected city,Popup text).

# User Authentication usually works in three steps

1. Get user Emai and Password from a login form and check with an api endpoint if the password for the given user is correct.

- In our case we are sending email and password to `AuthContext` and check if the credentials are correct

2. If the credentials are actualy correct we then redirect the user to our main aplication and we save the user object in our state.

- In `Login.jsx` we are redirecting to our app on successfull login (if user is authenticated), also user object is saved in `AuthContext` with isAuthenticated flag

3. We NEED to protect our application from unauthorized access, from users that are not currently logged in.

- `ProtectedRoute.jsx` file is created and it wraps the entire application. In this component we are checking for our _isAuthenticated_ flag. If it is **false** the app redirects to `'/'`, if **true**, user can use the app normally. We are using `ProtectedRoute.jsx` in out `App.jsx` file.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
