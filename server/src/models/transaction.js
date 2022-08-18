export default class Transaction {
  constructor(data) {
    const { origin, destiny, value } = data;

    data.date = new Date();

    if ([typeof origin, typeof destiny, typeof value].includes("undefined"))
      throw new Error("Invalid transaction properties");

    for (const key in data) this[key] = data[key];
  }
}
