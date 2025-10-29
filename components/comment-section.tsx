"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Reply } from "lucide-react"
import { useState, useTransition, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { VoteButtons } from "@/components/vote-buttons"

type Comment = {
  id: string
  content: string
  vote_count: number
  created_at: string
  user_id: string
  parent_comment_id: string | null
  profiles: {
    display_name: string
    avatar_url: string | null
  } | null
}

export function CommentSection({
  questionId,
  comments,
  userId,
}: {
  questionId: string
  comments: Comment[]
  userId?: string
}) {
  const [newComment, setNewComment] = useState("")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) {
      router.push("/auth/login")
      return
    }

    if (!newComment.trim()) {
      setError("Please enter a comment")
      return
    }

    setError(null)
    startTransition(async () => {
      try {
        const supabase = createClient()
        await supabase.from("comments").insert({
          question_id: questionId,
          user_id: userId,
          content: newComment.trim(),
          parent_comment_id: null,
        })
        setNewComment("")
        router.refresh()
      } catch (err) {
        console.error("Error posting comment:", err)
        setError("Failed to post comment. Please try again.")
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder={userId ? "Add a comment..." : "Sign in to comment"}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!userId || isPending}
            rows={3}
            maxLength={1000}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{newComment.length}/1000 characters</p>
            <Button type="submit" disabled={!userId || isPending}>
              {isPending ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </form>

        {comments.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <MessageSquare className="mx-auto mb-2 h-12 w-12 opacity-20" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentThread key={comment.id} comment={comment} questionId={questionId} userId={userId} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CommentThread({
  comment,
  questionId,
  userId,
  depth = 0,
}: {
  comment: Comment
  questionId: string
  userId?: string
  depth?: number
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [replies, setReplies] = useState<Comment[]>([])
  const [isPending, startTransition] = useTransition()
  const [userVote, setUserVote] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      const supabase = createClient()
      supabase
        .from("votes")
        .select("vote_type")
        .eq("comment_id", comment.id)
        .eq("user_id", userId)
        .single()
        .then(({ data }) => {
          if (data) setUserVote(data.vote_type)
        })
    }
  }, [userId, comment.id])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("comments")
      .select("*, profiles!comments_user_id_fkey(display_name, avatar_url)")
      .eq("parent_comment_id", comment.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setReplies(data)
      })
  }, [comment.id])

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) {
      router.push("/auth/login")
      return
    }

    if (!replyContent.trim()) return

    startTransition(async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase
          .from("comments")
          .insert({
            question_id: questionId,
            user_id: userId,
            content: replyContent.trim(),
            parent_comment_id: comment.id,
          })
          .select("*, profiles!comments_user_id_fkey(display_name, avatar_url)")
          .single()

        if (data) {
          setReplies([...replies, data])
          setReplyContent("")
          setShowReplyForm(false)
          router.refresh()
        }
      } catch (err) {
        console.error("Error posting reply:", err)
      }
    })
  }

  const maxDepth = 3

  return (
    <div className={`${depth > 0 ? "ml-8 border-l-2 border-muted pl-4" : ""}`}>
      <div className="flex gap-3 rounded-lg border bg-card p-4">
        <VoteButtons
          itemId={comment.id}
          itemType="comment"
          voteCount={comment.vote_count}
          userVote={userVote}
          userId={userId}
        />
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {comment.profiles?.display_name?.[0]?.toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{comment.profiles?.display_name || "Anonymous"}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="mb-2 text-pretty text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          {depth < maxDepth && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="h-3 w-3" />
              Reply
            </Button>
          )}

          {showReplyForm && (
            <form onSubmit={handleReply} className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                disabled={isPending}
                rows={2}
                maxLength={1000}
                className="text-sm"
              />
              <div className="flex items-center gap-2">
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending ? "Posting..." : "Post Reply"}
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => setShowReplyForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} questionId={questionId} userId={userId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
