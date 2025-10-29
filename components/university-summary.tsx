"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useState, useTransition } from "react"
import { generateUniversitySummary } from "@/app/actions/ai-actions"

type University = {
  id: string
  name: string
  description: string
  ai_summary: string | null
}

export function UniversitySummary({ university: initialUniversity }: { university: University }) {
  const [university, setUniversity] = useState(initialUniversity)
  const [isPending, startTransition] = useTransition()

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        const generatedSummary = await generateUniversitySummary(university.id)
        setUniversity({ ...university, ai_summary: generatedSummary })
        console.log("[v0] Summary updated in state")
      } catch (error) {
        console.error("[v0] Error generating AI summary:", error)
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            About {university.name}
            {university.ai_summary && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs font-normal text-accent">
                <Sparkles className="h-3 w-3" />
                AI Enhanced
              </span>
            )}
          </CardTitle>
          {!university.ai_summary && (
            <Button
              onClick={handleGenerate}
              disabled={isPending}
              size="sm"
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <Sparkles className="h-4 w-4" />
              {isPending ? "Generating..." : "Generate AI Summary"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-pretty leading-relaxed text-muted-foreground">{university.description}</p>
        {university.ai_summary && (
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-accent">
              <Sparkles className="h-4 w-4" />
              AI-Generated Insights
            </h3>
            <p className="text-pretty leading-relaxed text-foreground">{university.ai_summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}