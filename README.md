# Products Page – Next.js Test

A small demo project for a **mid‑level React + Next.js test**.

## Features

* `/products` page with **SSR**
* **Search** (debounced, sync with URL)
* **Sort** by name/price (asc/desc)
* **Pagination** (5 items per page)
* **Favorites** with optimistic update (`/api/favorites`)
* **TypeScript + Zod** for query validation

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000/products
```

## Notes

* Data is from `src/data/products.ts`
* Favorites API is mocked (in-memory)

---
