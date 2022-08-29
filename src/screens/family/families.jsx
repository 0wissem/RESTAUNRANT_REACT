import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Family = () => {
  const [family, setFamily] = useState([]);

  const [show, setShow] = useState(false);
  const [familyById, setfamilyById] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    console.log({ id });
    axios
      .get("http://localhost:3001/api/family/" + id.id)
      .then((response) => {
        setfamilyById(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/family/`)
      .then((response) => {
        setFamily(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      axios
        .delete(`http://localhost:3001/api/family/delete/${id}`)
        .then(() => {
          axios
            .get(`http://localhost:3001/api/family/`)
            .then((response) => {
              setFamily(response.data);
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
        <i className="fas fa-clipboard me-3"></i>List of Families
      </h2>

      <div className="line "></div>

      <div className="row justify-content-center">
        <div>
          <div className="d-flex flex-row-reverse ">
            <button className="btn btn-primary mb-5 ">
              <NavLink
                to={"/family/add"}
                style={{ color: "white" }}
                className="link"
              >
                <i className="fa fa-plus me-2"></i>Add New Family
              </NavLink>
            </button>
          </div>
          {family.map((family) => (
            <div
              className="card me-5 floating-card "
              style={{ width: 300 }}
              key={family._id}
              id={family._id}
            >
              <img
                src={"/uploads/" + family.image}
                className="card-img-top image"
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-title text-center ">{family.name}</h4>
                <div className="card-text text" style={{ height: 50 }}>
                  {!!family.describe && (
                    <p>{family.describe.substr(0, 30)}...</p>
                  )}
                </div>
                <div className="row">
                  <div className="col-4">
                    <button
                      className="btn btn-dark w-100 text-center"
                      onClick={() => handleShow({ id: family._id })}
                    >
                      <i className="fa fa-eye "></i>
                    </button>
                  </div>

                  <div className="col-4">
                    <button className="btn btn-warning w-100  text-center">
                      <NavLink
                        className="link"
                        to={"/family/edit/" + family._id}
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
                        deleteHandler(family._id);
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
          <Modal.Title>Detail of family "{familyById.name}" </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img
              src={"/uploads/" + familyById.image}
              className=" w-100 "
              alt="..."
            />
            <div>
              <p className=" text">{familyById.describe}</p>
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-dark w-100  text-center"
                    onClick={() => {
                      console.log("shop button");
                    }}
                  >
                    <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-danger w-100  text-center"
                    onClick={() => {
                      deleteHandler(familyById._id);
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
export default Family;
