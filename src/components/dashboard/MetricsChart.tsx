
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface MetricsChartProps {
  metrics: Array<{
    leads_handled: number;
    leads_qualified: number;
    calls_booked: number;
    deals_closed: number;
    date: string;
  }>;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Process data for the chart
  const chartData = metrics.map(metric => ({
    date: formatDate(metric.date),
    'Leads Handled': metric.leads_handled,
    'Qualified': metric.leads_qualified,
    'Booked Calls': metric.calls_booked,
    'Closed Deals': metric.deals_closed
  }));

  const config = {
    'Leads Handled': { color: '#3b82f6' },   // blue
    'Qualified': { color: '#10b981' },       // green
    'Booked Calls': { color: '#8b5cf6' },    // purple
    'Closed Deals': { color: '#f59e0b' }     // amber
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={config}
        className="h-full"
      >
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8' }} 
            tickLine={{ stroke: '#334155' }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8' }}
            tickLine={{ stroke: '#334155' }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dashed"
                labelKey="date"
              />
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Leads Handled"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, fill: '#3b82f6' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Qualified"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Booked Calls"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4, fill: '#8b5cf6' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Closed Deals"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 4, fill: '#f59e0b' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default MetricsChart;
