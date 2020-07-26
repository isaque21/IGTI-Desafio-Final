const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require("../models/TransactionModel.js");

const create = async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);
    await transaction.save();
    res.send({ action: true });
  } catch (error) {
    res
      .status(500)
      .send({ action: false, message: error.message || "Algum erro ocorreu ao salvar" });
  }
};

const findAll = async (req, res) => {
  const description = req.query.description;
  const period = req.query.period;
  const category = req.query.category;

  //   condicao para o filtro no findAll
  var condition = description
    ? {
        description: {
          $regex: new RegExp(description),
          $options: "i",
          $and: { yearMonth: period },
        },
      }
    : { yearMonth: period };

  try {
    const transaction = await TransactionModel.find(condition);
    res.send({ action: true, transactions: transaction });
  } catch (error) {
    res
      .status(500)
      .send({ action: false, message: error.message || "Erro ao listar todos os documentos" });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findOne({ _id: id });
    res.send({ action: true, transactions: transaction });
  } catch (error) {
    res.status(500).send({ action: false, message: "Erro ao buscar a transação id: " + id });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ action: false, message: "Dados para atualizacao vazio" });
  }

  const id = req.params.id;

  try {
    const {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    } = req.body;

    const transaction = await TransactionModel.findOne({ _id: id });

    transaction.description = description;
    transaction.value = value;
    transaction.category = category;
    transaction.year = year;
    transaction.month = month;
    transaction.day = day;
    transaction.yearMonth = yearMonth;
    transaction.yearMonthDay = yearMonthDay;
    transaction.type = type;

    await transaction.save();

    res.send({ action: true, message: "Transação atualizado com sucesso" });
  } catch (error) {
    res.status(500).send({ action: false, message: "Erro ao atualizar a transação id: " + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await TransactionModel.deleteOne({ _id: id });
    res.send({ action: true, message: "Transação excluido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send({ action: false, message: "Nao foi possivel deletar a transação id: " + id });
  }
};

const removeAll = async (req, res) => {
  try {
    await TransactionModel.deleteMany();

    res.send({
      action: true,
      message: `Transações excluídas com sucesso`,
    });
  } catch (error) {
    res.status(500).send({ action: false, message: "Erro ao excluir todos as transações" });
  }
};

module.exports = { create, findAll, findOne, update, remove, removeAll };
