import { ObjectId } from "mongodb";
import Codes from "utilities/codes";
import Transaction from "models/transaction";

const TRANSACTION_COLLECTION = "transactions";
const COLLECTION = "users";
const TYPE = "client";

export default class ClientTransactionController {
  // GET /client/transactions
  static async list(req, res) {
    try {
      const collection = await req.database.collection(TRANSACTION_COLLECTION);
      const clientID = ObjectId(req.auth._id);
      const data = await collection.find({
        $or: [{ origin: clientID }, { destiny: clientID }]
      }).sort({ date: -1 }).toArray();

      return res.json({ ...Codes.get(200), data });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }

  // POST /client/transaction
  static async new(req, res) {
    try {
      const { balance, _id: origin } = req.auth;
      const transactionCollection = await req.database.collection(TRANSACTION_COLLECTION);
      const collection = await req.database.collection(COLLECTION);
      const transaction = new Transaction({ ...req.body, origin });

      if (ObjectId(transaction.destiny) === ObjectId(origin))
        return res.status(400).json({ ...Codes.get(400), message: "Destiny cannot be the same as origin" });

      if (parseFloat(balance) < parseFloat(transaction.value))
        return res.status(400).json({ ...Codes.get(400), message: "You do not have enough balance" });

      const destinyUser = await collection.findOne({ _id: ObjectId(transaction.destiny) });

      if (destinyUser?.role !== "client")
        return res.status(400).json({ ...Codes.get(400), message: "You can only transfer money to another client" });

      const transactionStatus = await transactionCollection.insertOne(transaction);

      if (typeof transactionStatus.insertedId === "undefined")
        return res.status(500).json(Codes.get(500));

      const updatedBalance = req.auth.updateBalance(-transaction.value);

      const originStatus = await collection.updateOne({ _id: ObjectId(origin) }, {
        $set: {
          balance: updatedBalance
        }
      });

      const destinyStatus = await collection.updateOne({
        _id: ObjectId(transaction.destiny),
        role: "client",
      }, {
        $inc: { balance: transaction.value }
      });

      if ([typeof originStatus.modifiedCount, typeof destinyStatus.modifiedCount].includes("undefined"))
        return res.status(500).json(Codes.get(500));

      return res.json({ ...Codes.get(200), balance: updatedBalance });
      return res.json({ a: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }
}
