export default class TransactionController {
  static async setCollection(db) {
    return db.collection("transaction");
  }

  static async list(req, res) {
    // ToDo: Validar role do usuário que fez requisição
    // User: Lista todas as transações onde ele é origem ou destino
    // Admin: Lista todas as transações
  }

  static async insert(req, res) {}
}
