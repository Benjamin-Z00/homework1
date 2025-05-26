"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getEntries, ProcrastinationEntry } from '@/lib/localStorage'
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer"
import { History } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function HistoryDrawer() {
  const [entries, setEntries] = useState<ProcrastinationEntry[]>([])
  
  // Load history from localStorage when component mounts
  useEffect(() => {
    const loadEntries = () => {
      const storedEntries = getEntries()
      setEntries(storedEntries)
    }
    
    // Initial load
    loadEntries()
    
    // Set up an interval to check for new entries every few seconds
    const intervalId = setInterval(loadEntries, 5000)
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])
  
  if (entries.length === 0) {
    return null // Don't show the history button if there are no entries
  }
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600"
        >
          <History className="h-5 w-5 text-blue-400" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black/90 border-t border-gray-800">
        <div className="mx-auto w-full max-w-xl">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-100">历史记录</h2>
            <ScrollArea className="h-[50vh] rounded-md">
              <div className="space-y-4 px-1">
                {entries.map((entry) => (
                  <div 
                    key={entry.id}
                    className="bg-gray-900/70 rounded-lg border border-gray-800 p-4 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-200 text-sm">
                        {entry.thought.length > 50 
                          ? `${entry.thought.substring(0, 50)}...` 
                          : entry.thought}
                      </h3>
                      <span className="text-xs text-gray-400 ml-2">
                        {formatDistanceToNow(new Date(entry.timestamp), { 
                          addSuffix: true,
                          locale: zhCN 
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      拖延程度: <span className="text-gray-400">{entry.severity}/10</span>
                    </div>
                    <div className="space-y-2">
                      {entry.responses.map((response, idx) => (
                        <p key={idx} className="text-sm text-gray-300 pl-2 border-l border-gray-700">
                          {response}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex justify-center p-4">
            <DrawerClose asChild>
              <Button 
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                关闭
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}