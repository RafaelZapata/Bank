const fields = {
  _id: "object",
  name: "string",
  balance: "number",
  role: "string",
  password: "string",
  email: "string"
}

export default class User {
  constructor(data, validate = true) {
    const { name, email, password } = data;

    if (validate) {
      data.balance = data.balance ? data.balance : 0;
      data.role = data.role !== "banker" ? "client" : data.role;

      if ([User.validateEmail(email), User.validatePassword(password)].includes(false))
        throw new Error("Invalid client properties");
    }

    for (const key in data)
      if (typeof fields[key] !== "undefined" && typeof data[key] === fields[key])
        this[key] = data[key];
  }

  static validatePassword(password) {
    return true;
  }

  static validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    // return true;
  }

  updateBalance(value) {
    this.balance += value;

    return this.balance;
  }
}
