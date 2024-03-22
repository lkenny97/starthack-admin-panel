import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface KpiCardProps {
  kpiName: string,
  kpiStartValue: number,
  kpiEndValue?: number,
  onClick?: (kpiName: string) => void
}

const KpiCard = ({kpiName, kpiStartValue, kpiEndValue, onClick}: KpiCardProps) => {
  let kpiDelta = undefined

  if (kpiEndValue !== undefined) {
    kpiDelta = kpiEndValue * 100 / kpiStartValue - 100
  }

  return (
    <Card onClick={() => onClick?.(kpiName)} style={{minWidth: 250, cursor: "pointer"}}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {kpiName}
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpiEndValue ?? kpiStartValue}</div>
        <p
          style={
            kpiDelta !== undefined ?
              {
                color: kpiDelta > 0 ? "green" : kpiDelta < 0 ? "red" : undefined
              }
              : {}
          }
          className="text-xs text-muted-foreground"
        >
          {
            kpiDelta !== undefined
              ? `${kpiDelta > 0 ? "+" : ""}${kpiDelta!.toFixed(1)} % change`
              : new Date().toLocaleDateString('en-US', {
                  month: 'short', // "short" for abbreviated month name
                  year: 'numeric', // "numeric" for full year
                })}
        </p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;