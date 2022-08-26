import React, { useState } from "react";
import axios from "axios";
const AddEmployee = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [role, setRole] = useState("");

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
      role,
    });

    const employee = {
      name,
      username,
      password,
      email,
      address,
      phoneNumber,
      role,
    };

    await axios
      .post("http://localhost:3001/api/employee/add", employee)
      .then((res) => {
        console.log(res.data);
        window.location = "/employees";
      });
  };

  return (
    <div>
      <h2>
        <i className="fa fa-user me-3"></i>Create Employee
      </h2>

      <div className="line"></div>

      <div className="form-group row mb-2 mx-2">
        <label htmlFor="formName" className="col-sm-2">
          Role *
        </label>
        <div className="col-sm-8">
          <select
            required
            defaultValue="select"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="select"> </option>
            <option name="role" value="Admin">
              Admin
            </option>
            <option name="role" value="Chef">
              Chef
            </option>
            <option name="role" value="Server">
              Server
            </option>
            <option name="role" value="Client">
              Client
            </option>
          </select>
        </div>
      </div>

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

      <div className="d-flex flex-row-reverse col-sm-10 ">
        <button
          type="submit"
          onClick={(event) => handleSubmit(event)}
          className="btn btn-primary  rounded-pill"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
