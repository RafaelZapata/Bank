import { get, post } from "utilities/api";

export function me() {
    return get("/client/me");
}

export function transactions() {
    return get("/client/transactions");
}

export function newTransaction() {
    return post("/client/transaction");
}
