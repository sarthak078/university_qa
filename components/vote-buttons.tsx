"use client"

import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { useState, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function VoteButtons({
  itemId,
  itemType,
  voteCount,
  userVote,
  userId,
}: {
  itemId: string
  itemType: "question" | "comment"
  voteCount: number
  userVote: number | null
  userId?: string
}) {
  const [currentVote, setCurrentVote] = useState(userVote)
  const [currentCount, setCurrentCount] = useState(voteCount)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleVote = (voteType: 1 | -1) => {
    if (!userId) {
      router.push("/auth/login")
      return
    }

    startTransition(async () => {
      const supabase = createClient()

      try {
        if (currentVote === voteType) {
          await supabase.from("votes").delete().eq("user_id", userId).eq(`${itemType}_id`, itemId)
          setCurrentVote(null)
          setCurrentCount((prev) => prev - voteType)
        } else if (currentVote === null) {
          await supabase.from("votes").insert({
            user_id: userId,
            [`${itemType}_id`]: itemId,
            vote_type: voteType,
          })
          setCurrentVote(voteType)
          setCurrentCount((prev) => prev + voteType)
        } else {
          await supabase
            .from("votes")
            .update({ vote_type: voteType })
            .eq("user_id", userId)
            .eq(`${itemType}_id`, itemId)
          setCurrentVote(voteType)
          setCurrentCount((prev) => prev + voteType * 2)
        }

        router.refresh()
      } catch (error) {
        console.error("Error voting:", error)
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${currentVote === 1 ? "text-primary" : "text-muted-foreground"}`}
        onClick={() => handleVote(1)}
        disabled={isPending}
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <span
        className={`text-sm font-semibold ${currentCount > 0 ? "text-primary" : currentCount < 0 ? "text-destructive" : ""}`}
      >
        {currentCount}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-8 p-0 ${currentVote === -1 ? "text-destructive" : "text-muted-foreground"}`}
        onClick={() => handleVote(-1)}
        disabled={isPending}
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  )
}
