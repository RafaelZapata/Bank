import crypto from "crypto";
import connectDB from "utilities/database";
import Codes from "utilities/codes";

export default class Token {
  static async generate(type, modelID) {
    const db = await connectDB();
    const collection = db.collection("auth");

    const token = crypto.randomBytes(64).toString("hex");
    const status = await collection.insertOne({ token, type, modelID });

    if (typeof status?.insertedId === "undefined") return false;

    return token;
  }

  static async authorize(authorization, res) {
    if (typeof authorization !== "string" || authorization.length < 1)
      return res.status(401).json(Codes.get(401));

    const db = await connectDB();
    const collection = db.collection("auth");
    const tokenInfo = await collection.findOne({ token: authorization });

    if (tokenInfo === null) return res.status(401).json(Codes.get(401));

    const modelCollection = db.collection(tokenInfo.type);
    const user = await modelCollection.findOne({ _id: tokenInfo.modelID });

    if (user === null) return res.status(401).json(Codes.get(401));

    return user;
  }

  static async authorizeUser(req, res, next) {
    try {
      const { authorization } = req.headers;

      let user = Token.authorize(authorization, res);

      req.auth = user;

      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }

  static async authorizeAdmin(req, res, next) {
    try {
      const { authorization } = req.headers;

      let user = Token.authorize(authorization, res);

      if (user.role !== "admin") {
        return res.status(401).json(Codes.get(401));
      }

      req.auth = user;

      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json(Codes.get(500));
    }
  }
}
