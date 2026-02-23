import { TransfersContent } from "@/components/transfers/TransfersContent"
import { Suspense } from "react"


export default function TransfersPage() {
  return <Suspense fallback={<div>Loading...</div>}>
    <TransfersContent />
  </Suspense>
}