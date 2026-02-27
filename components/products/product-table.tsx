"use client"

import { useState, useMemo } from "react"
import {ArrowUpDown,ArrowUp,ArrowDown,Search,Eye,Pencil,Trash2,ChevronLeft,ChevronRight} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"

// ── Types ──────────────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  code: string
  category: string
  packSize: number
  unitPrice: number
  stock: number
}

type SortKey = "name" | "code" | "packSize" | "unitPrice" | "stock"
type SortDir = "asc" | "desc"

// ── Sample data ────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  { id: "1",  name: "Premium Basmati Rice",    code: "PBR-001", category: "Grains",     packSize: 25,   unitPrice: 48.50,  stock: 342 },
  { id: "2",  name: "Organic Wheat Flour",     code: "OWF-002", category: "Grains",     packSize: 10,   unitPrice: 22.00,  stock: 156 },
  { id: "3",  name: "Extra Virgin Olive Oil",  code: "EVO-003", category: "Oils",       packSize: 5,    unitPrice: 65.00,  stock: 89 },
  { id: "4",  name: "Sunflower Oil",           code: "SFO-004", category: "Oils",       packSize: 20,   unitPrice: 38.75,  stock: 210 },
  { id: "5",  name: "Raw Cane Sugar",          code: "RCS-005", category: "Sweeteners", packSize: 50,   unitPrice: 32.00,  stock: 18 },
  { id: "6",  name: "Iodized Table Salt",      code: "ITS-006", category: "Spices",     packSize: 25,   unitPrice: 12.50,  stock: 520 },
  { id: "7",  name: "Ground Black Pepper",     code: "GBP-007", category: "Spices",     packSize: 1,    unitPrice: 28.00,  stock: 8 },
  { id: "8",  name: "Dried Red Lentils",       code: "DRL-008", category: "Pulses",     packSize: 10,   unitPrice: 18.00,  stock: 275 },
  { id: "9",  name: "Chickpeas",               code: "CHP-009", category: "Pulses",     packSize: 10,   unitPrice: 16.50,  stock: 198 },
  { id: "10", name: "Tomato Paste",            code: "TMP-010", category: "Canned",     packSize: 5,    unitPrice: 14.00,  stock: 3 },
  { id: "11", name: "Coconut Milk",            code: "CNM-011", category: "Canned",     packSize: 5,    unitPrice: 19.50,  stock: 112 },
  { id: "12", name: "Soy Sauce",               code: "SOS-012", category: "Condiments", packSize: 5,    unitPrice: 11.00,  stock: 67 },
  { id: "13", name: "White Vinegar",           code: "WHV-013", category: "Condiments", packSize: 5,    unitPrice: 8.50,   stock: 320 },
  { id: "14", name: "Cornstarch",              code: "CST-014", category: "Grains",     packSize: 10,   unitPrice: 9.75,   stock: 145 },
  { id: "15", name: "Powdered Milk",           code: "PWM-015", category: "Dairy",      packSize: 25,   unitPrice: 55.00,  stock: 42 },
  { id: "16", name: "UHT Whole Milk",          code: "UHM-016", category: "Dairy",      packSize: 12,   unitPrice: 24.00,  stock: 5 },
  { id: "17", name: "Butter Unsalted",         code: "BUT-017", category: "Dairy",      packSize: 10,   unitPrice: 45.00,  stock: 88 },
  { id: "18", name: "Pasta Spaghetti",         code: "PSP-018", category: "Grains",     packSize: 10,   unitPrice: 13.50,  stock: 260 },
  { id: "19", name: "Instant Noodles",         code: "INO-019", category: "Grains",     packSize: 30,   unitPrice: 18.00,  stock: 410 },
  { id: "20", name: "Green Tea Bags",          code: "GTB-020", category: "Beverages",  packSize: 2,    unitPrice: 12.00,  stock: 190 },
  { id: "21", name: "Instant Coffee",          code: "ICF-021", category: "Beverages",  packSize: 5,    unitPrice: 42.00,  stock: 11 },
  { id: "22", name: "Cocoa Powder",            code: "CCP-022", category: "Beverages",  packSize: 5,    unitPrice: 35.00,  stock: 54 },
  { id: "23", name: "Baking Powder",           code: "BKP-023", category: "Baking",     packSize: 2,    unitPrice: 6.00,   stock: 300 },
  { id: "24", name: "Vanilla Extract",         code: "VEX-024", category: "Baking",     packSize: 1,    unitPrice: 22.00,  stock: 75 },
]

const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category))).sort()

const LOW_STOCK_THRESHOLD = 20

// ── Component ──────────────────────────────────────────────────
interface ProductTableProps {
  onAddProduct: () => void
}

export function ProductTable({ onAddProduct }: ProductTableProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  // ── Filter + sort ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...PRODUCTS]

    // search
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q)
      )
    }

    // category
    if (category !== "all") {
      list = list.filter((p) => p.category === category)
    }

    // sort
    list.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })

    return list
  }, [search, category, sortKey, sortDir])

  // ── Pagination ────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(1)
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="ml-1 inline size-3.5 text-muted-foreground/50" />
    return sortDir === "asc"
      ? <ArrowUp className="ml-1 inline size-3.5 text-primary" />
      : <ArrowDown className="ml-1 inline size-3.5 text-primary" />
  }

  function stockBadge(stock: number) {
    if (stock <= LOW_STOCK_THRESHOLD) {
      return (
        <Badge variant="destructive" className="font-mono text-xs tabular-nums">
          {stock}
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="font-mono text-xs tabular-nums">
        {stock}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or code..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="pl-9"
            />
          </div>

          {/* Category filter */}
          <Select
            value={category}
            onValueChange={(v) => {
              setCategory(v)
              setPage(1)
            }}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onAddProduct} className="shrink-0">
          + Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <button onClick={() => handleSort("name")} className="inline-flex items-center font-medium">
                  Product Name <SortIcon column="name" />
                </button>
              </TableHead>
              <TableHead>
                <button onClick={() => handleSort("code")} className="inline-flex items-center font-medium">
                  Code <SortIcon column="code" />
                </button>
              </TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="text-right">
                <button onClick={() => handleSort("packSize")} className="inline-flex items-center font-medium">
                  Pack Size (KG) <SortIcon column="packSize" />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button onClick={() => handleSort("unitPrice")} className="inline-flex items-center font-medium">
                  Unit Price <SortIcon column="unitPrice" />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button onClick={() => handleSort("stock")} className="inline-flex items-center font-medium">
                  Stock <SortIcon column="stock" />
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-primary">{product.code}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="font-normal">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    {product.packSize}
                  </TableCell>
                  <TableCell className="text-right font-mono tabular-nums">
                    ${product.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {stockBadge(product.stock)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="size-8" aria-label="View product">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8" aria-label="Edit product">
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" aria-label="Delete product">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-4 py-3 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing</span>
            <Select
              value={String(perPage)}
              onValueChange={(v) => {
                setPerPage(Number(v))
                setPage(1)
              }}
            >
              <SelectTrigger className="h-8 w-[70px]" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>
              of {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm tabular-nums text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
