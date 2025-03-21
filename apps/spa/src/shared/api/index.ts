import type { components } from "./schema";

export type { components } from "./schema";

export type Book = components["schemas"]["Book"];

export type BookStatus = components["schemas"]["BookStatus"];

export type CreateBook = components["schemas"]["CreateBook"];

export type UpdateBook = components["schemas"]["UpdateBook"];

export { $api } from "./hooks";

export { apiClient } from "./client";

export { queryClient } from "./query-client";
