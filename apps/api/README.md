# React Router SPA Demo の API 部分

## 技術スタック

- Hono
- Zod
- OpenAPI
- drizzle
- libsql (sqlite)

## DB の migration

```bash
pnpm db-push
```

## 開発サーバーの起動

```bash
pnpm run dev
```

## OpenAPI

開発サーバーを起動すると、以下の URL で OpenAPI の Spec (JSON) と、Swagger UI にアクセスできます。

- Spec
  - `http://localhost:/3000/docs`
- Swagger UI
  - `http://localhost:/3000/ui`
