import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
const EditEmployee = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [isManager, setManager] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/employee/" + id)
      .then((res) => {
        setName(res.data.name);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setPhone(res.data.phoneNumber);
        setAdmin(res.data.isAdmin);
        setActive(res.data.isActive);
        setManager(res.data.isManager);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      name,
      username,
      password,
      email,
      address,
      phoneNumber,
      isManager,
      isAdmin,
      isActive,
    });

    const employee = {
      name,
      username,
      password,
      email,
      address,
      phoneNumber,
      isManager,
      isAdmin,
      isActive,
    };

    await axios
      .put(`http://localhost:3001/api/employee/update/${id}`, employee)
      .then((res) => {
        console.log(res.data);
        window.location = "/employees";
      });
  };

  return (
    <div>
      <h2>
        <i className="fa fa-user me-3"></i>Edit Employee
      </h2>

      <div className="line"></div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formName" className="col-sm-2">
          Full Name *
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="formName"
            className="form-control"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formUsername" className="col-sm-2">
          Username *
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="formUsername"
            className="form-control"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formPassword" className="col-sm-2">
          Password *
        </label>
        <div className="col-sm-8">
          <input
            type="password"
            id="formPassword"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formEmail" className="col-sm-2">
          Email *
        </label>
        <div className="col-sm-8">
          <input
            type="email"
            id="formEmail"
            className="form-control"
            placeholder="name@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formAddress" className="col-sm-2">
          Address *
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="formAddress"
            className="form-control"
            placeholder="123 W. Palm Lane"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formPhone" className="col-sm-2">
          Phone Number *
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            id="formPhone"
            className="form-control"
            placeholder="(123) 456 7890"
            required
            pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row  mx-2">
        <label
          htmlFor="formManager"
          className="form-label col-form-label col-sm-2"
        >
          Manager
        </label>
        <div className="col-sm-1">
          <div className="form-check">
            <input
              type="checkbox"
              id="formManager"
              className="form-check-input"
              checked={isManager}
              onChange={(e) => setManager(e.target.checked)}
            />
          </div>
        </div>
      </div>

      <div className="form-group row mx-2">
        <label
          htmlFor="formAdmin"
          className="form-label col-form-label col-sm-2"
        >
          Admin
        </label>
        <div className="col-sm-1">
          <div className="form-check">
            <input
              type="checkbox"
              id="formAdmin"
              className="form-check-input "
              checked={isAdmin}
              onChange={(e) => setAdmin(e.target.checked)}
            />
          </div>
        </div>
      </div>

      <div className="form-group row mx-2">
        <label
          htmlFor="formActive"
          className="form-label col-form-label col-sm-2"
        >
          Active
        </label>
        <div className="col-sm-1">
          <div className="form-check">
            <input
              type="checkbox"
              id="formActive"
              className="form-check-input "
              checked={isActive}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <div className="d-flex flex-row-reverse col-sm-10 ">
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          className="btn btn-primary  rounded-pill"
        >
          Edit Employee
        </button>
      </div>
    </div>
  );
};

export default EditEmployee;
