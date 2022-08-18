import { ObjectId } from "mongodb";
import Codes from "utilities/codes";
import Transaction from "models/transaction";
import UserController from "./userController";

export default class TransactionController {
  static async setCollection(db) {
    return db.collection("transaction");
  }

  static async list(req, res) {
    // ToDo: Validar role do usuário que fez requisição
    // User: Lista todas as transações onde ele é origem ou destino
    // Admin: Lista todas as transações
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

      const origin = await collectionUser.findOneAndUpdate(
        { _id: ObjectId(transaction.origin) },
        { $inc: { balance: -transaction.value } }
      );

      console.log(origin.value);

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
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }
}
