import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout(
    "routes/books/layout.tsx",
    prefix("books", [
      route("", "routes/books/list.tsx"),
      route("new", "routes/books/new.tsx"),

      ...prefix(":id", [
        route("", "routes/books/detail.tsx"),
        route("edit", "routes/books/edit.tsx"),
      ]),
    ]),
  ),
] satisfies RouteConfig;
