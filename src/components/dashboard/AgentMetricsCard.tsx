
import React, { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from 'lucide-react';

interface AgentMetricsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend: string;
  trendUp: boolean;
}

const AgentMetricsCard: React.FC<AgentMetricsCardProps> = ({ 
  title, 
  value, 
  icon,
  trend,
  trendUp
}) => {
  return (
    <Card className="glass-card hover-lift border-t-2 border-t-primary/20">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 rounded-full bg-background/30">
            {icon}
          </div>
          <div className={`flex items-center text-xs font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            {trendUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {trend}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value.toLocaleString()}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentMetricsCard;
