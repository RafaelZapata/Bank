import Codes from "utilities/codes";
import User from "models/user";

export default class UserController {
  static async setCollection(db) {
    return db.collection("users");
  }

  static async get(req, res) {}

  static async insert(req, res) {
    try {
      const collection = await UserController.setCollection(req.database);

      const client = new User(req.body);

      const result = await collection.insertOne(client);

      return res.json({
        ...Codes.get(200),
        data: {
          ...client,
          _id: result.insertId,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }
}
