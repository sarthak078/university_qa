import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin } from "lucide-react"
import Link from "next/link"

type University = {
  id: string
  name: string
  location: string
  country: string
  ranking: number
  website_url: string
}

export function UniversityHeader({ university }: { university: University }) {
  return (
    <header className="border-b bg-gradient-to-r from-primary via-secondary to-accent py-12 text-primary-foreground">
      <div className="container mx-auto px-4">
        <Link href="/" className="mb-4 inline-block text-sm text-primary-foreground/80 hover:text-primary-foreground">
          ← Back to Universities
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                #{university.ranking} Worldwide
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                {university.country}
              </Badge>
            </div>
            <h1 className="mb-2 text-balance text-4xl font-bold leading-tight md:text-5xl">{university.name}</h1>
            <p className="flex items-center gap-2 text-primary-foreground/90">
              <MapPin className="h-4 w-4" />
              {university.location}
            </p>
          </div>
          {university.website_url && (
            <Button variant="secondary" asChild className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
