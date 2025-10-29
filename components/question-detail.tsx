"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { VoteButtons } from "@/components/vote-buttons"

type Question = {
  id: string
  title: string
  content: string
  vote_count: number
  comment_count: number
  created_at: string
  profiles: {
    display_name: string
    avatar_url: string | null
  } | null
}

export function QuestionDetail({
  question,
  userVote,
  userId,
}: {
  question: Question
  userVote: number | null
  userId?: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <VoteButtons
            itemId={question.id}
            itemType="question"
            voteCount={question.vote_count}
            userVote={userVote}
            userId={userId}
          />
          <div className="flex-1">
            <h1 className="mb-3 text-balance text-2xl font-bold leading-tight md:text-3xl">{question.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {question.profiles?.display_name?.[0]?.toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <span>{question.profiles?.display_name || "Anonymous"}</span>
              </div>
              <span>•</span>
              <span>Asked {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}</span>
              <Badge variant="secondary">{question.comment_count} comments</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-pretty leading-relaxed whitespace-pre-wrap">{question.content}</p>
      </CardContent>
    </Card>
  )
}
