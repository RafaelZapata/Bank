export default class Transaction {
  constructor(data) {
    const { origin, destiny, date, value } = data;

    // date = getDate();

    if ([typeof origin, typeof destiny, typeof value].includes("undefined"))
      throw new Error("Invalid transaction properties");
  }
}
