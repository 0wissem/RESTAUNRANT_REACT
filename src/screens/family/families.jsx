import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import FamilyCard from "../../components/FamilyCard/FamilyCard";

const Family = () => {
  const [family, setFamily] = useState([]);
  const [familyId, setfamilyId] = useState(null);

  //const handleClose = () => setShow(false);
  // const handleShow = (id) => {
  //   setShow(true);
  //   console.log({ id });
  //   axios
  //     .get("http://localhost:3001/api/family/" + id.id)
  //     .then((response) => {
  //       setfamilyById(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/family/`)
      .then((response) => {
        setFamily(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure")) {
  //     axios
  //       .delete(`http://localhost:3001/api/family/delete/${id}`)
  //       .then(() => {
  //         axios
  //           .get(`http://localhost:3001/api/family/`)
  //           .then((response) => {
  //             setFamily(response.data);
  //           })
  //           .catch((error) => console.log(error));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

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
            <FamilyCard
              key={family?._id}
              describe={family?.describe || ""}
              id={family?._id}
              image={family?.image}
              name={family?.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Family;
