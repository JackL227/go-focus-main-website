
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface SupportTicket {
  id: string;
  client_id: string;
  user_id: string;
  subject: string;
  description: string;
  priority: string;
  category: string;
  status: string;
  created_at: string;
  client?: {
    company_name: string;
  };
}

interface TicketFormData {
  subject: string;
  description: string;
  priority: string;
  category: string;
}

const priorityColors: Record<string, string> = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

const statusColors: Record<string, string> = {
  open: 'bg-green-100 text-green-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-blue-100 text-blue-800',
  closed: 'bg-gray-100 text-gray-800'
};

const Support = () => {
  const { user, userProfile, isAdmin } = useAuth();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TicketFormData>({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'technical',
  });
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        let query = supabase
          .from('support_tickets')
          .select('*, client:clients(company_name)');
          
        // If not admin, only show tickets from this user's client
        if (!isAdmin && userProfile?.client_id) {
          query = query.eq('client_id', userProfile.client_id);
        }
          
        query = query.order('created_at', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setTickets(data as SupportTicket[]);
      } catch (error) {
        console.error('Error fetching support tickets:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load support tickets."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [user, userProfile, isAdmin, toast]);

  const handleAddTicket = async () => {
    if (!user?.id || !userProfile?.client_id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User information is missing."
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert([
          {
            client_id: userProfile.client_id,
            user_id: user.id,
            subject: formData.subject,
            description: formData.description,
            priority: formData.priority,
            category: formData.category,
            status: 'open'
          },
        ])
        .select('*, client:clients(company_name)');

      if (error) throw error;

      setTickets([data[0], ...tickets]);
      setIsAddDialogOpen(false);
      resetForm();

      toast({
        title: "Success",
        description: "Support ticket submitted successfully."
      });
    } catch (error) {
      console.error('Error creating support ticket:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit support ticket."
      });
    }
  };

  const handleUpdateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status: newStatus })
        .eq('id', ticketId);

      if (error) throw error;

      // Update the status in the local state
      setTickets(
        tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      // If updating the currently viewed ticket, update that as well
      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }

      toast({
        title: "Success",
        description: "Ticket status updated."
      });
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update ticket status."
      });
    }
  };

  const viewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsViewDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      description: '',
      priority: 'medium',
      category: 'technical',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Support</h1>
          {!isAdmin && (
            <Button onClick={() => setIsAddDialogOpen(true)}>Create Support Ticket</Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>
              {isAdmin ? "Manage and respond to client support requests" : "View and manage your support tickets"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <Table>
                <TableCaption>List of {isAdmin ? "all" : "your"} support tickets</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    {isAdmin && <TableHead>Client</TableHead>}
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                        {isAdmin && (
                          <TableCell>{ticket.client?.company_name}</TableCell>
                        )}
                        <TableCell>{ticket.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={priorityColors[ticket.priority]}>
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[ticket.status]}>
                            {ticket.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" onClick={() => viewTicket(ticket)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={isAdmin ? 7 : 6}
                        className="text-center py-4"
                      >
                        No tickets found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add Ticket Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Submit a new support request to our team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Please describe your issue in detail"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddTicket}>Submit Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Ticket Dialog */}
        {selectedTicket && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedTicket.subject}</DialogTitle>
                <DialogDescription>
                  Ticket #{selectedTicket.id.split('-')[0]}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                {isAdmin && (
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Client</Label>
                    <p>{selectedTicket.client?.company_name}</p>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Category</Label>
                    <p>{selectedTicket.category}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Priority</Label>
                    <p>
                      <Badge variant="outline" className={priorityColors[selectedTicket.priority]}>
                        {selectedTicket.priority}
                      </Badge>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Status</Label>
                    <p>
                      <Badge variant="outline" className={statusColors[selectedTicket.status]}>
                        {selectedTicket.status.replace('_', ' ')}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-500">Description</Label>
                  <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                    {selectedTicket.description}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-gray-500">Created</Label>
                  <p>
                    {new Date(selectedTicket.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                {isAdmin && (
                  <div className="flex space-x-2">
                    {selectedTicket.status === 'open' && (
                      <Button 
                        variant="outline"
                        onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'in_progress')}
                      >
                        Mark In Progress
                      </Button>
                    )}
                    {(selectedTicket.status === 'open' || selectedTicket.status === 'in_progress') && (
                      <Button 
                        variant="default"
                        onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'resolved')}
                      >
                        Resolve Ticket
                      </Button>
                    )}
                    {selectedTicket.status === 'resolved' && (
                      <Button 
                        variant="ghost"
                        onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'closed')}
                      >
                        Close Ticket
                      </Button>
                    )}
                  </div>
                )}
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Support;
