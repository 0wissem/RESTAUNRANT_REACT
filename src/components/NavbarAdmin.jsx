import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo.userLogin.username);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <button
            type="button"
            id="sidebarCollapse"
            style={{ background: "#f5f5f5" }}
            className="btn"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item active"></li>
            </ul>
          </div>
          <div className="  me-3 mt-1">
            <NavLink to={{ pathname: `/orderClient` }} className="btn btn-dark">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </div>

          <div className="dropdown   ">
            <button
              className="btn btn-dark "
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-solid fa-user me-2"></i> {user}
            </button>
            <div
              className="dropdown-menu "
              aria-labelledby="dropdownMenuButton"
              style={{ right: 0, left: "auto" }}
            >
              <Link className="dropdown-item " to="/">
                <i className="fa-solid fa-user me-2"></i>Profil
              </Link>
              <button
                className="dropdown-item "
                onClick={() => {
                  localStorage.clear();
                  window.location = "/";
                }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>{" "}
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
