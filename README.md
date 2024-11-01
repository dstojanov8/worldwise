# Important Components related to react-router-dom

1. App.jsx - where all the routes are
2. Sidebar.jsx - where <Outlet /> is to render all of the sub routes
3. BackButton.jsx - where BACK button functionality is implemented
4. Map.jsx - where useNavigate hook is used to redirect (also useSearchParams is here used too)
5. City.jsx - where useParams and useSearchParams is used to take ULR parameters
6. PageNav.jsx - where <NavLink /> is used to navigate pages
7. CityItem.jsx - where we use Link as a button to navigate (don't need to use useNavigate). IMPORTANT NOTE: check how cityId and lat + lng is stored in url

For more information search react-router-dom in project

# Other Components

1. Button.jsx
2. Map.module.css - Check to see how css is set with :global(function())
3. PageNav.global.css - Also check to see css and :global
4. Map.jsx - All map functionality (positioning, moving based on selected city,Popup text)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
