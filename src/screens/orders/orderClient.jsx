import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const OrderClient = () => {
  const [orders, setOrders] = useState([]);

  const [show, setShow] = useState(false);
  const [numberCar, setNumberCar] = useState("");
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("detailsOrder"));
    console.log(orders);

    if (orders) {
      setOrders(orders);
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      numberCar,
    });

    const client = {
      numberCar,
    };

    await axios
      .post("http://localhost:3001/api/client/add", client)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <h2>
        <i className="fas fa-clipboard me-3"></i>List of Orders
      </h2>
      <div className="line "></div>

      <div className="row justify-content-center">
        <div className="d-flex flex-row-reverse ">
          <button className="btn btn-success mb-5 " onClick={handleShow}>
            <i className="fa-solid fa-floppy-disk me-2"></i>Save
          </button>
        </div>
        <div>
          <table className="table  align-middle ">
            <thead>
              <tr>
                <th> Recipe</th>
                <th> Price</th>
                <th> Describe</th>

                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord, index) => (
                <tr key={index} id={ord._id}>
                  <td>
                    <img
                      src={"/uploads/" + ord.recipe.image}
                      className="rounded float-start me-2"
                      width="48"
                      alt="..."
                    />
                    {ord.recipe.name}
                    <br /> <br />
                    {ord.addon.map((add) => (
                      <div key={add}>
                        {add} <button className="btn">X</button>
                      </div>
                    ))}
                  </td>
                  <td>{ord.recipe.price}</td>
                  <td>
                    {!!ord.recipe.describe && (
                      <p>{ord.recipe.describe.substr(0, 45)}...</p>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-dark w-100 text-center">
                      <i className="fa fa-eye "></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Car Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div className="row">
                <div className="mb-3">
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Car Number"
                    required
                    value={numberCar}
                    onChange={(e) => setNumberCar(e.target.value)}
                  />
                </div>
                <div className="mb-3 text-center">
                  <button
                    type="submit"
                    onClick={(event) => handleSubmit(event)}
                    className="btn btn-primary px-5  rounded-pill"
                  >
                    Save Client
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
export default OrderClient;
