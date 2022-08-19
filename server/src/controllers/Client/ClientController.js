import { ObjectId } from "mongodb";
import Codes from "utilities/codes";
import User from "models/user";

const COLLECTION = "users";
const TYPE = "client";

export default class ClientController {
  // GET /client/me
  static async me(req, res) {
    try {
      return res.json({
        ...Codes.get(200),
        data: req.auth,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }

  // PATCH /client
  static async update(req, res) {
    try {
      const collection = await req.database.collection(COLLECTION);
      const clientID = ObjectId(req.auth._id);
      const client = new User(req.body, false);

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
