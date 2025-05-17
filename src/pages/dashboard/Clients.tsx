
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

// Define the allowed status values as a type
type ClientStatus = "active" | "pending" | "disabled";

// Update the Client interface to use the ClientStatus type
interface Client {
  id: string;
  company_name: string;
  status: ClientStatus;
  created_at: string;
  updated_at: string;
}

const Clients = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState<boolean>(false);
  const [newClientName, setNewClientName] = useState<string>("");
  const [newClientStatus, setNewClientStatus] = useState<ClientStatus>("pending");
  
  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Cast the data to ensure it matches our Client type
      const typedClients = data.map(client => ({
        ...client,
        status: client.status as ClientStatus
      }));
      
      setClients(typedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setIsLoading(false);
    }
  };

  const addClient = async () => {
    try {
      if (!newClientName.trim()) {
        toast.error('Please enter a company name');
        return;
      }

      const { data, error } = await supabase
        .from('clients')
        .insert([{
          company_name: newClientName,
          status: newClientStatus,
        }])
        .select();

      if (error) {
        throw error;
      }

      toast.success('Client added successfully');
      fetchClients();
      setIsAddClientDialogOpen(false);
      setNewClientName("");
      setNewClientStatus("pending");
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Failed to add client');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Client</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Add a new client to your dashboard.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="companyName">Company Name</label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status">Status</label>
                <Select value={newClientStatus} onValueChange={(value: ClientStatus) => setNewClientStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddClientDialogOpen(false)}>Cancel</Button>
              <Button onClick={addClient}>Add Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">Loading clients...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableCaption>A list of all your clients.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Company Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.company_name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        client.status === 'active' ? 'bg-green-100 text-green-800' :
                        client.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No clients found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Clients;
