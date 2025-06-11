"use client"

import { cn } from "@/lib/utils"

interface ActivityHeatmapProps {
  title?: string
  className?: string
}

export function ActivityHeatmap({ title = "Activity", className }: ActivityHeatmapProps) {
  // Generate mock activity data for the past year
  const generateActivityData = () => {
    const data = []
    const today = new Date()
    const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const activity = Math.floor(Math.random() * 5) // 0-4 activity levels
      data.push({
        date: new Date(d).toISOString().split("T")[0],
        count: activity,
      })
    }
    return data
  }

  const activityData = generateActivityData()

  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-muted"
    if (count === 1) return "bg-primary/20"
    if (count === 2) return "bg-primary/40"
    if (count === 3) return "bg-primary/60"
    return "bg-primary"
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-mono text-sm text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-53 gap-1 max-w-4xl">
        {activityData.map((day, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-sm transition-colors hover:ring-1 hover:ring-primary",
              getActivityColor(day.count),
            )}
            title={`${day.date}: ${day.count} contributions`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>Less</span>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={cn("w-3 h-3 rounded-sm", getActivityColor(level))} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
