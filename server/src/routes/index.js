import bankerRoutes from "./banker";
import publicRoutes from "./public";
import clientRoutes from "./client";

export default function applyRoutes(app) {
  bankerRoutes(app);
  clientRoutes(app);

  publicRoutes(app);
}
