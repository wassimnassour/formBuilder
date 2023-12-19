import React, { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const CardsStatsWrapper = () => {
  return (
    <div className="grid grid-cols-2 gap-x-6  mx-auto mt-4">
      <StatsCard
        title="Total Forms"
        helperText="Visits that result in form submission"
        value={44 + "%" || ""}
        loading={false}
        className="shadow-md shadow-blue-600   mt-4"
      />
      <StatsCard
        title="Total Submissions"
        helperText="Visits that result in form submission"
        value={34 + "%" || ""}
        loading={false}
        className="shadow-md shadow-green-600   mt-4"
      />
      <StatsCard
        title="Bounce Rates"
        helperText="Visits that result in form submission"
        value={12 + "%" || ""}
        loading={false}
        className="shadow-md shadow-red-600 w-full  mt-4"
      />
      <StatsCard
        title="Total Submissions"
        helperText="Visits that result in form submission"
        value={10 + "%" || ""}
        loading={false}
        className="shadow-md shadow-yellow-600 w-full  mt-4"
      />
    </div>
  )
}

export function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string
  value: string
  helperText: string
  className: string
  loading: boolean
  icon?: ReactNode
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold ">
          {loading && (
            // <Skeleton>
            <span className="opacity-0">0</span>
            // </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-gray-400 pt-1">{helperText}</p>
      </CardContent>
    </Card>
  )
}
