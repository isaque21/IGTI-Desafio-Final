import React, { useState, useEffect } from "react";
import { format } from "date-fns";

import * as api from "./services/TransactionService";
import Spinner from "./components/Spinner";
import Statistics from "./components/Statistics";
import TransactionsControl from "./components/TransactionsControl";
import Select from "./components/Select";
import Filter from "./components/Filter";
import ModalEditTransaction from "./components/ModalEditTransaction";
import ModalAddTransaction from "./components/ModalAddTransaction";

export default function App() {
  const now = format(new Date(), "yyyy-MM");
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
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

  const handleFilter = (search) => {
    const filterTransactions = allTransactions.filter((transaction) => {
      return transaction.description.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredTransactions(filterTransactions);
    setSpinner((prevState) => !prevState);
  };

  const handleDelete = async (_id) => {
    const isDeleted = await api.remove(_id);
    if (isDeleted.data.action) {
      setSpinner((prevState) => !prevState);
      setAllTransactions([]);
    }
  };

  const handleInsert = () => {
    setIsModalAddOpen(true);
  };

  const handleSelectTransaction = (_id) => {
    const filterTransaction = allTransactions.find((transaction) => transaction._id === _id);

    setSelectedTransaction(filterTransaction);
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    if (formData.action === "update") {
      const isUpdated = await api.update(formData.id, formData);
      if (isUpdated.data.action) {
        setSpinner((prevState) => !prevState);
        setAllTransactions([]);
      }
      setIsModalOpen(false);
    }

    if (formData.action === "insert") {
      const isInserted = await api.create(formData);
      if (isInserted.data.action) {
        setSpinner((prevState) => !prevState);
        setAllTransactions([]);
      }
      setIsModalAddOpen(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsModalAddOpen(false);
  };

  return (
    <div className="container center">
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Desafio Final do Bootcamp Full Stack</h1>
      <h2 style={{ fontSize: "1.8rem" }}>Controle Financeiro Pessoal</h2>
      <div className="row">
        <Select onPeriodSelect={handlePeriod} onButtonClick={handlePeriod} />
      </div>
      <div className="row">
        <Statistics
          transactions={filteredTransactions.length > 0 ? filteredTransactions : allTransactions}
          onSelectPeriod={handlePeriod}
          onButtonClick={handlePeriod}
        />
      </div>
      <div className="row">
        <div className="col s4">
          <button
            className="waves-effect waves-light btn"
            style={{ zIndex: "unset" }}
            onClick={handleInsert}
          >
            <i className="material-icons left">add</i>NOVO LANÇAMENTO
          </button>
        </div>

        <Filter filter={handleFilter} />
      </div>
      <div className="row">
        {allTransactions.length === 0 && <Spinner />}
        {allTransactions.length > 0 && (
          <TransactionsControl
            transactions={filteredTransactions.length > 0 ? filteredTransactions : allTransactions}
            onDelete={handleDelete}
            onSelect={handleSelectTransaction}
          />
        )}
      </div>
      {isModalOpen && (
        <ModalEditTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
      {isModalAddOpen && <ModalAddTransaction onSave={handlePersistData} onClose={handleClose} />}
    </div>
  );
}
