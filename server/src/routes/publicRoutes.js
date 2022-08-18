import PublicController from "controllers/publicController";

export default function PublicRoutes(app) {
  app.get("/", PublicController.home);
  app.get("*", PublicController.notFound);
}
