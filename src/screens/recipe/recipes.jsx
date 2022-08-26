import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  const [show, setShow] = useState(false);
  const [recipeById, setRecipeById] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    console.log({ id });
    axios
      .get("http://localhost:3001/api/recipe/" + id.id)
      .then((response) => {
        setRecipeById(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/recipe/`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      axios
        .delete(`http://localhost:3001/api/recipe/delete/${id}`)
        .then(() => {
          axios
            .get(`http://localhost:3001/api/recipe/`)
            .then((response) => {
              setRecipes(response.data);
              setShow(false);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h2>
        <i className="fas fa-clipboard me-3"></i>List of Recipes
      </h2>

      <div className="line "></div>

      <div className="row justify-content-center">
        <div>
          <div className="d-flex flex-row-reverse ">
            <button className="btn btn-primary mb-5 ">
              <NavLink
                to={"/recipe/add"}
                style={{ color: "white" }}
                className="link"
              >
                <i className="fa fa-plus me-2"></i>Add New Recipe
              </NavLink>
            </button>
          </div>
          {recipes.map((recipe) => (
            <div
              className="card me-5 floating-card "
              style={{ width: 300 }}
              key={recipe._id}
              id={recipe._id}
            >
              <img
                src={"/uploads/" + recipe.image}
                className="card-img-top image"
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-title text-center ">{recipe.name}</h4>
                <div className="card-text text" style={{ height: 50 }}>
                  {!!recipe.describe && (
                    <p>{recipe.describe.substr(0, 30)}...</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-4">
                    <button
                      className="btn btn-dark w-100 text-center"
                      onClick={() => handleShow({ id: recipe._id })}
                    >
                      <i className="fa fa-eye "></i>
                    </button>
                  </div>

                  <div className="col-4">
                    <button className="btn btn-warning w-100  text-center">
                      <NavLink
                        className="link"
                        to={"/recipe/edit/" + recipe._id}
                        style={{ color: "white" }}
                      >
                        <i className="fa fa-edit "></i>
                      </NavLink>
                    </button>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger w-100  text-center"
                      onClick={() => {
                        deleteHandler(recipe._id);
                      }}
                    >
                      <i className="fa fa-trash "></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail of recipe "{recipeById.name}" </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img
              src={"/uploads/" + recipeById.image}
              className=" w-100 "
              alt="..."
            />
            <div>
              <p className=" text">{recipeById.describe}</p>
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-danger w-100  text-center"
                    onClick={() => {
                      deleteHandler(recipeById._id);
                    }}
                  >
                    <i className="fa fa-trash "></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Recipes;
