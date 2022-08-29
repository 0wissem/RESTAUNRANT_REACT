import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState("");

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("user"));
  //   setUser(userInfo.userLogin.username);
  // }, []);

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
          <div className="dropdown  me-3 mt-1">
            <button
              className="btn btn-dark dropdown-toggle"
              href="#"
              type="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                4+
              </span>
            </button>

            <div
              className="dropdown-menu "
              aria-labelledby="dropdownMenuLink"
              style={{ right: 0, left: "auto", width: 400 }}
            >
              <div className="d-flex bd-highlight m-1 ">
                <div className="ms-auto p-1 bd-highlight">
                  <button
                    type="button"
                    className="btn-close "
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <hr />
              <div className="Scroll">
                <div className=" mb-2 px-3 py-2">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={"/uploads/a.jpg"}
                        className="img-fluid rounded"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8 px-3">
                      <div>
                        <h4 className="text-primary">Pizza</h4>
                        <p>12 $</p>
                        <div className="mt-0 row">
                          <label
                            htmlFor="inputQuantity"
                            className="col-sm-4 col-form-label"
                          >
                            Quantity:
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="number"
                              className="form-control w-50"
                              id="inputQuantity"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div className=" mb-2 px-3 py-2">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={"/uploads/a.jpg"}
                        className="img-fluid rounded"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8 px-3">
                      <div>
                        <h4 className="text-primary">Pizza</h4>
                        <p>12 $</p>
                        <div className="mt-0 row">
                          <label
                            htmlFor="inputQuantity"
                            className="col-sm-4 col-form-label"
                          >
                            Quantity:
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="number"
                              className="form-control w-50"
                              id="inputQuantity"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>{" "}
                <div className=" mb-2 px-3 py-2">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={"/uploads/a.jpg"}
                        className="img-fluid rounded"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8 px-3">
                      <div>
                        <h4 className="text-primary">Pizza</h4>
                        <p>12 $</p>
                        <div className="mt-0 row">
                          <label
                            htmlFor="inputQuantity"
                            className="col-sm-4 col-form-label"
                          >
                            Quantity:
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="number"
                              className="form-control w-50"
                              id="inputQuantity"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>{" "}
                <div className=" mb-2 px-3 py-2">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={"/uploads/a.jpg"}
                        className="img-fluid rounded"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8 px-3">
                      <div>
                        <h4 className="text-primary">Pizza</h4>
                        <p>12 $</p>
                        <div className="mt-0 row">
                          <label
                            htmlFor="inputQuantity"
                            className="col-sm-4 col-form-label"
                          >
                            Quantity:
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="number"
                              className="form-control w-50"
                              id="inputQuantity"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
              </div>
            </div>
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
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
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
