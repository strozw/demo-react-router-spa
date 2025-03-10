import type { components } from "./openapi/schema";

export type { components } from "./openapi/schema";

export type Book = components["schemas"]["Book"];

export type BookStatus = components["schemas"]["BookStatus"];

export type CreateBook = components["schemas"]["CreateBook"];

export type UpdateBook = components["schemas"]["UpdateBook"];

export { $api } from "./openapi/hooks";

export { apiClient } from "./openapi/client";

export { ApiProvider } from "./api-provider";
