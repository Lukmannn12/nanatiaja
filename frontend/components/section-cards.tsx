"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios";

export function SectionCards() {

  const [totalPertandingan, setTotalPertandingan] = useState<number | null>(null);

  useEffect(() => {
      const fetchTotalPertandingan = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/countpertandingan", {
            headers: {
              Accept: "application/json",
            },
          })
          setTotalPertandingan(res.data.total)
        } catch (error) {
          console.error("gagal mengambil total pertandingan:", error)
        }
      }

      fetchTotalPertandingan()
  }, [])


  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pertandingan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
           {totalPertandingan}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
