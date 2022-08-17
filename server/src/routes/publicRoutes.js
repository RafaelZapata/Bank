import Public from "controllers/public";

export default function RublicRoutes(app) {
  app.get("/", Public.home);
  app.get("*", Public.notFound);
}
