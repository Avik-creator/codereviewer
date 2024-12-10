'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { CodeIcon, RocketIcon } from '@radix-ui/react-icons'
import ReactMarkdown from "react-markdown";

export function CodeReviewForm() {
  const [url, setUrl] = useState('')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      setReview(data.review)
    } catch (error) {
      console.error('Error:', error)
      setReview('An error occurred while fetching the review.')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <CodeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="url"
            placeholder="Enter GitHub repository URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          disabled={loading}
        >
          <RocketIcon className="mr-2" />
          {loading ? 'Launching Review...' : 'Launch Mind-Blowing Review'}
        </Button>
      </form>
      {review && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Cosmic Code Insights
          </h2>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <ReactMarkdown 
                className="prose prose-invert max-w-none"
                components={{
                  h1: ({...props}) => <h1 className="text-xl font-bold mb-2 text-purple-400" {...props} />,
                  h2: ({...props}) => <h2 className="text-lg font-semibold mb-2 text-pink-400" {...props} />,
                  p: ({...props}) => <p className="mb-4 text-gray-300" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-5 mb-4 text-gray-300" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal pl-5 mb-4 text-gray-300" {...props} />,
                  li: ({...props}) => <li className="mb-1" {...props} />,
                  code: ({...props}) => <code className="bg-gray-700 rounded px-1 py-0.5 text-pink-300" {...props} />,
                }}
              >
                {review}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
