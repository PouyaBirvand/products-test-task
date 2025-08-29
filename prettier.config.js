/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "react",
    "next",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components/(.*)$",
    "^@/lib/(.*)$",
    "^@/data/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
