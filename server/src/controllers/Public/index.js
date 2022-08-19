import Codes from "utilities/codes";
import Token from "utilities/token";
import User from "models/user";

class Public {
  static async setCollection(db) {
    return db.collection("users");
  }

  home(req, res) {
    return res.json(Codes.get(200));
  }

  notFound(req, res) {
    return res.json(Codes.get(400));
  }

  async auth(req, res) {
    try {
      const { email, password } = req.body;
      const collection = await Public.setCollection(req.database);

      if (
        [User.validateEmail(email), User.validatePassword(password)].includes(
          false
        )
      )
        return res.status(400).json(Codes.get(400));

      const user = await collection.findOne({ email, password });

      delete user?.password;

      user.token = await Token.generate("users", user._id);

      if (Object.keys(user || {}).length > 0)
        return res.json({ ...Codes.get(200), user });

      return res.json({
        ...Codes.get(200),
        message: "Invalid Credentials",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(Codes.get(500));
    }
  }
}

export default new Public();
