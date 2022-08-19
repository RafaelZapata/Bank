const fields = {
  _id: "object",
  origin: ["string", "object"],
  destiny: ["string", "object"],
  value: "number",
  date: "object",
}

export default class Transaction {
  constructor(data) {
    const { origin, destiny, value } = data;

    data.date = new Date();

    if ([typeof destiny, typeof value].includes("undefined"))
      throw new Error("Invalid transaction properties");

    for (const key in data)
      if ( Array.isArray(fields[key]) && fields[key].includes(typeof data[key]) || typeof data[key] === fields[key])
        this[key] = data[key];
  }
}
