import TransactionController from "controllers/transactionController";

export default function TransactionRoutes(app) {
  app.get("/transaction", TransactionController.list);
  app.post("/transaction", TransactionController.insert);
}
