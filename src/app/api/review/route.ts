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
  const transformedUrl = `https://uithub.com/${username}/${repo}?ext=js,jsx,ts,tsx&maxTokens=1000000`

  try {
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `You are an expert code reviewer and roaster. Please review the code from the following GitHub repository: ${transformedUrl}

      Provide a comprehensive review of the code, including:
      1. Overall structure and organization and roast it a little as well in your dialogue
      2. Code quality and best practices and roast it a little as well in your dialogue
      3. Potential bugs or issues and roast it a little as well in your dialogue
      4. Suggestions for improvement and roast it a little as well in your dialogue

      Be specific in your feedback and roast and provide examples where possible. Don't return any code or anything else other than the 4 points at all. Always write a heading and then start in a new line.`,
    })

    return NextResponse.json({ review: text })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred while generating the review.' }, { status: 500 })
  }
}

