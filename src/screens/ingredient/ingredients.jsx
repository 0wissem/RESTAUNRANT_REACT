import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/ingredient/`)
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      axios
        .delete(`http://localhost:3001/api/ingredient/delete/${id}`)
        .then(() => {
          axios
            .get(`http://localhost:3001/api/ingredient/`)
            .then((response) => {
              setIngredients(response.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h2>
        <i className="fa fa-list me-3"></i>List of Ingredients
      </h2>

      <div className="line "></div>

      <div className="row justify-content-center">
        <div>
          <div className="d-flex flex-row-reverse ">
            <button className="btn btn-primary mb-5 ">
              <NavLink
                to={"/ingredient/add"}
                style={{ color: "white" }}
                className="link"
              >
                <i className="fa-solid fa-plus me-2"></i>Add New Ingredient
              </NavLink>
            </button>
          </div>
          <table className="table  align-middle table-striped">
            <thead>
              <tr>
                <th> Name</th>
                <th> Price</th>
                <th> Quantity</th>

                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient._id} id={ingredient._id}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.price}</td>
                  <td> {ingredient.quantity}</td>
                  <td>
                    <button className="btn btn-warning me-3">
                      <NavLink
                        to={"/ingredient/edit/" + ingredient._id}
                        style={{ color: "white" }}
                      >
                        <i className="fa fa-edit"></i>
                      </NavLink>
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteHandler(ingredient._id);
                      }}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Ingredients;
