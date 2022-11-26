import React from "react";
import "./FamilyCard.css";

export default function FamilyCard({
  name = "",
  id,
  image,
  onClick = () => {},
}) {
  return (
    <div style={{ width: 300 }} key={id} id={id} onClick={onClick}>
      <img src={"/uploads/" + image} className="card-img-top image" alt="..." />
      <h4 className="card-title text-center ">{name}</h4>
    </div>
  );
}
