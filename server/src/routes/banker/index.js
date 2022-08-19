import "express-group-routes";
import BankerTransactionController from "controllers/Banker/BankerTransactionController";
import BankerClientController from "controllers/Banker/BankerClientController";
import Token from "utilities/token";

export default function BankerRoutes(app) {
  app.group("/banker", router => {
    router.use(Token.authorize);
    router.use(Token.admin);

    router.get("/transactions", BankerTransactionController.list);

    router.get("/clients", BankerClientController.list);
    router.patch("/client/:id", BankerClientController.update);
  })
}
