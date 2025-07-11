
import React, { useState } from 'react';
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

type ClientStatus = "active" | "pending" | "disabled";

interface AddClientDialogProps {
  onAddClient: (clientName: string, clientStatus: ClientStatus) => Promise<boolean>;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({ onAddClient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientStatus, setNewClientStatus] = useState<ClientStatus>("pending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await onAddClient(newClientName, newClientStatus);
    
    if (success) {
      setIsOpen(false);
      setNewClientName("");
      setNewClientStatus("pending");
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="status">Status</label>
            <Select 
              value={newClientStatus} 
              onValueChange={(value: ClientStatus) => setNewClientStatus(value)}
              disabled={isSubmitting}
            >
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
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Client'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
