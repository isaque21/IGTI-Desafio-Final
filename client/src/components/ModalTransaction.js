import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// import * as api from "./services/TransactionService";

Modal.setAppElement("#root");

export default function ModalTransaction({ onSave, onClose, selectedTransaction }) {
  const { _id, description, category, value, yearMonthDay, type } = selectedTransaction;

  const [transactionDescription, setTransactionDescription] = useState(description);
  const [transactionCategory, setTransactionCategory] = useState(category);
  const [transactionValue, setTransactionValue] = useState(value);
  const [transactionYearMonthDay, setTransactionYearMonthDay] = useState(yearMonthDay);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const stringToDate = (date) => {
    return parse(date, "yyyy-MM-dd", new Date());
  };

  const dateToString = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id: _id,
      description: transactionDescription,
      category: transactionCategory,
      value: +transactionValue,
      year: +format(stringToDate(transactionYearMonthDay), "yyyy"),
      month: +format(stringToDate(transactionYearMonthDay), "MM"),
      day: +format(stringToDate(transactionYearMonthDay), "dd"),
      yearMonth: format(stringToDate(transactionYearMonthDay), "yyyy-MM"),
      yearMonthDay: transactionYearMonthDay,
      type: type,
    };
    onSave(formData);
  };
  const handleModalClose = () => {
    onClose(null);
  };
  const handleDescription = (event) => {
    setTransactionDescription(event.target.value);
  };
  const handleCategory = (event) => {
    setTransactionCategory(event.target.value);
  };
  const handleValue = (event) => {
    setTransactionValue(event.target.value);
  };
  const handleDate = (event) => {
    setTransactionYearMonthDay(dateToString(event));
  };
  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Edição de lançamento</span>
          <button className="waves-effect waves-lights btn red dark-4" onClick={handleModalClose}>
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={styles.flexRowRadio}>
            <p>
              <label style={styles.radio}>
                <input
                  name="type"
                  type="radio"
                  checked={type === "-" && "checked"}
                  disabled="disabled"
                />
                <span>Despesa</span>
              </label>
            </p>
            <p>
              <label style={styles.radio}>
                <input
                  name="type"
                  type="radio"
                  checked={type === "+" && "checked"}
                  disabled="disabled"
                />
                <span>Receita</span>
              </label>
            </p>
          </div>
          <div className="input-field">
            <input
              id="inputDescription"
              type="text"
              value={transactionDescription}
              onChange={handleDescription}
            />
            <label className="active" htmlFor="inputDescription">
              Descrição:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputCategory"
              type="text"
              value={transactionCategory}
              onChange={handleCategory}
            />
            <label className="active" htmlFor="inputCategory">
              Categoria:
            </label>
          </div>
          <div className="row">
            <div className="input-field col s8">
              <input
                id="inputValue"
                type="number"
                min="1"
                value={transactionValue}
                onChange={handleValue}
              />
              <label className="active" htmlFor="inputValue">
                Valor:
              </label>
            </div>
            <div className="input-field col s4">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={stringToDate(transactionYearMonthDay)}
                onChange={handleDate}
              />
            </div>
          </div>
          <button className="waves-effect waves-lights btn">Salvar</button>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  flexRowRadio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginBottom: "30px",
  },
  radio: {
    marginRight: "30px",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
};
