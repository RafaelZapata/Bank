export default class User {
  constructor(data) {
    const { name, email, password } = data;

    data.balance = data.balance ? data.balance : 0;
    data.role = data.role !== "admin" ? "user" : data.role;

    if ([typeof name, typeof email, typeof password].includes("undefined"))
      throw new Error("Invalid client properties");

    for (const key in data) this[key] = data[key];
  }
}
