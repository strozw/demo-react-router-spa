# React Router SPA Demo

## 概要

React RouterとReactを使用したシングルページアプリケーション（SPA）のデモプロジェクトです。

## 含むアプリケーション

| パス                   | 内容                          |
| ---------------------- | ----------------------------- |
| [apps/api](./apps/api) | SPAで利用するAPI              |
| [apps/spa](./apps/spa) | React Router で実装された SPA |

## インストール

```bash
pnpm install
```

## 開発サーバーの起動

以下の npm script を実行することで、API と SPA の開発サーバーを起動できます。

```bash
pnpm run dev
```

### 個別に起動

個別に起動する場合は、それぞれのディレクトリで `pnpm run dev` を実行、
もしくは、`pnpm --filter` を利用する方法があります。

```bash
# API を起動
pnpm --filter api dev

# SPA を起動
pnpm --filter web dev
```
