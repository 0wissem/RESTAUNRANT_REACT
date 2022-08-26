import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/employee/`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      axios
        .delete(`http://localhost:3001/api/employee/delete/${id}`)
        .then(() => {
          axios
            .get(`http://localhost:3001/api/employee/`)
            .then((response) => {
              setEmployees(response.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h2>
        <i className="fa fa-users me-3"></i>List of Employees
      </h2>

      <div className="line "></div>

      <div className="row justify-content-center">
        <div>
          <div className="d-flex flex-row-reverse ">
            <button className="btn btn-primary mb-5 ">
              <NavLink
                to={"/employee/add"}
                style={{ color: "white" }}
                className="link"
              >
                <i className="fa fa-plus me-2"></i>Add New Employee
              </NavLink>
            </button>
          </div>
          <table className="table  align-middle table-striped">
            <thead>
              <tr>
                <th> Name</th>
                <th> Username</th>
                <th> Email</th>
                <th> Phone</th>
                <th> Hire Date</th>

                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} id={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.username}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{new Date(employee.hireDate).toLocaleDateString()}</td>

                  <td>
                    <button className="btn btn-warning me-3">
                      <NavLink
                        to={"/employee/edit/" + employee._id}
                        style={{ color: "white" }}
                      >
                        <i className="fa fa-edit"></i>
                      </NavLink>
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteHandler(employee._id);
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
export default Employees;
