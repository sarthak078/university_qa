// import fs from "fs";
// import path from "path";
// import Papa from "papaparse";
// import { createClient } from "@supabase/supabase-js";

// // ⚡ Hardcode your Supabase credentials here
// const supabaseUrl = "https://vgupqkmkpplbdeafcybe.supabase.co"; // replace with your SUPABASE_URL
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndXBxa21rcHBsYmRlYWZjeWJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQyMzkxMCwiZXhwIjoyMDc2OTk5OTEwfQ._fEvL4izbfKcaRhrgrLpmXjx-AqqkzahPPE1NbaAaNM"; // replace with your SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey);

// // Path to your CSV file
// const csvFilePath = "/Users/sarthakpokhrel/Documents/university-qa/university_qa/university.csv";

// // Read CSV
// const fileContent = fs.readFileSync(csvFilePath, "utf-8");

// // Parse CSV
// const results = Papa.parse(fileContent, {
//   header: true,
//   skipEmptyLines: true,
// });

// // Map CSV rows to Supabase schema
// const universities = results.data.map((row: any) => ({
//   name: row.name,
//   location: row.Location,
//   country: row.country || "USA",
//   // ranking: row.ranking ? Number(row.ranking) : null,
//   // student_count: row.student_count ? Number(row.student_count) : null,
//   // acceptance_rate: row.acceptance_rate ? Number(row.acceptance_rate) : null,
//   // tuition_fee: row.tuition_fee ? Number(row.tuition_fee) : null,
//   // description: row.description || "",
// }));

// // Insert into Supabase
// async function insertUniversities() {
//   try {
//     for (const uni of universities) {
//       const { data, error } = await supabase.from("universities").insert(uni).select();
//       if (error) {
//         console.error("Error inserting:", uni.name, error);
//       } else {
//         console.log("Inserted:", uni.name);
//       }
//     }
//     console.log("All universities processed!");
//   } catch (err) {
//     console.error("Unexpected error:", err);
//   }
// }

// insertUniversities();
// university.ts
// import fetch from "node-fetch";
// import { createClient } from "@supabase/supabase-js";

// // 🔹 Your Supabase credentials
// const SUPABASE_URL = "https://vgupqkmkpplbdeafcybe.supabase.co";
// const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndXBxa21rcHBsYmRlYWZjeWJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQyMzkxMCwiZXhwIjoyMDc2OTk5OTEwfQ._fEvL4izbfKcaRhrgrLpmXjx-AqqkzahPPE1NbaAaNM"; // use service role key for writes
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// // 🔹 College Scorecard API key (get it from https://api.data.gov/signup/)
// const API_KEY = "WkKEsaq4fsuRGVtaJ6vRBySLt5dyWjUWnHScvCOu";

// // 🔹 Fetch universities from College Scorecard API
// async function fetchUniversities(page: number = 0) {
//   const perPage = 100;
//   const fields = [
//     "id",
//     "school.name",
//     "school.state",
//     "school.school_url",
//     "latest.student.size",
//     "latest.cost.tuition.in_state",
//     "latest.cost.tuition.out_of_state",
//     "latest.admissions.admission_rate.overall", // ✅ acceptance rate
//   ].join(",");

//   const url = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${API_KEY}&fields=${fields}&per_page=${perPage}&page=${page}`;

//   const response = await fetch(url);
//   if (!response.ok) throw new Error(`HTTP ${response.status}`);
//   const data = (await response.json()) as any;
//   return data.results;

// }

// // 🔹 Insert university records into Supabase
// async function insertIntoSupabase(universities: any[]) {
//   for (const uni of universities) {
//     const { error } = await supabase.from("universities").insert({
//       name: uni["school.name"],
//       website: uni["school.school_url"],
//       student_count: uni["latest.student.size"],
//       tuition_in_state: uni["latest.cost.tuition.in_state"],
//       tuition_out_state: uni["latest.cost.tuition.out_of_state"],
//       acceptance_rate: uni["latest.admissions.admission_rate.overall"]
//         ? uni["latest.admissions.admission_rate.overall"] * 100 // convert to %
//         : null,
//     });

//     if (error) {
//       console.error(`❌ Error inserting ${uni["school.name"]}:`, error.message);
//     } else {
//       console.log(`✅ Inserted: ${uni["school.name"]}`);
//     }
//   }
// }

// // 🔹 Fetch all pages (auto pagination)
// async function main() {
//   let page = 0;
//   const maxPages = 5; // adjust this if you want more data
//   while (page < maxPages) {
//     console.log(`📦 Fetching page ${page + 1}`);
//     const universities = await fetchUniversities(page);
//     if (universities.length === 0) break;
//     await insertIntoSupabase(universities);
//     page++;
//     await new Promise((r) => setTimeout(r, 1000)); // delay to respect rate limit
//   }

//   console.log("🎓 All universities imported successfully!");
// }

// main().catch(console.error);



// import fetch from "node-fetch";
// import { createClient } from "@supabase/supabase-js";

// // 🧩 Supabase setup
// const SUPABASE_URL = 'https://vgupqkmkpplbdeafcybe.supabase.co';
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndXBxa21rcHBsYmRlYWZjeWJlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQyMzkxMCwiZXhwIjoyMDc2OTk5OTEwfQ._fEvL4izbfKcaRhrgrLpmXjx-AqqkzahPPE1NbaAaNM';
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// // 🎓 College Scorecard API
const COLLEGE_SCORECARD_API_KEY= 'WkKEsaq4fsuRGVtaJ6vRBySLt5dyWjUWnHScvCOu';
// const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools";

// // 📦 Fetch universities from College Scorecard API
// async function fetchUniversities(page = 0, perPage = 50) {
//   const url = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${COLLEGE_SCORECARD_API_KEY}&fields=id,school.name,school.city,school.state,school.school_url,school.mission_statement,student.size,admissions.admission_rate.overall,cost.tuition.in_state&per_page=${perPage}&page=${page}`;

//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   const data: any = await res.json();
//   return data.results || [];
// }

// // 🧩 Insert university data into Supabase
// async function insertUniversityRaw(raw: any) {
//   const name = raw["school.name"];
//   if (!name) {
//     console.warn("⚠️ Skipping university with missing name", raw);
//     return;
//   }

//   const { error } = await supabase.from("universities").insert({
//     name,
//     location: `${raw["school.city"] ?? ""}, ${raw["school.state"] ?? ""}`,
//     country: "United States",
//     ranking: null, // Not provided by API
//     description: raw["school.mission_statement"] ?? null,
//     website_url: raw["school.school_url"] ?? null,
//     logo_url: null, // Optional
//     student_count: raw["student.size"] ?? null,
//     acceptance_rate: raw["admissions.admission_rate.overall"] ?? null,
//     tuition_fee: raw["cost.tuition.in_state"] ?? null,
//     ai_summary: null,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   });

//   if (error) {
//     console.error(`❌ Error inserting ${name}:`, error.message);
//   } else {
//     console.log(`✅ Inserted: ${name}`);
//   }
// }

// // 🚀 Main function
// async function main() {
//   console.log("📦 Fetching university data from College Scorecard API...");
//   let page = 0;
//   let totalInserted = 0;
//   const perPage = 100; // fetch 100 per page

//   while (true) {
//     console.log(`📄 Fetching page ${page + 1}`);
//     try {
//       const universities = await fetchUniversities(page, perPage);
//       if (!universities || universities.length === 0) break;

//       for (const uni of universities) {
//         await insertUniversityRaw(uni);
//         totalInserted++;
//       }

//       page++;
//     } catch (err: any) {
//       console.error("❌ Fetch error:", err.message);
//       break;
//     }
//   }

//   console.log(`🎉 Done! Inserted ${totalInserted} universities into Supabase.`);
// }

// // Run script
// main().catch((err) => console.error("Fatal error:", err));





async function fetchFordham() {
  const url = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${COLLEGE_SCORECARD_API_KEY}&id=191241`; // Fordham ID

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: any = await res.json();

  console.log("Fordham full data:", JSON.stringify(data.results[0], null, 2));
}

fetchFordham();
