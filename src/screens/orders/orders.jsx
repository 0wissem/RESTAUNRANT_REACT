import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import customAxios from "../../services/customAxios";
import { ORDER_STATE } from "../../constants/models";
import { useCallback } from "react";
import { useSelector } from "react-redux";
const Orders = () => {
  const { user } = useSelector((state) => state);

  //orders
  const [orders, setOrders] = useState([]);
  //order by id
  const [orderById, setorderById] = useState([]);
  // recipes of order
  const [recipes, setRecipes] = useState([]);
  // show Modal: detail order
  const [show, setShow] = useState(false);
  // show Modal: edit order
  const [showEdit, setShowEdit] = useState(false);
  // close Modal: detail order
  const handleClose = () => setShow(false);
  // close Modal: edit order
  const handleCloseEdit = () => setShowEdit(false);
  // edit recipe
  const [editFormData, setEditFormData] = useState({ recipe: "" });
  // get recipe by id
  const [editrecipeId, setEditrecipeId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await customAxios.get("order/");
      console.log(data);
      if (data) setOrders(data);
    };
    fetchOrders();
  }, []);

  //show modal : detail recipe
  const handleShow = (order_number) => {
    setShow(true);
    let orderById = orders.find(
      (order) => order.order_number === order_number.order_number
    );
    setorderById(orderById);
  };

  //show modal: edit recipe
  const handleShowEdit = (order_number) => {
    setShowEdit(true);
    let orderById = orders.find(
      (order) => order.order_number === order_number.order_number
    );
    setorderById(orderById);

    const data = orderById.recipes?.map((recipe) => recipe);
    setRecipes(data);
  };

  //change state of order
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //get recipe for edit
  const handleEditClick = (event, recipe) => {
    event.preventDefault();
    setEditrecipeId(recipe._id);

    const formValues = {
      recipe_name: recipe.recipe_name,
      price: recipe.price,
      quantity: recipe.quantity,
    };
    setEditFormData(formValues);
  };

  //submit edit recipe
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedrecipe = {
      _id: editrecipeId,
      recipe_name: editFormData.recipe_name,

      price: editFormData.price,
      quantity: editFormData.quantity,
    };

    const newrecipes = [...recipes];

    const index = recipes.findIndex((recipe) => recipe._id === editrecipeId);

    newrecipes[index] = editedrecipe;

    setRecipes(newrecipes);
    console.log(newrecipes);
    setEditrecipeId(null);
  };

  //click cancel button: cancel edit recipe
  const handleCancelClick = () => {
    setEditrecipeId(null);
  };

  //click delete button: delete recipe
  const handleDeleteClick = (recipeId) => {
    const newRecipes = [...recipes];
    const index = orderById.recipes.findIndex(
      (recipe) => recipe._id === recipeId
    );
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);

    console.log(orderById);
  };

  const renderOrderActions = (order) => {
    const btnClassName =
      order.status === ORDER_STATE.PENDING
        ? "fa-solid fa-kitchen-set" // show action is cooking
        : order.status === ORDER_STATE.READY
        ? "fa-solid fa-truck"
        : ""; //show action Got PAID & delivered
    const onUpdateOrder = async () => {
      const payload = {
        status:
          order.status === ORDER_STATE.PENDING
            ? ORDER_STATE.READY
            : order.status === ORDER_STATE.READY
            ? ORDER_STATE.SERVED
            : null,
      };
      if (!payload.status) {
        alert("Order is already Served!");
        return;
      }
      const data = await customAxios.put(`order/edit/${order._id}`, payload);
      if (data) {
        setOrders((prev) => {
          const curr = [...prev];
          const index = prev.findIndex((e) => e._id === data._id);
          curr[index] = data;
          return curr;
        });
      } else if (data.error) {
        alert(typeof data.error === "string" ? data.error : "error");
      }
    };
    if (order.status !== ORDER_STATE.SERVED)
      return (
        <button className={`btn btn-dark  text-center`} onClick={onUpdateOrder}>
          <i className={`${btnClassName}  text-light`}></i>
        </button>
      );
    return null;
  };
  return (
    <div>
      <h2>
        <i className="fa fa-list me-3"></i>List of Orders
      </h2>

      <div className="line "></div>

      <div className="row justify-content-center">
        <div>
          <table className="table  align-middle table-striped">
            <thead>
              <tr>
                <th> Order</th>
                <th> Recipe</th>
                <th> Timing</th>
                <th> Status</th>
                <th> Actions</th>
                <th> Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, order_number) => (
                <tr key={order.order_number} id={order.order_number}>
                  <td>{order.seq}</td>
                  <td>
                    {order.recipes.map((recipe) => (
                      <h6 key={recipe._id} id={recipe._id}>
                        {recipe.quantity} x {recipe.recipe.name}
                      </h6>
                    ))}
                  </td>

                  <td> {order.date}</td>
                  <td>
                    {order.status === ORDER_STATE.SERVED ? (
                      <span className="badge bg-success">Served</span>
                    ) : order.status === ORDER_STATE.PENDING ? (
                      <span className="badge bg-danger">Pending</span>
                    ) : order.status === ORDER_STATE.READY ? (
                      <span className="badge bg-danger">Ready</span>
                    ) : null}
                  </td>
                  <td>
                    <button
                      className="btn btn-dark  text-center me-2"
                      onClick={() =>
                        handleShow({ order_number: order.order_number })
                      }
                    >
                      <i className="fa fa-eye "></i>
                    </button>

                    <button
                      className="btn btn-warning  text-center me-2"
                      onClick={() =>
                        handleShowEdit({ order_number: order.order_number })
                      }
                    >
                      <i className={`fa fa-edit text-light`}></i>
                    </button>
                    {renderOrderActions(order)}
                  </td>
                  <td>
                    {order?.recipes?.reduce(
                      (prev, curr) => prev + curr.recipe.price * curr.quantity,
                      0
                    ) || "error"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Order N° "{orderById.order_number}" </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="d-flex bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <h4 className=" text "> Total : {orderById.total}$</h4>
              </div>
              <div className="ms-auto p-2 bd-highlight">
                {orderById.etat === true ? (
                  <span className="badge bg-success">Served</span>
                ) : (
                  <span className="badge bg-danger">pending</span>
                )}
              </div>
            </div>

            {orderById.recipes?.map((recipe) => (
              <div
                key={recipe._id}
                className="card floating-card me-2 "
                style={{ width: 235 }}
              >
                <img
                  src={"/uploads/" + recipe.image}
                  className="card-img-top image"
                  alt="..."
                  style={{ height: 150 }}
                />
                <div className="card-body">
                  <h5 className="card-text text-center m-0">
                    {recipe.recipe_name}
                  </h5>
                  <h6 className="card-text text  m-2">
                    Quantity: {recipe.quantity}
                  </h6>
                  <h6 className="card-text text  m-2">
                    Price : {recipe.price}
                  </h6>
                  <h6 className="card-text text  m-2">
                    Total foodItem: {recipe.quantity * recipe.price}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Order N° "{orderById.order_number}" </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="p-2 bd-highlight">
              <h4 className=" text ">Total : {orderById.total}$</h4>
            </div>

            <form onSubmit={handleEditFormSubmit}>
              <Table striped bordered hover size="lg">
                <thead>
                  <tr>
                    <th>Recipe</th>
                    <th width="100">Price</th>
                    <th width="100">Quantity</th>
                    <th>Total foodItem</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map((recipe) => (
                    <Fragment>
                      {editrecipeId === recipe._id ? (
                        <EditableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          recipe={recipe}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Orders;
