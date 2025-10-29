import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, DollarSign, Globe } from "lucide-react"

type University = {
  student_count: number
  acceptance_rate: number
  tuition_fee: number
  website_url: string
}

export function UniversityStats({ university }: { university: University }) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-lg font-semibold">{university.student_count?.toLocaleString() || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-secondary/10 p-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Acceptance Rate</p>
            <p className="text-lg font-semibold">{university.acceptance_rate}%</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-accent/10 p-2">
            <DollarSign className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Annual Tuition</p>
            <p className="text-lg font-semibold">${university.tuition_fee?.toLocaleString() || "N/A"}</p>
          </div>
        </div>
        {university.website_url && (
  <div className="flex items-start gap-3">
    <div className="rounded-lg bg-muted p-2">
      <Globe className="h-5 w-5 text-muted-foreground" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Official Website</p>
      <a
        href={
          university.website_url.startsWith("http")
            ? university.website_url
            : `https://${university.website_url}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline"
      >
        Visit Site
      </a>
    </div>
  </div>
)}
      </CardContent>
    </Card>
  )
}
