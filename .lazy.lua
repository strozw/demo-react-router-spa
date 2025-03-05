return {
  {
    "stevearc/conform.nvim",
    opts = {
      formatters_by_ft = {
        markdown = { "prettier" },
        yaml = { "prettier" },
        css = { "biome", "biome-check" },
        json = { "biome", "biome-check" },
        jsonc = { "biome", "biome-check" },
        javascript = { "biome", "biome-check" },
        typescript = { "biome", "biome-check" },
        javascriptreact = { "biome", "biome-check" },
        typescriptreact = { "biome", "biome-check" },
      },
    },
  },
}
