import React from "react";
import { formatMoney } from "../helpers/formatHelpers";

export default function Statistics({ transactions }) {
  const totalReleases = transactions.length;

  const sumTransactionsValues = (typeTransaction) => {
    const filterRevenue = transactions.filter((transaction) => {
      return transaction.type === typeTransaction;
    });

    const totalRevenue = filterRevenue.reduce((acc, curr) => acc + curr.value, 0);

    return totalRevenue;
  };

  const balance = sumTransactionsValues("+") - sumTransactionsValues("-");

  return (
    <div>
      <div className="col s3">
        <span>Lançamentos: {totalReleases} </span>
      </div>
      <div className="col s3">
        Receitas:
        <span
          style={{
            color: "#43A69B",
          }}
        >
          {formatMoney(sumTransactionsValues("+"))}
        </span>
      </div>
      <div className="col s3">
        Despesas:
        <span
          style={{
            color: "#ef9a9a",
          }}
        >
          {" "}
          {formatMoney(sumTransactionsValues("-"))}
        </span>
      </div>
      <div className="col s3">
        Saldo:{" "}
        <span style={{ color: sumTransactionsValues("+") > 0 ? "#43A69B" : "#ef9a9a" }}>
          {" "}
          {formatMoney(balance)}
        </span>
      </div>
    </div>
  );
}
