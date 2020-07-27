import React from "react";

export default function Add({ onButtonClick }) {
  const handleClickAdd = () => {};

  return (
    <div className="col s4">
      <button
        className="waves-effect waves-light btn"
        style={{ zIndex: "unset" }}
        onClick={handleClickAdd}
      >
        <i className="material-icons left">add</i>NOVO LANÇAMENTO
      </button>
    </div>
  );
}
