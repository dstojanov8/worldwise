import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* Outlet is used to render child routes on /app route
          Here components assigntd to those routes will be rendered */}
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
