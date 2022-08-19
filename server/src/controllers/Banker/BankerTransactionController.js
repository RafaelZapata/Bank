import { ObjectId } from "mongodb";
import Codes from "utilities/codes";

const COLLECTION = "transaction";

export default class BankerTransactionController {
  // GET /banker/transactions[?=id]
  static async list(req, res) {
    try {
      const { id } = (req.query || {});
      const collection = await req.database.collection(COLLECTION);
      let data = [];

      if (typeof id === "undefined") {
        data = await collection.findAll().sort({ date: -1 });
      } else {
        data = await collection.findAll({
          $or: [{ origin: ObjectId(id) }, { destiny: ObjectId(id) }]
        }).sort({ date: -1 });
      }

      return res.json({ ...Codes.get(200), data });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }
}
