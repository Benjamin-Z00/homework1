"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Copy } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { useTranslations } from 'next-intl'

interface ResponseDisplayProps {
  responses: string[]
  onReset: () => void
}

export default function ResponseDisplay({ responses, onReset }: ResponseDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { toast } = useToast()
  const t = useTranslations('Response')

  if (!responses || !responses.length) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border border-gray-800 shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">{t('noResponseTitle')}</p>
          <Button 
            onClick={onReset}
            className="mt-4 bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            {t('restartButton')}
          </Button>
        </CardContent>
      </Card>
    )
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    toast({
      title: t('copiedTitle'),
      description: t('copiedDesc'),
    })
    
    // Reset the copied state after 2 seconds
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      className="w-full max-w-xl"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <Card className="bg-black/40 backdrop-blur-sm border border-gray-800 shadow-lg mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-center text-gray-100">
            {t('title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {responses.map((response, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-900/70 border border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-4 relative">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  <p className="text-gray-200 pr-8">{response}</p>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-3 text-gray-400 hover:text-white hover:bg-gray-800"
                    onClick={() => handleCopy(response, index)}
                  >
                    <Copy size={16} className={copiedIndex === index ? "text-green-500" : ""} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <Button 
            onClick={onReset}
            className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            {t('restartButton')}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}