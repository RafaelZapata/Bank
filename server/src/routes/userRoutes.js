import Token from "utilities/token";
import UserController from "controllers/userController";

export default function UserRoutes(app) {
  app.get("/user/:id", Token.authorizeUser, UserController.get);
  app.post("/user", UserController.insert);
}
