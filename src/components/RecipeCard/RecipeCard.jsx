import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./RecipeCard.css";

export default function RecipeCard({ name = "", id, image, describe }) {
  const [recipeById, setRecipeById] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [addon, setAddon] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/ingredient/`)
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //show modal recipe
  const handleShow = (id) => {
    setShow(true);
    console.log({ id });
    axios
      .get("http://localhost:3001/api/recipe/" + id)
      .then((response) => {
        setRecipeById(response.data);
      })
      .catch((error) => console.log(error));
  };

  //delete recipe
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      axios
        .delete(`http://localhost:3001/api/recipe/delete/${id}`)
        .then(() => {
          axios
            .get(`http://localhost:3001/api/recipe/`)
            .then((response) => {
              window.location = "/family";
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  // shop order
  const shopHandler = (id) => {
    console.log("addon" + addon);

    console.log(recipeById);
    let msgArr = JSON.parse(localStorage.getItem("detailsOrder"))
      ? JSON.parse(localStorage.getItem("detailsOrder"))
      : [];
    msgArr.push({ recipe: recipeById, addon: addon });
    localStorage.setItem("detailsOrder", JSON.stringify(msgArr));
    setShow(false);
  };

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
              onClick={() => handleShow(id)}
            >
              <i className="fa-solid fa-cart-shopping "></i>
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
              onClick={() => {
                deleteHandler(id);
              }}
            >
              <i className="fa fa-trash "></i>
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Recipe "{recipeById.name}" </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-row-reverse ">
            <div className="m-2 mb-3">
              <button
                className="btn btn-primary  border-dark me-2"
                onClick={() => shopHandler(recipeById._id)}
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to cart
              </button>

              <button
                className="btn btn-danger "
                onClick={() => {
                  deleteHandler(recipeById._id);
                }}
              >
                <i className="fa fa-trash "></i>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <img
                src={"/uploads/" + recipeById.image}
                className=" w-50 float-start me-2 border border-dark  border-2"
                alt={recipeById.name}
              />

              <h4 className=" text">{recipeById.name}</h4>
              <h5 className=" text text-secondary mt-2 ">
                ${recipeById.price}
              </h5>
            </div>

            <div className="col-4 border">
              <h4 className="text-dark">List Of Addons</h4>
              <div className="form-check">
                {ingredients.map((ingredient) => (
                  <div key={ingredient._id} id={ingredient._id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={ingredient._id}
                      name={ingredient._id}
                      id={ingredient.name}
                      onChange={(e) => setAddon([...addon, e.target.value])}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={ingredient.name}
                    >
                      {ingredient.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mt-3">Description: </h4>
            <p className=" text">{recipeById.describe}</p>
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
}
