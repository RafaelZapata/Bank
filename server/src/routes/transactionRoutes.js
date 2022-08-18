import Token from "utilities/token";
import TransactionController from "controllers/transactionController";

export default function UserTransactionRoutes(app) {
  app.get(
    "/transaction/:id",
    Token.authorize,
    Token.admin,
    TransactionController.list
  );
  app.get("/transaction/", Token.authorizeUser, TransactionController.listAll);
  app.post("/transaction", Token.authorizeUser, TransactionController.insert);
}
