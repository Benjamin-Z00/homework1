"use client"

import React, { useState } from 'react'
import ProcrastinationForm from '@/components/ProcrastinationForm'
import ResponseDisplay from '@/components/ResponseDisplay'
import { motion } from 'framer-motion'

export default function Home() {
  const [responses, setResponses] = useState<string[]>([])
  
  const handleResponses = (newResponses: string[]) => {
    setResponses(newResponses)
  }
  
  const handleReset = () => {
    setResponses([])
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="flex-1 w-full flex flex-col items-center justify-center">
      <header className="w-full max-w-xl text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent">
            拒绝拖延
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            告别拖延，从现在开始。输入你的拖延想法，获取个性化的克服方案。
          </p>
        </motion.div>
      </header>
      
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {responses.length > 0 ? (
          <ResponseDisplay responses={responses} onReset={handleReset} />
        ) : (
          <ProcrastinationForm onResponses={handleResponses} />
        )}
      </motion.div>
      
      </div>
      <footer className="w-full pt-8 pb-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} 拒绝拖延 | Powered by DeepSeek AI
      </footer>
    </div>
  )
}