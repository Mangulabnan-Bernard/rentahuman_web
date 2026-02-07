'use client'

import { useState } from 'react'
import { cn } from '@/app/utils/cn'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
  badge?: number
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export default function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  return (
    <div className={cn('w-full', className)}>
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              )}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-muted text-muted-foreground px-2 py-0.5 text-xs rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
