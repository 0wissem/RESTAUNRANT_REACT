import React from "react";
import { NavLink } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ name = "", id, image, describe }) {
  return (
    <div className="card me-5 floating-card " style={{ width: 300 }}>
      <img src={"/uploads/" + image} className="card-img-top image" alt="..." />
      <div className="card-body">
        <h4 className="card-title text-center ">{name}</h4>
        <div className="card-text text" style={{ height: 50 }}>
          {!!describe && <p>{describe.substr(0, 30)}...</p>}
        </div>
        <br />
        <div className="row">
          <div className="col-4">
            <button
              className="btn btn-dark w-100 text-center"
              // onClick={() => handleShow({ id: recipe._id })}
            >
              <i className="fa fa-eye "></i>
            </button>
          </div>

          <div className="col-4">
            <button className="btn btn-warning w-100  text-center">
              <NavLink
                className="link"
                to={"/recipe/edit/" + id}
                style={{ color: "white" }}
              >
                <i className="fa fa-edit "></i>
              </NavLink>
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-danger w-100  text-center"
              //   onClick={() => {
              //     deleteHandler(recipe._id);
              //   }}
            >
              <i className="fa fa-trash "></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
