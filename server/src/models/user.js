export default class User {
  constructor(data) {
    const { name, email, password, balance, role } = data;

    if (role !== "admin") role = "user";

    balance = 0;

    if ([typeof name, typeof email, typeof password].includes("undefined"))
      throw new Error("Invalid client properties");

    for (const key in data) this[key] = data[key];
  }
}
