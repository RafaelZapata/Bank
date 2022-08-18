export default class User {
  constructor(data) {
    const { name, email, password } = data;

    data.balance = data.balance ? data.balance : 0;
    data.role = data.role !== "admin" ? "user" : data.role;

    if (
      [User.validateEmail(email), User.validatePassword(password)].includes(
        false
      )
    )
      throw new Error("Invalid client properties");

    for (const key in data) this[key] = data[key];
  }

  static validatePassword(password) {
    return true;
  }

  static validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    // return true;
  }
}
