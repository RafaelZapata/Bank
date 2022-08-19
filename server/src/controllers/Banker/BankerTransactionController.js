import { ObjectId } from "mongodb";
import Codes from "utilities/codes";
import Transaction from "models/Transaction";

const COLLECTION = "transactions";

export default class BankerTransactionController {
  // GET /banker/transactions[?=id]
  static async list(req, res) {
    try {
      const { id } = (req.query || {});
      const collection = await req.database.collection(COLLECTION);
      let data = [];

      if (typeof id === "undefined") {
        data = await collection.find().sort({ date: -1 }).toArray();
      } else {
        data = await collection.find({
          $or: [{ origin: ObjectId(id) }, { destiny: ObjectId(id) }]
        }).sort({ date: -1 }).toArray();
      }

      return res.json({
        ...Codes.get(200),
        data: data.map(item => new Transaction(item))
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }
}
