import { post } from "utilities/api";

export function auth(data) {
    return post("/auth", data);
}
