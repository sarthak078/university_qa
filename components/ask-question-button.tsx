"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function AskQuestionButton({ universityId }: { universityId: string }) {
  return (
    <Button asChild>
      <Link href={`/university/${universityId}/ask`}>
        <Plus className="mr-2 h-4 w-4" />
        Ask Question
      </Link>
    </Button>
  )
}
