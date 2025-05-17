
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface Client {
  id: string;
  company_name: string;
}

interface Metric {
  id: string;
  client_id: string;
  metric_name: string;
  metric_value: number;
  date: string;
}

interface MetricData {
  name: string;
  value: number;
}

const Metrics = () => {
  const { isAdmin, userProfile } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [chartData, setChartData] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch clients if admin
  useEffect(() => {
    const fetchClients = async () => {
      if (!isAdmin) {
        // For client users, just use their client_id
        setSelectedClientId(userProfile?.client_id || null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('clients')
          .select('id, company_name')
          .order('company_name');

        if (error) throw error;
        
        setClients(data as Client[]);
        
        // If there are clients, select the first one by default
        if (data && data.length > 0) {
          setSelectedClientId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load clients."
        });
      }
    };

    fetchClients();
  }, [isAdmin, userProfile, toast]);

  // Fetch metrics when selected client changes
  useEffect(() => {
    const fetchMetrics = async () => {
      if (!selectedClientId) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('metrics')
          .select('*')
          .eq('client_id', selectedClientId)
          .order('date', { ascending: false });

        if (error) throw error;
        
        setMetrics(data as Metric[]);
        
        // Transform data for the chart
        const processedData = (data as Metric[]).reduce((acc: Record<string, number>, metric) => {
          if (!acc[metric.metric_name]) {
            acc[metric.metric_name] = 0;
          }
          acc[metric.metric_name] += Number(metric.metric_value);
          return acc;
        }, {});
        
        const chartData = Object.entries(processedData).map(([name, value]) => ({
          name,
          value
        }));
        
        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load metrics."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [selectedClientId, toast]);

  // Handle client selection
  const handleClientChange = (value: string) => {
    setSelectedClientId(value);
  };

  // Get selected client name
  const getSelectedClientName = () => {
    if (!selectedClientId) return '';
    
    const client = clients.find(c => c.id === selectedClientId);
    return client ? client.company_name : '';
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Performance Metrics</h1>
          {isAdmin && selectedClientId && (
            <div className="w-64">
              <Select value={selectedClientId} onValueChange={handleClientChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  {isAdmin 
                    ? `Metrics for ${getSelectedClientName()}` 
                    : 'Your Performance Metrics'}
                </CardTitle>
                <CardDescription>
                  Key performance indicators for the selected client
                </CardDescription>
              </CardHeader>
              <CardContent>
                {chartData.length > 0 ? (
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#0284c7" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No metrics data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {isAdmin && selectedClientId && (
              <Card>
                <CardHeader>
                  <CardTitle>Raw Metrics Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Metric</th>
                          <th className="px-4 py-2 text-left">Value</th>
                          <th className="px-4 py-2 text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metrics.length > 0 ? (
                          metrics.map((metric) => (
                            <tr key={metric.id} className="border-b hover:bg-muted/50">
                              <td className="px-4 py-2">{metric.metric_name}</td>
                              <td className="px-4 py-2">{metric.metric_value}</td>
                              <td className="px-4 py-2">
                                {new Date(metric.date).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="px-4 py-8 text-center">
                              No metrics data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Metrics;
