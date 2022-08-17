import "dotenv/config";
import express from "express";

import applyRoutes from "routes";
import connectDB from "utilities/database";

const app = express();
const port = 7002;

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    req.database = await connectDB();
    next();
  } catch (e) {
    console.log(e);
    next();
  }
});

applyRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
