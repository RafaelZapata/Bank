import crypto from "crypto";
import connectDB from "utilities/database";
import Codes from "utilities/codes";
import User from "models/user";

export default class Token {
  static async generate(type, modelID) {
    const db = await connectDB();
    const collection = db.collection("auth");

    const token = crypto.randomBytes(64).toString("hex");
    const status = await collection.insertOne({ token, type, modelID });

    if (typeof status?.insertedId === "undefined") return false;

    return token;
  }

  static async authorize(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (typeof authorization !== "string" || authorization.length < 1)
        return res.status(401).json(Codes.get(401));

      const db = await connectDB();
      const collection = db.collection("auth");
      const tokenInfo = await collection.findOne({ token: authorization });

      if (tokenInfo === null) return res.status(401).json(Codes.get(401));

      const modelCollection = db.collection(tokenInfo.type);
      const user = await modelCollection.findOne({ _id: tokenInfo.modelID });

      if (user === null) return res.status(401).json(Codes.get(401));

      delete user.password;
      req.auth = new User(user);

      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }

  static async banker(req, res, next) {
    if (req.auth.role !== "banker")
      return res.status(401).json(Codes.get(401));

    return next();
  }

  static async client(req, res, next) {
    if (req.auth.role !== "client")
      return res.status(401).json(Codes.get(401));

    return next();
  }
}
