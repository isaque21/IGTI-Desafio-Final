import React from "react";

export default function Action({ id, type, onActionClick }) {
  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <div>
      <span className="material-icons" onClick={handleIconClick} style={{ cursor: "pointer" }}>
        {type}
      </span>
    </div>
  );
}
