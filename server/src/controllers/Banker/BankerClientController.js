import { ObjectId } from "mongodb";
import Codes from "utilities/codes";

const COLLECTION = "users";
const TYPE = "client";

export default class BankerClientController {
  // GET /banker/clients[?=id]
  static async list(req, res) {
    try {
      const { id } = (req.query || {});
      const collection = await req.database.collection(COLLECTION);
      let data = [];

      if (typeof id === "undefined") {
        data = await collection.findAll({ type: TYPE }).sort({ date: -1 });
      } else {
        data = await collection.findOne({ type: TYPE, _id: ObjectId(id) });
      }

      return res.json({ ...Codes.get(200), data });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }

  // PATCH /banker/client/:id
  static async update(req, res) {
    try {
      const collection = await req.database.collection(COLLECTION);
      const clientID = ObjectId(req.params.id);
      const client = new User(req.body);

      const data = await collection.updateOne({ _id: clientID }, {
        $set: client
      });

      if (typeof data.modifiedCount === "undefined" || data.modifiedCount === 0)
        return res.status(500).json(Codes.get(500));

      return res.json( Codes.get(200) );
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }
}
