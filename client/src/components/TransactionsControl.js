import React from "react";

import Action from "./Action";

export default function TransactionsControl({ transactions, onDelete, onPersist }) {
  const handleActionClick = (_id, type) => {
    if (type === "delete") {
      onDelete(_id);
    }
    if (type === "edit") {
      onPersist(_id);
    }
  };

  return (
    <div className="container center">
      <table className="striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ _id, description, category, value, type }) => {
            return (
              <tr key={_id} style={{ backgroundColor: type === "+" ? "#1de9b6" : "#ef9a9a" }}>
                <td>&nbsp;</td>
                <td>
                  <p>{category}</p>
                  <p>{description}</p>
                </td>
                <td>{value}</td>
                <td>
                  <div>
                    <Action id={_id} onActionClick={handleActionClick} type="edit" />
                    <Action id={_id} onActionClick={handleActionClick} type="delete" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
