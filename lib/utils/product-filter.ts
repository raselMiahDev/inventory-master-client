import { IProduct } from "@/types/products.types"

export type SortDirection = "asc" | "desc"

export interface FilterSortParams {
  products: IProduct[]
  search?: string
  category?: string
  sortKey: keyof IProduct
  sortDir: SortDirection
}

export const filterAndSortProducts = ({
  products,
  search = "",
  category = "all",
  sortKey,
  sortDir,
}: FilterSortParams): IProduct[] => {
  let list = [...products]

  // 🔎 Search filter
  if (search) {
    const q = search.toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q)
    )
  }

  // 🏷 Category filter
  if (category !== "all") {
    list = list.filter((p) => p.category === category)
  }

  // 🔃 Sort
  list.sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc"
        ? aVal - bVal
        : bVal - aVal
    }

    return 0
  })

  return list
}