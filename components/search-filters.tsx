// "use client"

// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search } from "lucide-react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useTransition } from "react"

// export function SearchFilters() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [isPending, startTransition] = useTransition()

//   const handleSearch = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString())
//     if (value) {
//       params.set("search", value)
//     } else {
//       params.delete("search")
//     }
//     startTransition(() => {
//       router.push(`/?${params.toString()}`)
//     })
//   }

//   const handleCountryFilter = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString())
//     if (value && value !== "all") {
//       params.set("country", value)
//     } else {
//       params.delete("country")
//     }
//     startTransition(() => {
//       router.push(`/?${params.toString()}`)
//     })
//   }

//   const handleRankingFilter = (value: string) => {
//     const params = new URLSearchParams(searchParams.toString())
//     if (value && value !== "all") {
//       params.set("ranking", value)
//     } else {
//       params.delete("ranking")
//     }
//     startTransition(() => {
//       router.push(`/?${params.toString()}`)
//     })
//   }

//   return (
//     <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           type="search"
//           placeholder="Search universities..."
//           className="pl-10"
//           defaultValue={searchParams.get("search") || ""}
//           onChange={(e) => handleSearch(e.target.value)}
//           disabled={isPending}
//         />
//       </div>
//       <Select defaultValue={searchParams.get("country") || "all"} onValueChange={handleCountryFilter}>
//         <SelectTrigger className="w-full md:w-[200px]">
//           <SelectValue placeholder="Country" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Countries</SelectItem>
//           <SelectItem value="United States">United States</SelectItem>
//           <SelectItem value="United Kingdom">United Kingdom</SelectItem>
//           <SelectItem value="Canada">Canada</SelectItem>
//           <SelectItem value="Australia">Australia</SelectItem>
//           <SelectItem value="Switzerland">Switzerland</SelectItem>
//           <SelectItem value="Singapore">Singapore</SelectItem>
//         </SelectContent>
//       </Select>
//       <Select defaultValue={searchParams.get("ranking") || "all"} onValueChange={handleRankingFilter}>
//         <SelectTrigger className="w-full md:w-[200px]">
//           <SelectValue placeholder="Ranking" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Rankings</SelectItem>
//           <SelectItem value="5">Top 5</SelectItem>
//           <SelectItem value="10">Top 10</SelectItem>
//           <SelectItem value="15">Top 15</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   )
// }


"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition, useState, useEffect } from "react"

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  // Local state for search input
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "")

  // Debounce search URL updates
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchValue) {
        params.set("search", searchValue)
      } else {
        params.delete("search")
      }
      startTransition(() => {
        router.push(`/?${params.toString()}`, { scroll: false })
      })
    }, 1000) // Wait 500ms after user stops typing

    return () => clearTimeout(timer)
  }, [searchValue])

  const handleCountryFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set("country", value)
    } else {
      params.delete("country")
    }
    startTransition(() => {
      router.push(`/?${params.toString()}`, { scroll: false })
    })
  }

  const handleRankingFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set("ranking", value)
    } else {
      params.delete("ranking")
    }
    startTransition(() => {
      router.push(`/?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search universities..."
          className="pl-10"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          disabled={isPending}
        />
      </div>
      <Select defaultValue={searchParams.get("country") || "all"} onValueChange={handleCountryFilter}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Countries</SelectItem>
          <SelectItem value="United States">United States</SelectItem>
          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
          <SelectItem value="Canada">Canada</SelectItem>
          <SelectItem value="Australia">Australia</SelectItem>
          <SelectItem value="Switzerland">Switzerland</SelectItem>
          <SelectItem value="Singapore">Singapore</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue={searchParams.get("ranking") || "all"} onValueChange={handleRankingFilter}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Ranking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rankings</SelectItem>
          <SelectItem value="5">Top 5</SelectItem>
          <SelectItem value="10">Top 10</SelectItem>
          <SelectItem value="15">Top 15</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}