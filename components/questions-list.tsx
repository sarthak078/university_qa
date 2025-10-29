import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

type Question = {
  id: string
  title: string
  content: string
  vote_count: number
  comment_count: number
  ai_answer: string | null
  created_at: string
  profiles: {
    display_name: string
    avatar_url: string | null
  } | null
}

export function QuestionsList({ questions }: { questions: Question[] }) {
  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-[200px] items-center justify-center">
          <div className="text-center">
            <MessageSquare className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium">No questions yet</p>
            <p className="text-sm text-muted-foreground">Be the first to ask a question about this university!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Link key={question.id} href={`/question/${question.id}`}>
          <Card className="transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-2 text-balance text-lg font-semibold leading-tight hover:text-primary transition-colors">
                    {question.title}
                  </h3>
                  <p className="mb-3 text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {question.content}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      Asked by {question.profiles?.display_name || "Anonymous"} •{" "}
                      {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
                    </span>
                    {question.ai_answer && (
                      <Badge variant="secondary" className="gap-1 bg-accent/10 text-accent">
                        <Sparkles className="h-3 w-3" />
                        AI Answered
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{question.vote_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{question.comment_count} comments</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
