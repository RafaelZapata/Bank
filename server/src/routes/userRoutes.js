import UserController from "controllers/userController";

export default function UserRoutes(app) {
  app.get("/user/:id", UserController.get);
  app.post("/user", UserController.insert);
}
