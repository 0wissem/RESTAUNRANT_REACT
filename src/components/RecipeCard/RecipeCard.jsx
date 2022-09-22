import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./RecipeCard.css";

export default function RecipeCard({ name = "", id, image, describe }) {
  const [recipeById, setRecipeById] = useState([]);

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
    console.log(recipeById);
    let msgArr = JSON.parse(localStorage.getItem("detailsOrder"))
      ? JSON.parse(localStorage.getItem("detailsOrder"))
      : [];
    msgArr.push(recipeById);
    localStorage.setItem("detailsOrder", JSON.stringify(msgArr));
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
              onClick={() => {
                deleteHandler(id);
              }}
            >
              <i className="fa fa-trash "></i>
            </button>
          </div>
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
                <div className="col-6">
                  <button
                    className="btn btn-dark w-100  text-center"
                    onClick={() => shopHandler(recipeById._id)}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
                <div className="col-6">
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
}
