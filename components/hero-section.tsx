import { GraduationCap, MessageSquare, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-24 text-primary-foreground">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered University Q&A Platform</span>
          </div>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Find Your Perfect University
          </h1>
          <p className="mb-8 text-pretty text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            Explore top universities worldwide, ask questions, and get AI-powered answers from our community of students
            and experts.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <span>15+ Universities</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Community Q&A</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span>AI Answers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
