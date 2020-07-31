import React from "react";

import Action from "./Action";
import { formatMoney } from "../helpers/formatHelpers";

export default function TransactionsControl({ transactions, onDelete, onSelect }) {
  const handleActionClick = (_id, type) => {
    if (type === "delete") {
      onDelete(_id);
    }
    if (type === "edit") {
      onSelect(_id);
    }
  };

  return (
    <div>
      {transactions.map(({ _id, description, category, value, day, type }) => {
        return (
          <div
            className="row"
            key={_id}
            style={{
              backgroundColor: type === "+" ? "#43A69B" : "#ef9a9a",
              paddingTop: 10,
              paddingBottom: 10,
              marginBottom: 10,
              textAlign: "left",
            }}
          >
            <div className="col m1" style={{ marginTop: 10, fontSize: "1.4rem" }}>
              {day}
            </div>
            <div className="col m6">
              <span style={{ fontWeight: "bold" }}>{category}</span>
              <br />
              <span>{description}</span>
            </div>
            <div className="col m3" style={{ marginTop: 10, fontSize: "1.4rem" }}>
              {formatMoney(value)}
            </div>
            <div>
              <div className="col m2">
                <Action id={_id} onActionClick={handleActionClick} type="edit" />
                <Action id={_id} onActionClick={handleActionClick} type="delete" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
