import PublicController from "controllers/Public";

export default function PublicRoutes(app) {
  app.post("/auth", PublicController.auth);
  app.get("/", PublicController.home);
  app.get("*", PublicController.notFound);
}
