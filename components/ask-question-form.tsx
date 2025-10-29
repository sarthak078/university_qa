"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function AskQuestionForm({ universityId }: { universityId: string }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !content.trim()) {
      setError("Please fill in all fields")
      return
    }

    startTransition(async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setError("You must be logged in to ask a question")
          return
        }

        const { data, error: insertError } = await supabase
          .from("questions")
          .insert({
            university_id: universityId,
            user_id: user.id,
            title: title.trim(),
            content: content.trim(),
          })
          .select()
          .single()

        if (insertError) throw insertError

        router.push(`/question/${data.id}`)
      } catch (err) {
        console.error("Error creating question:", err)
        setError("Failed to create question. Please try again.")
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Question</CardTitle>
        <CardDescription>Be specific and clear to get the best answers from the community and AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Question Title</Label>
            <Input
              id="title"
              placeholder="e.g., What are the housing options for first-year students?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">{title.length}/200 characters</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Question Details</Label>
            <Textarea
              id="content"
              placeholder="Provide more context about your question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPending}
              rows={8}
              maxLength={2000}
            />
            <p className="text-xs text-muted-foreground">{content.length}/2000 characters</p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Posting..." : "Post Question"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
