import userRoutes from "./userRoutes";
import transactionRoutes from "./transactionRoutes";
import publicRoutes from "./publicRoutes";

export default function applyRoutes(app) {
  userRoutes(app);
  transactionRoutes(app);

  publicRoutes(app);
}
