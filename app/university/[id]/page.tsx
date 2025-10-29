import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { UniversityHeader } from "@/components/university-header"
import { UniversityStats } from "@/components/university-stats"
import { UniversitySummary } from "@/components/university-summary"
import { QuestionsList } from "@/components/questions-list"
import { AskQuestionButton } from "@/components/ask-question-button"

export default async function UniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: university, error } = await supabase.from("universities").select("*").eq("id", id).single()

  if (error || !university) {
    notFound()
  }

  const { data: questions } = await supabase
    .from("questions")
    .select(`
      *,
      profiles!questions_user_id_fkey(display_name, avatar_url)
    `)
    .eq("university_id", id)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <UniversityHeader university={university} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <UniversitySummary university={university} />
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Questions & Answers</h2>
              <AskQuestionButton universityId={university.id} />
            </div>
            <QuestionsList questions={questions || []} />
          </div>
          <div className="lg:col-span-1">
            <UniversityStats university={university} />
          </div>
        </div>
      </main>
    </div>
  )
}
