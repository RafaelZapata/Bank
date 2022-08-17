import Codes from "utilities/codes";

class Public {
  home(req, res) {
    return res.json(Codes.get(200));
  }

  notFound(req, res) {
    return res.json(Codes.get(400));
  }
}

export default new Public();
