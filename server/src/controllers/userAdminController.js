import { ObjectId } from "mongodb";
import Codes from "utilities/codes";
import User from "models/user";

export default class UserAdminController {
  static async setCollection(db) {
    return db.collection("users");
  }

  static async list(req, res) {
    try {
      const collection = await UserAdminController.setCollection(req.database);

      const result = await collection.findAll();

      if (result === null) return res.status(400).json(Codes.get(400));

      return res.json({
        ...Codes.get(200),
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }

  static async get(req, res) {
    try {
      const collection = await UserAdminController.setCollection(req.database);

      const result = await collection.findOne({ _id: ObjectId(req.params.id) });

      if (result === null) return res.status(400).json(Codes.get(400));

      return res.json({
        ...Codes.get(200),
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }

  static async insert(req, res) {
    try {
      const collection = await UserAdminController.setCollection(req.database);

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
