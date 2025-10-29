import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { AskQuestionForm } from "@/components/ask-question-form"

export default async function AskQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: university } = await supabase.from("universities").select("id, name").eq("id", id).single()

  if (!university) {
    notFound()
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/auth/login?redirect=/university/${id}/ask`)
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Ask a Question</h1>
        <p className="text-muted-foreground">
          Ask anything about <span className="font-medium text-foreground">{university.name}</span>
        </p>
      </div>
      <AskQuestionForm universityId={university.id} />
    </div>
  )
}
