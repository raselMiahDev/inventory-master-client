"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,Eye,Pencil,Trash2,ChevronLeft,ChevronRight} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { apiClient } from "@/lib/api/client"
import { IProduct, ProductsResponse } from "@/types/products.types"
import { filterAndSortProducts } from "@/lib/utils/product-filter"

type SortKey = keyof IProduct
type SortDir = "asc" | "desc"

const LOW_STOCK_THRESHOLD = 20

interface ProductTableProps {
  onAddProduct: () => void
}

export function ProductTable({ onAddProduct }: ProductTableProps) {
  const [products, setProducts] = useState<IProduct[]>([])

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)




  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response =
          await apiClient.get<ProductsResponse>("/products")
        setProducts(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        // You can set a loading state here if needed
      }
    }

    fetchProducts()
  }, [])

  // Categories
  const CATEGORIES = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  )
const filteredProducts = useMemo(() => {
  return filterAndSortProducts({
    products,
    search,
    category,
    sortKey,
    sortDir,
  })
}, [products, search, category, sortKey, sortDir])


  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage))
  const safePage = Math.min(page, totalPages)
  const paged = filteredProducts.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  )

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(1)
  }

  function stockBadge(stock: number) {
    return stock <= LOW_STOCK_THRESHOLD ? (
      <Badge variant="destructive">{stock}</Badge>
    ) : (
      <Badge variant="secondary">{stock}</Badge>
    )
  }


  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="flex gap-3 flex-1 flex-col sm:flex-row">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="pl-9"
            />
          </div>

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

          <div className="flex gap-2">
            <Button variant={"outline"} onClick={() => handleSort("name")}>Asc</Button>
            <Button variant={"outline"} onClick={() => handleSort("name")}>Desc</Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            Print
          </Button>
          <Button onClick={onAddProduct}> + Add Product</Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer">
                Product Name
              </TableHead>
              <TableHead onClick={() => handleSort("code")} className="cursor-pointer">
                Code
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Pack Size</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              paged.map((product,index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    {product.packSize}
                  </TableCell>
                  <TableCell className="text-right">
                    ${product.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {stockBadge(50)} {/* Replace 50 with actual stock value when available */}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="icon" variant="ghost">
                      <Eye size={16} />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Pencil size={16} />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination OUTSIDE table */}
      <div className="flex justify-between items-center border-t pt-3">
        <div className="text-sm text-muted-foreground">
          Page {safePage} of {totalPages}
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="default"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={16} />
          </Button>

          <Button
            size="icon"
            variant="default"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}