import React from "react";

export default function Action({ id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <div className="col s4">
      <span
        className="material-icons"
        onClick={handleIconClick}
        style={{ cursor: "pointer", marginTop: 10 }}
      >
        {type}
      </span>
    </div>
  );
}
