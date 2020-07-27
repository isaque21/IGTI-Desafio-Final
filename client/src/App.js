import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import * as api from "./services/TransactionService";
import Spinner from "./components/Spinner";
import Statistics from "./components/Statistics";
import TransactionsControl from "./components/TransactionsControl";
import Select from "./components/Select";
import Add from "./components/Add";
import Filter from "./components/Filter";
import ModalTransaction from "./components/ModalTransaction";

export default function App() {
  const now = format(new Date(), "yyyy-MM");
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState(now);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAll(period);
      setTimeout(() => {
        setAllTransactions(transactions);
      }, 2000);
    };

    getTransactions();
  }, [period, spinner]);

  const handlePeriod = (selectedPeriod) => {
    if (selectedPeriod !== period) {
      setAllTransactions([]);
      setPeriod(selectedPeriod);
    }
  };

  const handleDelete = async (_id) => {
    const isDeleted = await api.remove(_id);
    if (isDeleted.data.action) {
      setSpinner((prevState) => !prevState);
      setAllTransactions([]);
    }
  };

  const handlePersist = (_id) => {
    const filterTransaction = allTransactions.find((transaction) => transaction._id === _id);

    setSelectedTransaction(filterTransaction);
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const isUpdated = await api.update(formData.id, formData);
    if (isUpdated.data.action) {
      setSpinner((prevState) => !prevState);
      setAllTransactions([]);
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container center">
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <h2>Controle Financeiro Pessoal</h2>
      <div className="row">
        <Select onPeriodSelect={handlePeriod} onButtonClick={handlePeriod} />
      </div>
      <div className="row">
        <Statistics
          transactions={allTransactions}
          onSelectPeriod={handlePeriod}
          onButtonClick={handlePeriod}
        />
      </div>
      <div className="row">
        <Add onButtonClick={handlePersist} />

        <Filter />
      </div>
      <div className="row">
        {allTransactions.length === 0 && <Spinner />}
        {allTransactions.length > 0 && (
          <TransactionsControl
            transactions={allTransactions}
            onDelete={handleDelete}
            onPersist={handlePersist}
          />
        )}
      </div>
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
