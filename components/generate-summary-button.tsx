"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { generateUniversitySummary } from "@/app/actions/ai-actions"

export function GenerateSummaryButton({ universityId }: { universityId: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        await generateUniversitySummary(universityId)
        router.refresh() // ✅ Re-fetches and re-renders the updated data
        console.log("[v0] Page refreshed to show updated AI summary")
      } catch (error) {
        console.error("[v0] Error generating AI summary:", error)
      }
    })
  }

  return (
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
  )
}
