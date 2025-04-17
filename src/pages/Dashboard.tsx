
import { useState, useEffect } from "react";
import { useAuth } from "@/App";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, Check, ChevronRight, LogOut, Plus, User, DollarSign, MessageCircle, ArrowUpRight } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AgentMetricsCard from "@/components/dashboard/AgentMetricsCard";
import MetricsChart from "@/components/dashboard/MetricsChart";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Define types for agent data
type Agent = {
  id: string;
  name: string;
  type: string;
};

type Metrics = {
  leads_handled: number;
  leads_qualified: number;
  calls_booked: number;
  deals_closed: number;
  date: string;
};

// Demo data for initial rendering
const demoAgents: Agent[] = [
  { id: "1", name: "Trading Mentor AI", type: "Voice Agent" },
  { id: "2", name: "Med Spa Assistant", type: "Chat Agent" },
  { id: "3", name: "Vehicle Wrap Specialist", type: "Text Agent" }
];

const demoMetrics: Record<string, Metrics[]> = {
  "1": Array(7).fill(null).map((_, i) => ({
    leads_handled: 25 + Math.floor(Math.random() * 15),
    leads_qualified: 12 + Math.floor(Math.random() * 10),
    calls_booked: 5 + Math.floor(Math.random() * 5),
    deals_closed: 2 + Math.floor(Math.random() * 3),
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })),
  "2": Array(7).fill(null).map((_, i) => ({
    leads_handled: 30 + Math.floor(Math.random() * 20),
    leads_qualified: 18 + Math.floor(Math.random() * 12),
    calls_booked: 8 + Math.floor(Math.random() * 7),
    deals_closed: 3 + Math.floor(Math.random() * 4),
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })),
  "3": Array(7).fill(null).map((_, i) => ({
    leads_handled: 15 + Math.floor(Math.random() * 10),
    leads_qualified: 8 + Math.floor(Math.random() * 7),
    calls_booked: 3 + Math.floor(Math.random() * 4),
    deals_closed: 1 + Math.floor(Math.random() * 2),
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }))
};

const demoNotifications = [
  { id: "1", message: "3 new bookings from Med Spa Assistant", time: "Just now", type: "booking" },
  { id: "2", message: "5 leads revived by Trading Mentor AI", time: "1 hour ago", type: "lead" },
  { id: "3", message: "2 deals closed by Vehicle Wrap Specialist", time: "3 hours ago", type: "deal" },
  { id: "4", message: "Customer feedback: 'The AI agent was amazing!'", time: "Yesterday", type: "feedback" },
  { id: "5", message: "Weekly performance report is ready", time: "2 days ago", type: "report" }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [timeframe, setTimeframe] = useState("week");
  const navigate = useNavigate();

  // Fetch user profile and agents
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) return;

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch user agents or use demo agents
        const { data: agentsData, error: agentsError } = await supabase
          .from("ai_agents")
          .select("*")
          .eq("user_id", user.id);

        if (agentsError) throw agentsError;
        
        // If no agents found, use demo agents
        const finalAgents = agentsData && agentsData.length > 0 ? agentsData : demoAgents;
        setAgents(finalAgents);
        setSelectedAgentId(finalAgents[0]?.id || "");
        
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        // Use demo data if error
        setAgents(demoAgents);
        setSelectedAgentId(demoAgents[0]?.id || "");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Sign out function
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Get metrics for selected agent and timeframe
  const getMetricsForSelectedAgent = () => {
    return selectedAgentId && demoMetrics[selectedAgentId] ? 
      demoMetrics[selectedAgentId] : [];
  };

  // Calculate today's metrics
  const getTodayMetrics = () => {
    const metrics = getMetricsForSelectedAgent();
    return metrics.length > 0 ? metrics[metrics.length - 1] : {
      leads_handled: 0,
      leads_qualified: 0,
      calls_booked: 0,
      deals_closed: 0,
      date: new Date().toISOString().split('T')[0]
    };
  };

  const todayMetrics = getTodayMetrics();
  const selectedAgent = agents.find(agent => agent.id === selectedAgentId) || agents[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050A14] to-[#0A1428]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {profile?.full_name || user?.email || "User"}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Agent Selector */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Select
              value={selectedAgentId}
              onValueChange={setSelectedAgentId}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name} ({agent.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Tabs defaultValue="week" value={timeframe} onValueChange={setTimeframe}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Dashboard Header */}
        <DashboardHeader agentName={selectedAgent?.name || "Your AI Agent"} />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AgentMetricsCard 
            title="Leads Handled" 
            value={todayMetrics.leads_handled}
            icon={<MessageCircle className="h-5 w-5 text-blue-400" />}
            trend="+12%"
            trendUp={true}
          />
          <AgentMetricsCard 
            title="Qualified" 
            value={todayMetrics.leads_qualified}
            icon={<Check className="h-5 w-5 text-green-400" />}
            trend="+8%"
            trendUp={true}
          />
          <AgentMetricsCard 
            title="Booked Calls" 
            value={todayMetrics.calls_booked}
            icon={<Calendar className="h-5 w-5 text-purple-400" />}
            trend="+5%"
            trendUp={true}
          />
          <AgentMetricsCard 
            title="Closed Deals" 
            value={todayMetrics.deals_closed}
            icon={<DollarSign className="h-5 w-5 text-amber-400" />}
            trend="+15%"
            trendUp={true}
          />
        </div>

        {/* Charts and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Agent activity over time
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <MetricsChart metrics={getMetricsForSelectedAgent()} />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Notifications</CardTitle>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Recent agent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsPanel notifications={demoNotifications} />
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Button className="bg-primary hover:bg-primary/90">
            View Agent Live
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="secondary">
            Request Agent Update
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
