"use client"

import React, { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getAntiProcrastinationResponses } from '@/lib/openrouter'
import { saveEntry } from '@/lib/localStorage'
import { Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface ProcrastinationFormProps {
  onResponses: (responses: string[]) => void
}

export default function ProcrastinationForm({ onResponses }: ProcrastinationFormProps) {
  const [thought, setThought] = useState('')
  const [severity, setSeverity] = useState([5])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!thought.trim()) {
      toast({
        title: "请输入拖延的想法",
        description: "请先告诉我你在拖延什么",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      const responses = await getAntiProcrastinationResponses(thought, severity[0])
      
      // Save to localStorage
      saveEntry({
        thought,
        severity: severity[0],
        responses
      })

      onResponses(responses)
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "获取回复失败",
        description: "请稍后再试",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-xl bg-black/40 backdrop-blur-sm border border-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          拒绝拖延
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="thought" className="text-gray-300">
              你正在拖延什么?
            </Label>
            <Textarea
              id="thought"
              placeholder="例如: 我应该开始写报告，但我一直在刷手机..."
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              className="h-32 bg-gray-900/70 border-gray-700 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="severity" className="text-gray-300">
              拖延严重程度: {severity[0]}
            </Label>
            <div className="py-2">
              <Slider
                id="severity"
                defaultValue={[5]}
                min={1}
                max={10}
                step={1}
                value={severity}
                onValueChange={setSeverity}
                disabled={isLoading}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>轻度拖延</span>
                <span>严重拖延</span>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 transition-all duration-300 font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                正在思考...
              </>
            ) : (
              "开始拒绝拖延"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}