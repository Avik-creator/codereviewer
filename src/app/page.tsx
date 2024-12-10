'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { RocketIcon, LightningBoltIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import { CodeReviewForm } from '@/components/codereview-form'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-6xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Fantastic Code Review
        </h1>
        <p className="text-2xl text-center mb-12 text-gray-300">
          Unleash the power of AI to revolutionize your code!
        </p>

        <Card className="bg-gray-900 border-gray-800 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <CodeReviewForm />
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            { icon: LightningBoltIcon, title: "Lightning Fast", description: "Get instant reviews powered by cutting-edge AI" },
            { icon: CheckCircledIcon, title: "Unparalleled Accuracy", description: "Benefit from precise and insightful code analysis" },
            { icon: RocketIcon, title: "Skyrocket Your Skills", description: "Level up your coding prowess with each review" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 mb-4 text-purple-500" />
              <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-purple-900 to-transparent opacity-50"
      />
    </div>
  )
}

