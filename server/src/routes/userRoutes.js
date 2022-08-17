import UserController from "controllers/UserController";

export default function userRoutes(app) {
  app.get("/user", UserController.list);
  app.post("/user", UserController.insert);
}
