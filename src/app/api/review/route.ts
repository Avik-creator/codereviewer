import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  const { url } = await req.json()
  
  // Transform the URL
  const parsedUrl = new URL(url)
  const [, username, repo] = parsedUrl.pathname.split('/')
  const transformedUrl = `https://uithub.com/${username}/${repo}?ext=js,jsx,ts,tsx`

  try {
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `You are an expert code reviewer. Please review the code from the following GitHub repository: ${transformedUrl}

      Provide a comprehensive review of the code, including:
      1. Overall structure and organization
      2. Code quality and best practices
      3. Potential bugs or issues
      4. Suggestions for improvement

      Be specific in your feedback and provide examples where possible. Don't return any code or anything else other than the 4 points at all.`,
    })

    return NextResponse.json({ review: text })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while generating the review.' }, { status: 500 })
  }
}

