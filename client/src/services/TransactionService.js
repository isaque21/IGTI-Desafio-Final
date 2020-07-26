import http from "../http-common";
import Axios from "axios";

async function getAll(period) {
  const res = await Axios.get(`/api/transaction?period=${period}`);

  const transactions = res.data.map((transaction) => {
    const { description, category } = transaction;
    return {
      ...transaction,
      descriptionLowerCase: description.toLowerCase(),
      categoryLowerCase: category.toLowerCase(),
    };
  });
  return transactions;
}

async function get(id) {
  const res = await Axios.get(`/api/transaction/${id}`);
  const transaction = res.data;

  const { description, category } = transaction;
  return {
    ...transaction,
    descriptionLowerCase: description.toLowerCase(),
    categoryLowerCase: category.toLowerCase(),
  };
}

const create = (data) => {
  return http.post("/api/transaction", data);
};

const update = (id, data) => {
  return http.put(`/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

const removeAll = () => {
  return http.delete(`/api/transaction`);
};

const findByDescription = (description) => {
  return http.get(`/api/transaction?name=${description}`);
};

export { getAll, get, create, update, remove, removeAll, findByDescription };
