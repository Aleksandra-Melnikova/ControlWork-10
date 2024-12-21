import { NavLink, useLocation } from "react-router-dom";
import "./Toolbar.css";
import { useEffect, useState } from "react";

const ToolBar = () => {
  const [show, setShow] = useState<"d-block" | "d-none">("d-block");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/add") {
      setShow("d-none");
    } else {
      setShow("d-block");
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink to="/">
            <span className="navbar-brand mb-0 text-white fs-1">News</span>
          </NavLink>
          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={`nav-link btn button-add text-primary bg-white ${show}`}
                  to="/add"
                >
                  Add new news
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ToolBar;
