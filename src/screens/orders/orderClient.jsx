import React, { useState, useEffect } from "react";

const OrderClient = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("detailsOrder"));
    if (orders) {
      setOrders(orders);
    }
  }, []);

  return (
    <div>
      <h2>
        <i className="fas fa-clipboard me-3"></i>List of Orders
      </h2>
      <div className="line "></div>

      <div className="row justify-content-center">
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
              {orders.map((order, index) => (
                <tr key={index} id={order._id}>
                  <td>
                    <img
                      src={"/uploads/" + order.image}
                      className="rounded float-start me-2"
                      width="48"
                      alt="..."
                    />
                    {order.name}
                  </td>
                  <td> {order.price}</td>
                  <td>
                    {!!order.describe && (
                      <p>{order.describe.substr(0, 45)}...</p>
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
    </div>
  );
};
export default OrderClient;
