import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// import * as api from "./services/TransactionService";

Modal.setAppElement("#root");

export default function ModalAddTransaction({ onSave, onClose }) {
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionType, setTransactionType] = useState("+");
  const [transactionYearMonthDay, setTransactionYearMonthDay] = useState(new Date());

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(transactionValue);
    const formData = {
      action: "insert",
      description: transactionDescription,
      category: transactionCategory,
      value: +transactionValue,
      year: +format(transactionYearMonthDay, "yyyy"),
      month: +format(transactionYearMonthDay, "MM"),
      day: +format(transactionYearMonthDay, "dd"),
      yearMonth: format(transactionYearMonthDay, "yyyy-MM"),
      yearMonthDay: format(transactionYearMonthDay, "yyyy-MM-dd"),
      type: transactionType,
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

  const handleType = (event) => {
    setTransactionType(event.target.value);
  };
  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Inserção de lançamento</span>
          <button className="waves-effect waves-lights btn red dark-4" onClick={handleModalClose}>
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={styles.flexRowRadio}>
            <p>
              <label style={styles.radio}>
                <input name="type" type="radio" value="-" onChange={handleType} />
                <span>Despesa</span>
              </label>
            </p>
            <p>
              <label style={styles.radio}>
                <input name="type" type="radio" value="+" onChange={handleType} />
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
                step="0.01"
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
                selected={transactionYearMonthDay}
                onChange={(date) => setTransactionYearMonthDay(date)}
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
