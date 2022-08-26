import React, { useState } from "react";
import axios from "axios";
import { emailValidator, passwordValidator } from "../components/validator";
import { useDispatch, useSelector } from "react-redux";
import { login, onlogin } from "../store/slices/userSlice";
import { useNavigate } from "react-router";
import { Audio } from "react-loader-spinner";

const Login = () => {
  const [pending, error] = useSelector((state) => [
    state.user.pending,
    state.user.error,
  ]);
  const dispatch = useDispatch();
  //useState
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState();
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [_error, setError] = useState("");
  let navigate = useNavigate();
  //handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      password,
      email,
    };
    if (emailValidator(email) === "" && passwordValidator(password) === "") {
      setEmailErr("");
      setPasswordErr("");
      await dispatch(login({ user, navigate }));
    } else {
      setError("");
      emailValidator(email)
        ? setEmailErr(emailValidator(email))
        : setEmailErr("");

      passwordValidator(password)
        ? setPasswordErr(passwordValidator(password))
        : setPasswordErr("");
    }

    // if (emailValidator(email) === "" && passwordValidator(password) === "") {
    //   setEmailErr("");
    //   setPasswordErr("");
    //   await axios
    //     .post(`http://localhost:3001/api/employee/login`, user)
    //     .then((res) => {
    //       console.log(res.data);
    //       setUser(res.data);
    //       // store the user in localStorage
    //       localStorage.setItem("user", JSON.stringify(res.data));
    //       const userInfo = JSON.parse(localStorage.getItem("user"));

    //       if (userInfo.userLogin.role === "Chef") window.location = "/chef/";
    //       else if (userInfo.userLogin.role === "Admin")
    //         window.location = "/admin/";
    //       else if (userInfo.userLogin.role === "Server")
    //         window.location = "/server/";
    //       else if (userInfo.role === "Client") window.location = "/client/";
    //       else window.location = "/login";
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setError("Verify your email and/or password");
    //     });
    // } else {
    //   setError("");
    //   emailValidator(email)
    //     ? setEmailErr(emailValidator(email))
    //     : setEmailErr("");

    //   passwordValidator(password)
    //     ? setPasswordErr(passwordValidator(password))
    //     : setPasswordErr("");
    // }
  };
  if (pending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: window.innerHeight / 3,
        }}
        className={".justify-content-center"}
      >
        <Audio
          height="80"
          width="80"
          radius="9"
          color="#FFC106"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
  return (
    <div>
      <div className="container-fluid  my-4  ">
        <div className="row d-flex   justify-content-center ">
          <div className=" shadow col-md-4 bg-warning d-flex flex-column align-items-center form justify-content-center ">
            <h1 className="display-6 fw-bolder text-center">
              Welcome to <br /> your restaurant
            </h1>
            <img src="/img/burg.png" alt="" className="w-50" />
          </div>
          <div
            className="shadow col-md-4 p-5 d-flex flex-column "
            style={{ overflow: "hidden" }}
          >
            <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
            <p
              className="text-danger"
              style={{
                fontSize: 16,
              }}
            >
              {_error}
            </p>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p
                  className="text-danger m-0"
                  style={{
                    fontSize: 12,
                  }}
                >
                  {emailErr}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="nope"
                />
                <p
                  className="text-danger m-0 "
                  style={{
                    fontSize: 12,
                  }}
                >
                  {passwordErr}
                </p>
              </div>
              <br />
              <button
                type="submit"
                onClick={(event) => handleSubmit(event)}
                className="btn btn-dark text-warning w-100 py-2 mt-5 rounded-pill"
              >
                <i className="fa-solid fa-arrow-right-to-bracket me-2"></i> Sign
                In
              </button>
            </form>
            <br /> <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
