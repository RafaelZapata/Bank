import PublicController from "controllers/publicController";

export default function PublicRoutes(app) {
  app.post("/login", PublicController.auth);
  app.get("/", PublicController.home);
  app.get("*", PublicController.notFound);
}
