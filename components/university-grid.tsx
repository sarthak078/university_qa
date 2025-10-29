import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, DollarSign, TrendingUp } from "lucide-react"
import Link from "next/link"

type University = {
  id: string
  name: string
  location: string
  country: string
  ranking: number
  description: string
  website_url: string
  student_count: number
  acceptance_rate: number
  tuition_fee: number
}

export function UniversityGrid({ universities }: { universities: University[] }) {
  if (universities.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No universities found matching your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {universities.map((university, index) => {
        const isLarge = index % 7 === 0
        const isMedium = index % 5 === 0 && !isLarge

        return (
          <Link
            key={university.id}
            href={`/university/${university.id}`}
            className={`group ${isLarge ? "md:col-span-2 lg:col-span-2" : isMedium ? "md:col-span-2 lg:col-span-1" : ""}`}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    #{university.ranking}
                  </Badge>
                  <Badge variant="outline">{university.country}</Badge>
                </div>
                <CardTitle className="text-balance leading-tight group-hover:text-primary transition-colors">
                  {university.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3" />
                  {university.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {university.description}
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {university.student_count?.toLocaleString() || "N/A"} students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{university.acceptance_rate}% acceptance</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      ${university.tuition_fee?.toLocaleString() || "N/A"} / year
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
