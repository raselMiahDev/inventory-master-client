// ── Types ──────────────────────────────────────────────────────
export type TransferStatus = "Pending" | "Approved" | "Shipped" | "Received"
export type Priority = "Low" | "Normal" | "High" | "Urgent"

export interface TransferItem {
  productId: string
  productName: string
  code: string
  quantity: number
  packSize: number
}

export interface Transfer {
  id: string
  reference: string
  sourceDepot: string
  destinationDepot: string
  items: TransferItem[]
  status: TransferStatus
  priority: Priority
  createdAt: string
  updatedAt: string
  notes?: string
}

// ── Depots ─────────────────────────────────────────────────────
export const DEPOTS = [
  { id: "dep-1", name: "Warehouse A - Downtown" },
  { id: "dep-2", name: "Warehouse B - Industrial Zone" },
  { id: "dep-3", name: "Warehouse C - Airport Hub" },
  { id: "dep-4", name: "Warehouse D - Harbor District" },
  { id: "dep-5", name: "Distribution Center - North" },
]

// ── Transferable Products ──────────────────────────────────────
export const TRANSFER_PRODUCTS = [
  { id: "1",  name: "Premium Basmati Rice",   code: "PBR-001", packSize: 25, available: 342 },
  { id: "2",  name: "Organic Wheat Flour",    code: "OWF-002", packSize: 10, available: 156 },
  { id: "3",  name: "Extra Virgin Olive Oil", code: "EVO-003", packSize: 5,  available: 89 },
  { id: "4",  name: "Sunflower Oil",          code: "SFO-004", packSize: 20, available: 210 },
  { id: "5",  name: "Raw Cane Sugar",         code: "RCS-005", packSize: 50, available: 18 },
  { id: "6",  name: "Iodized Table Salt",     code: "ITS-006", packSize: 25, available: 520 },
  { id: "7",  name: "Ground Black Pepper",    code: "GBP-007", packSize: 1,  available: 8 },
  { id: "8",  name: "Dried Red Lentils",      code: "DRL-008", packSize: 10, available: 275 },
  { id: "9",  name: "Chickpeas",              code: "CHP-009", packSize: 10, available: 198 },
  { id: "10", name: "Tomato Paste",           code: "TMP-010", packSize: 5,  available: 3 },
  { id: "11", name: "Coconut Milk",           code: "CNM-011", packSize: 5,  available: 112 },
  { id: "12", name: "Powdered Milk",          code: "PWM-015", packSize: 25, available: 42 },
]

// ── Sample Transfers ───────────────────────────────────────────
export const SAMPLE_TRANSFERS: Transfer[] = [
  {
    id: "tf-001",
    reference: "TRF-2026-001",
    sourceDepot: "Warehouse A - Downtown",
    destinationDepot: "Warehouse C - Airport Hub",
    items: [
      { productId: "1", productName: "Premium Basmati Rice", code: "PBR-001", quantity: 50, packSize: 25 },
      { productId: "4", productName: "Sunflower Oil", code: "SFO-004", quantity: 30, packSize: 20 },
    ],
    status: "Received",
    priority: "Normal",
    createdAt: "2026-02-10T09:00:00Z",
    updatedAt: "2026-02-14T16:30:00Z",
    notes: "Monthly restock for airport outlet.",
  },
  {
    id: "tf-002",
    reference: "TRF-2026-002",
    sourceDepot: "Warehouse B - Industrial Zone",
    destinationDepot: "Distribution Center - North",
    items: [
      { productId: "6", productName: "Iodized Table Salt", code: "ITS-006", quantity: 100, packSize: 25 },
      { productId: "8", productName: "Dried Red Lentils", code: "DRL-008", quantity: 80, packSize: 10 },
      { productId: "9", productName: "Chickpeas", code: "CHP-009", quantity: 60, packSize: 10 },
    ],
    status: "Shipped",
    priority: "High",
    createdAt: "2026-02-13T11:30:00Z",
    updatedAt: "2026-02-15T08:00:00Z",
  },
  {
    id: "tf-003",
    reference: "TRF-2026-003",
    sourceDepot: "Warehouse A - Downtown",
    destinationDepot: "Warehouse D - Harbor District",
    items: [
      { productId: "3", productName: "Extra Virgin Olive Oil", code: "EVO-003", quantity: 20, packSize: 5 },
    ],
    status: "Approved",
    priority: "Low",
    createdAt: "2026-02-15T14:00:00Z",
    updatedAt: "2026-02-16T09:00:00Z",
    notes: "Low-priority seasonal stock shift.",
  },
  {
    id: "tf-004",
    reference: "TRF-2026-004",
    sourceDepot: "Warehouse C - Airport Hub",
    destinationDepot: "Warehouse A - Downtown",
    items: [
      { productId: "5", productName: "Raw Cane Sugar", code: "RCS-005", quantity: 40, packSize: 50 },
      { productId: "7", productName: "Ground Black Pepper", code: "GBP-007", quantity: 15, packSize: 1 },
    ],
    status: "Pending",
    priority: "Urgent",
    createdAt: "2026-02-17T07:45:00Z",
    updatedAt: "2026-02-17T07:45:00Z",
    notes: "Critical restock - low inventory levels at Downtown depot.",
  },
  {
    id: "tf-005",
    reference: "TRF-2026-005",
    sourceDepot: "Distribution Center - North",
    destinationDepot: "Warehouse B - Industrial Zone",
    items: [
      { productId: "11", productName: "Coconut Milk", code: "CNM-011", quantity: 45, packSize: 5 },
      { productId: "12", productName: "Powdered Milk", code: "PWM-015", quantity: 25, packSize: 25 },
    ],
    status: "Pending",
    priority: "Normal",
    createdAt: "2026-02-16T16:20:00Z",
    updatedAt: "2026-02-16T16:20:00Z",
  },
  {
    id: "tf-006",
    reference: "TRF-2026-006",
    sourceDepot: "Warehouse D - Harbor District",
    destinationDepot: "Warehouse C - Airport Hub",
    items: [
      { productId: "2", productName: "Organic Wheat Flour", code: "OWF-002", quantity: 70, packSize: 10 },
    ],
    status: "Shipped",
    priority: "High",
    createdAt: "2026-02-12T10:00:00Z",
    updatedAt: "2026-02-15T14:15:00Z",
  },
]
