import React from "react";

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
    <div className="container">
      <div className="row">
        <div className="col s3">
          <span>Lançamentos: {totalReleases} </span>
        </div>
        <div className="col s3">
          <span>Receitas: R$ {sumTransactionsValues("+")}</span>
        </div>
        <div className="col s3">
          <span>Despesas: R$ {sumTransactionsValues("-")}</span>
        </div>
        <div className="col s3">
          <span>Saldo: R$ {balance}</span>
        </div>
      </div>
    </div>
  );
}
