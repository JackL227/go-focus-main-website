
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { sanitizeText } from '@/utils/sanitization';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AddClientDialog from '@/components/dashboard/AddClientDialog';

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
  const { userProfile } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
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

  const addClient = async (clientName: string, clientStatus: ClientStatus) => {
    try {
      const sanitizedName = sanitizeText(clientName.trim());
      
      if (!sanitizedName || sanitizedName.length < 2) {
        toast.error('Please enter a valid company name (at least 2 characters)');
        return false;
      }

      if (sanitizedName.length > 100) {
        toast.error('Company name must be less than 100 characters');
        return false;
      }

      const { data, error } = await supabase
        .from('clients')
        .insert([{
          company_name: sanitizedName,
          status: clientStatus,
        }])
        .select();

      if (error) {
        throw error;
      }

      toast.success('Client added successfully');
      fetchClients();
      return true;
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Failed to add client');
      return false;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Security: Check if user has admin role using userProfile
  if (!userProfile || userProfile.role !== 'admin') {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">Unauthorized</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Clients</h1>
          <AddClientDialog onAddClient={addClient} />
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
    </DashboardLayout>
  );
};

export default Clients;
