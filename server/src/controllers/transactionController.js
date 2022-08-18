import { Code, ObjectId } from "mongodb";
import Codes from "utilities/codes";
import Transaction from "models/transaction";
import UserController from "./userController";

export default class AdminTransactionController {
  static async setCollection(db) {
    return db.collection("transaction");
  }

  static async list(req, res) {
    try {
      const collection = await AdminTransactionController.setCollection(
        req.database
      );

      const result = await collection.findAll();

      return res.json({
        ...Codes.get(200),
        data: {
          result,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }

  static async list(req, res) {
    var transactions;
    if (typeof req.query.id !== "undefined") {
      transactions = this.listUser(req.query.id);
    } else {
      transactions = this.listAll();
    }
  }

  static async listUser(id) {
    // User: Lista todas as transações onde ele é origem ou destino
    // find({$or: [{origin: originId}, {destiny: destinyId}]}).sort({date: -1})
    console.log("Cheguei no listUser");
  }

  static async listAll() {
    // Admin: Lista todas as transações
    // findAll().sort({date: -1})
    console.log("Cheguei no listAll");
  }

  static async insert(req, res) {
    try {
      const collection = await TransactionController.setCollection(
        req.database
      );

      const transaction = new Transaction(req.body);

      const collectionUser = await UserController.setCollection(req.database);

      // To Do: Consultar usuário que está realizando a transferencia e retornar
      // erro caso user.balance < transaction.value

      const user = req.auth;

      if (user.balance < transaction.value)
        return res.status(400).json({
          ...Codes.get(400),
          message: "Balance must be greater than value",
        });

      const origin = await collectionUser.findOneAndUpdate(
        { _id: ObjectId(user._id) },
        { $inc: { balance: -transaction.value } }
      );

      const destiny = await collectionUser.findOneAndUpdate(
        { _id: ObjectId(transaction.destiny) },
        { $inc: { balance: transaction.value } }
      );

      const result = await collection.insertOne(transaction);

      return res.json({
        ...Codes.get(200),
        data: {
          ...transaction,
          _id: result.insertId,
        },
        user: origin,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }
}
