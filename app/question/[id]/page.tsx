import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { QuestionDetail } from "@/components/question-detail"
import { AIAnswerSection } from "@/components/ai-answer-section"
import { CommentSection } from "@/components/comment-section"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: question, error } = await supabase
    .from("questions")
    .select(`
      *,
      profiles!questions_user_id_fkey(display_name, avatar_url),
      universities(id, name)
    `)
    .eq("id", id)
    .single()

  if (error || !question) {
    notFound()
  }

  const { data: comments } = await supabase
    .from("comments")
    .select(`
      *,
      profiles!comments_user_id_fkey(display_name, avatar_url)
    `)
    .eq("question_id", id)
    .is("parent_comment_id", null)
    .order("vote_count", { ascending: false })
    .order("created_at", { ascending: true })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userVote = null
  if (user) {
    const { data } = await supabase
      .from("votes")
      .select("vote_type")
      .eq("question_id", id)
      .eq("user_id", user.id)
      .single()
    userVote = data?.vote_type || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <Link
          href={`/university/${question.universities?.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to {question.universities?.name}
        </Link>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <QuestionDetail question={question} userVote={userVote} userId={user?.id} />
            <AIAnswerSection question={question} />
            <CommentSection questionId={question.id} comments={comments || []} userId={user?.id} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {question.universities && (
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-semibold">About this university</h3>
                  <Link
                    href={`/university/${question.universities.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {question.universities.name}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
