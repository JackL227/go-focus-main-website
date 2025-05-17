
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Users, BarChart3, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardMetrics {
  totalClients: number;
  activeClients: number;
  pendingClients: number;
  totalMetrics: number;
  clientName?: string;
}

const Dashboard = () => {
  const { userProfile, isAdmin } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalClients: 0,
    activeClients: 0,
    pendingClients: 0,
    totalMetrics: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data based on user role
        if (isAdmin) {
          // For admin users, fetch global metrics
          const [clientsResult, metricsResult] = await Promise.all([
            supabase.from('clients').select('*'),
            supabase.from('metrics').select('*')
          ]);

          if (clientsResult.error) throw clientsResult.error;
          if (metricsResult.error) throw metricsResult.error;

          const clients = clientsResult.data;
          
          setMetrics({
            totalClients: clients.length,
            activeClients: clients.filter(c => c.status === 'active').length,
            pendingClients: clients.filter(c => c.status === 'pending').length,
            totalMetrics: metricsResult.data.length
          });
        } else {
          // For client users, fetch only their data
          if (!userProfile?.client_id) {
            setMetrics({
              totalClients: 0,
              activeClients: 0,
              pendingClients: 0,
              totalMetrics: 0
            });
            return;
          }
          
          const [clientResult, metricsResult] = await Promise.all([
            supabase.from('clients').select('*').eq('id', userProfile.client_id).single(),
            supabase.from('metrics').select('*').eq('client_id', userProfile.client_id)
          ]);

          if (metricsResult.error) throw metricsResult.error;
          
          setMetrics({
            totalClients: 1,
            activeClients: clientResult.data?.status === 'active' ? 1 : 0,
            pendingClients: clientResult.data?.status === 'pending' ? 1 : 0,
            totalMetrics: metricsResult.data.length,
            clientName: clientResult.data?.company_name
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          variant: "destructive",
          title: "Error loading dashboard",
          description: "There was a problem loading your dashboard data."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [userProfile, isAdmin, toast]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {isAdmin ? 'Admin Dashboard' : 'Client Dashboard'}
          </h1>
          {metrics.clientName && (
            <Badge variant="outline" className="text-sm">
              {metrics.clientName}
            </Badge>
          )}
        </div>

        {!isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isAdmin && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalClients}</div>
                  <p className="text-xs text-muted-foreground">
                    Companies using our platform
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.activeClients}</div>
                <p className="text-xs text-muted-foreground">
                  With active status
                </p>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Clients</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.pendingClients}</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting approval
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalMetrics}</div>
                <p className="text-xs text-muted-foreground">
                  Performance datapoints
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Welcome message and next steps */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Welcome{userProfile?.full_name ? `, ${userProfile.full_name}` : ''}!</CardTitle>
            <CardDescription>
              {isAdmin 
                ? "You have admin access to manage clients, view performance metrics, and handle support requests." 
                : "View your performance metrics and submit support requests."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Getting Started:</h3>
              <ul className="ml-6 space-y-1 list-disc">
                {isAdmin ? (
                  <>
                    <li>Manage clients from the Clients tab</li>
                    <li>View performance metrics across all clients</li>
                    <li>Handle support tickets from the Support tab</li>
                  </>
                ) : (
                  <>
                    <li>View your performance metrics on the Metrics tab</li>
                    <li>Submit a support request if you need assistance</li>
                    <li>Update your profile information in Settings</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
