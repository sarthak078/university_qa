// import { createClient } from "@/lib/supabase/server"
// import { UniversityGrid } from "@/components/university-grid"
// import { HeroSection } from "@/components/hero-section"
// import { SearchFilters } from "@/components/search-filters"

// export default async function HomePage({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string; country?: string; ranking?: string }>
// }) {
//   const params = await searchParams
//   const supabase = await createClient()

//   let query = supabase.from("universities").select("*").order("ranking", { ascending: true })

//   if (params.search) {
//     query = query.ilike("name", `%${params.search}%`)
//   }

//   if (params.country) {
//     query = query.eq("country", params.country)
//   }

//   if (params.ranking) {
//     const maxRanking = Number.parseInt(params.ranking)
//     query = query.lte("ranking", maxRanking)
//   }

//   const { data: universities, error } = await query

//   if (error) {
//     console.error("Error fetching universities:", error)
//   }

//   return (
//     <div className="min-h-screen">
//       <HeroSection />
//       <main className="container mx-auto px-4 py-12">
//         <SearchFilters />
//         <UniversityGrid universities={universities || []} />
//       </main>
//     </div>
//   )
// }


import { createClient } from "@/lib/supabase/server"
import { UniversityGrid } from "@/components/university-grid"
import { HeroSection } from "@/components/hero-section"
import { SearchFilters } from "@/components/search-filters"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; country?: string; ranking?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase.from("universities").select("*").order("ranking", { ascending: true })

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`)
  }

  if (params.country) {
    query = query.eq("country", params.country)
  }

  if (params.ranking) {
    const maxRanking = Number.parseInt(params.ranking)
    query = query.lte("ranking", maxRanking)
  }

  const { data: universities, error } = await query

  if (error) {
    console.error("Error fetching Universities:", error)
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <main className="container mx-auto px-4 py-12">
        <SearchFilters />
        <UniversityGrid universities={universities || []} />
      </main>
    </div>
  )
}