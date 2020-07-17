const express = require("express");
const transaction = require("../services/transactionService.js");
const transactionRouter = express.Router();

transactionRouter.post("/transaction", transaction.create);
transactionRouter.get("/transaction", transaction.findAll);
transactionRouter.get("/transaction/:id", transaction.findOne);
transactionRouter.put("/transaction/:id", transaction.update);
transactionRouter.delete("/transaction/:id", transaction.remove);
transactionRouter.delete("/transaction", transaction.removeAll);

module.exports = transactionRouter;
