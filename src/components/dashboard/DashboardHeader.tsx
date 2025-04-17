
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

interface DashboardHeaderProps {
  agentName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ agentName }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-none shadow-lg mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2 pulse-animation"></div>
              <p className="text-xs font-medium text-green-400">LIVE</p>
            </div>
            <h2 className="text-2xl font-bold">{agentName}</h2>
            <p className="text-muted-foreground">
              Actively responding to leads and booking calls
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-blue-500/30 bg-blue-900/20 hover:bg-blue-900/30">
              <Activity className="mr-2 h-4 w-4" />
              Agent Status
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Performance Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
