import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import * as api from "./services/TransactionService";
import Spinner from "./components/Spinner";
import Statistics from "./components/Statistics";
import TransactionsControl from "./components/TransactionsControl";
import Select from "./components/Select";

export default function App() {
  const now = format(new Date(), "yyyy-MM");
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectTransaction, setSelectTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState(now);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAll(period);
      setTimeout(() => {
        setAllTransactions(transactions);
      }, 2000);
    };

    getTransactions();
  }, [period]);

  const handlePeriod = (selectedPeriod) => {
    if (selectedPeriod !== period) {
      setAllTransactions([]);
      setPeriod(selectedPeriod);
    }
  };

  const handleDelete = (_id) => {
    console.log("handleDelete" + _id);
  };

  const handlePersist = (_id) => {
    console.log("handlePersist");
  };

  return (
    <div className="container center">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <h2>Controle Financeiro Pessoal</h2>
      <Select onPeriodSelect={handlePeriod} onButtonClick={handlePeriod} />
      <Statistics
        transactions={allTransactions}
        onSelectPeriod={handlePeriod}
        onButtonClick={handlePeriod}
      />
      {allTransactions.length === 0 && <Spinner />}
      {allTransactions.length > 0 && (
        <TransactionsControl
          transactions={allTransactions}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
    </div>
  );
}
