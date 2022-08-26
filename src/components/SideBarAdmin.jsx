import React from "react";
import { NavLink } from "react-router-dom";
function SideBar() {
  return (
    <>
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Restaurant</h3>
          <strong>R</strong>
        </div>

        <ul className=" list-unstyled components">
          <li>
            <NavLink to={{ pathname: `/dashboard` }} className=" link">
              <i className="fas fa-home me-1"></i>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to={{ pathname: `/order` }} className="link">
              <i className="fas fa-archive me-1"></i> Orders
            </NavLink>
          </li>

          <li>
            <NavLink to={{ pathname: `/employees` }} className="link">
              <i className="fas fa-users me-1 "></i>
              Employees
            </NavLink>
          </li>

          <li>
            <NavLink to={{ pathname: `/recipe` }} className="link">
              <i className="fas fa-clipboard me-2"></i>
              Recipes
            </NavLink>
          </li>

          <li>
            <NavLink to={{ pathname: `/ingredient` }} className="link">
              <i className="fas fa-list me-2"></i>
              Ingredients
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
