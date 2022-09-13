import React from "react";
import { NavLink } from "react-router-dom";
import "./FamilyCard.css";

export default function FamilyCard({
  name = "",
  id,
  image,
  onClick = () => {},
}) {
  return (
    <div
      className="card me-5 floating-card "
      style={{ width: 300 }}
      key={id}
      id={id}
    >
      <img src={"/uploads/" + image} className="card-img-top image" alt="..." />
      <h4 className="card-title text-center ">{name}</h4>
    </div>
  );
}
