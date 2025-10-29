// "use server"

// import { HfInference } from "@huggingface/inference"
// import { createClient } from "@/lib/supabase/server"

// const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// export async function generateUniversitySummary(universityId: string) {
//   const supabase = await createClient()

//   const { data: university } = await supabase
//     .from("universities")
//     .select("*")
//     .eq("id", universityId)
//     .single()

//   if (!university) {
//     throw new Error("University not found")
//   }

//   const prompt = `Generate a comprehensive and engaging summary about ${university.name} located in ${university.location}, ${university.country}. 
  
// Current description: ${university.description}

// Ranking: #${university.ranking} worldwide
// Student count: ${university.student_count}
// Acceptance rate: ${university.acceptance_rate}%
// Annual tuition: $${university.tuition_fee}

// Please provide:
// 1. Key academic strengths and notable programs
// 2. Campus culture and student life highlights
// 3. Notable alumni or achievements
// 4. What makes this university unique

// Keep the summary informative, engaging, and around 150-200 words.`

//   try {
//     // Using chat completion with a free model
//     const response = await hf.chatCompletion({
//       model: "meta-llama/Llama-3.2-3B-Instruct",
//       messages: [
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       max_tokens: 500,
//       temperature: 0.7,
//     })

//     console.log("Full API response:", JSON.stringify(response, null, 2))

//     const generatedText = response.choices[0]?.message?.content
    
//     if (!generatedText) {
//       throw new Error("No content generated from AI model")
//     }
    
//     console.log("Generated summary:", generatedText)
//     console.log("Generated summary length:", generatedText.length)

//     const { data: updateData, error: updateError } = await supabase
//       .from("universities")
//       .update({ ai_summary: generatedText })
//       .eq("id", universityId)
//       .select()
    
//     console.log("Update result:", updateData)
    
//     if (updateError) {
//       console.error("Error updating database:", updateError)
//       throw updateError
//     }

//     return generatedText
//   } catch (error) {
//     console.error("Error generating summary:", error)
//     throw error
//   }
// }

// export async function generateQuestionAnswer(questionId: string) {
//   const supabase = await createClient()

//   const { data: question } = await supabase
//     .from("questions")
//     .select("*, universities(name, description, ai_summary)")
//     .eq("id", questionId)
//     .single()

//   if (!question) {
//     throw new Error("Question not found")
//   }

//   const universityContext = question.universities
//     ? `University: ${question.universities.name}
// Description: ${question.universities.description}
// ${question.universities.ai_summary ? `Additional context: ${question.universities.ai_summary}` : ""}`
//     : ""

//   const prompt = `You are a helpful university admissions advisor. Answer the following question about a university:

// ${universityContext}

// Question: ${question.title}
// Details: ${question.content}

// Provide a helpful, accurate, and informative answer. Be specific and cite relevant information when possible. Keep the answer concise but comprehensive (around 150-250 words).`

//   try {
//     const response = await hf.chatCompletion({
//       model: "meta-llama/Llama-3.2-3B-Instruct",
//       messages: [
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       max_tokens: 600,
//       temperature: 0.7,
//     })

//     console.log("Full API response:", JSON.stringify(response, null, 2))

//     const generatedText = response.choices[0]?.message?.content
    
//     if (!generatedText) {
//       throw new Error("No content generated from AI model")
//     }
    
//     console.log("Generated answer:", generatedText)
//     console.log("Generated answer length:", generatedText.length)

//     const { data: updateData, error: updateError } = await supabase
//       .from("questions")
//       .update({ ai_answer: generatedText })
//       .eq("id", questionId)
//       .select()
    
//     console.log("Update result:", updateData)
    
//     if (updateError) {
//       console.error("Error updating database:", updateError)
//       throw updateError
//     }

//     return generatedText
//   } catch (error) {
//     console.error("Error generating answer:", error)
//     throw error
//   }
// }

// "use server"

// import { HfInference } from "@huggingface/inference"
// import { createClient } from "@/lib/supabase/server"
// import { revalidatePath } from "next/cache"

// console.log("[v0] HuggingFace API Key exists:", !!process.env.HUGGINGFACE_API_KEY)

// const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// export async function generateUniversitySummary(universityId: string) {
//   console.log("[v0] Starting generateUniversitySummary for:", universityId)

//   const supabase = await createClient()

//   const { data: university } = await supabase.from("universities").select("*").eq("id", universityId).single()

//   if (!university) {
//     console.log("[v0] University not found")
//     throw new Error("University not found")
//   }

//   console.log("[v0] Found university:", university.name)

//   const prompt = `Generate a comprehensive and engaging summary about ${university.name} located in ${university.location}, ${university.country}. 
  
// Current description: ${university.description}

// Ranking: #${university.ranking} worldwide
// Student count: ${university.student_count}
// Acceptance rate: ${university.acceptance_rate}%
// Annual tuition: $${university.tuition_fee}

// Please provide:
// 1. Key academic strengths and notable programs
// 2. Campus culture and student life highlights
// 3. Notable alumni or achievements
// 4. What makes this university unique

// Keep the summary informative, engaging, and around 150-200 words.`

//   try {
//     console.log("[v0] Calling HuggingFace API...")

//     const response = await hf.chatCompletion({
//       model: "meta-llama/Llama-3.2-3B-Instruct",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       max_tokens: 500,
//       temperature: 0.7,
//     })

//     console.log("[v0] HuggingFace response received:", JSON.stringify(response, null, 2))

//     const generatedText = response.choices[0]?.message?.content

//     if (!generatedText) {
//       console.log("[v0] No content generated from AI model")
//       throw new Error("No content generated from AI model")
//     }

//     console.log("[v0] Generated text length:", generatedText.length)
//     console.log("[v0] Generated text preview:", generatedText.substring(0, 100))

//     const { error: updateError } = await supabase
//       .from("universities")
//       .update({ ai_summary: generatedText })
//       .eq("id", universityId)

//     if (updateError) {
//       console.log("[v0] Database update error:", updateError)
//       throw updateError
//     }

//     console.log("[v0] Successfully updated database")

//     revalidatePath(`/university/${universityId}`)
//     revalidatePath("/")

//     console.log("[v0] Revalidated paths")

//     return generatedText
//   } catch (error) {
//     console.error("[v0] Error generating summary:", error)
//     console.error("[v0] Error details:", JSON.stringify(error, null, 2))
//     throw error
//   }
// }

// export async function generateQuestionAnswer(questionId: string) {
//   console.log("[v0] Starting generateQuestionAnswer for:", questionId)

//   const supabase = await createClient()

//   const { data: question } = await supabase
//     .from("questions")
//     .select("*, universities(name, description, ai_summary)")
//     .eq("id", questionId)
//     .single()

//   if (!question) {
//     console.log("[v0] Question not found")
//     throw new Error("Question not found")
//   }

//   console.log("[v0] Found question:", question.title)

//   const universityContext = question.universities
//     ? `University: ${question.universities.name}
// Description: ${question.universities.description}
// ${question.universities.ai_summary ? `Additional context: ${question.universities.ai_summary}` : ""}`
//     : ""

//   const prompt = `You are a helpful university admissions advisor. Answer the following question about a university:

// ${universityContext}

// Question: ${question.title}
// Details: ${question.content}

// Provide a helpful, accurate, and informative answer. Be specific and cite relevant information when possible. Keep the answer concise but comprehensive (around 150-250 words).`

//   try {
//     console.log("[v0] Calling HuggingFace API for answer...")

//     const response = await hf.chatCompletion({
//       model: "meta-llama/Llama-3.2-3B-Instruct",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       max_tokens: 600,
//       temperature: 0.7,
//     })

//     console.log("[v0] HuggingFace answer response received")

//     const generatedText = response.choices[0]?.message?.content

//     if (!generatedText) {
//       console.log("[v0] No content generated from AI model")
//       throw new Error("No content generated from AI model")
//     }

//     console.log("[v0] Generated answer length:", generatedText.length)

//     const { error: updateError } = await supabase
//       .from("questions")
//       .update({ ai_answer: generatedText })
//       .eq("id", questionId)

//     if (updateError) {
//       console.log("[v0] Database update error:", updateError)
//       throw updateError
//     }

//     console.log("[v0] Successfully updated question with AI answer")

//     revalidatePath(`/question/${questionId}`)

//     return generatedText
//   } catch (error) {
//     console.error("[v0] Error generating answer:", error)
//     console.error("[v0] Error details:", JSON.stringify(error, null, 2))
//     throw error
//   }
// }



"use server"

import { HfInference } from "@huggingface/inference"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function generateUniversitySummary(universityId: string) {
  const supabase = await createClient()

  const { data: university } = await supabase
    .from("universities")
    .select("*")
    .eq("id", universityId)
    .single()

  if (!university) throw new Error("University not found")

  const prompt = `Write a clear, professional, and engaging summary about ${university.name}, located in ${university.location}, ${university.country}.

Include the following details in **natural paragraphs** without using markdown or special symbols:
- Academic strengths and notable programs
- Campus culture and student life
- Notable alumni or achievements
- What makes this university unique

Additional info:
- Ranking: #${university.ranking || "N/A"} worldwide
- Student count: ${university.student_count || "N/A"}
- Acceptance rate: ${university.acceptance_rate !== null ? (university.acceptance_rate * 100).toFixed(1) + "%" : "N/A"}
- Tuition: $${university.tuition_fee?.toLocaleString() || "N/A"}
- Current description: ${university.description || "No description available"}

Keep it concise, engaging, and easy to read. Aim for 150-200 words.`

  const response = await hf.chatCompletion({
    model: "meta-llama/Llama-3.2-3B-Instruct",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
  })

  const generatedText = response.choices[0]?.message?.content
  if (!generatedText) throw new Error("No content generated from AI model")

  const { error } = await supabase
    .from("universities")
    .update({ ai_summary: generatedText })
    .eq("id", universityId)

  if (error) throw error

  revalidatePath(`/university/${universityId}`)
  revalidatePath("/")

  return generatedText
}
