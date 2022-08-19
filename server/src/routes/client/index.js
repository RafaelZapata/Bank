import "express-group-routes";
import ClientTransactionController from "controllers/Client/ClientTransactionController";
import ClientController from "controllers/Client/ClientController";
import Token from "utilities/token";

export default function ClientRoutes(app) {
  app.group("/client", router => {
    router.use(Token.authorize);
    router.use(Token.client);

    router.get("/me", ClientController.me);
    router.patch("/", ClientController.update);

    router.get("/transactions", ClientTransactionController.list);
    router.post("/transaction", ClientTransactionController.new);
  })
}
