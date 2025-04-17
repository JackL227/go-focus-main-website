
import React from 'react';
import { 
  Bell, 
  Calendar, 
  MessageCircle, 
  DollarSign, 
  LineChart,
  Star
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  time: string;
  type: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4 text-purple-400" />;
      case 'lead':
        return <MessageCircle className="h-4 w-4 text-blue-400" />;
      case 'deal':
        return <DollarSign className="h-4 w-4 text-amber-400" />;
      case 'report':
        return <LineChart className="h-4 w-4 text-primary" />;
      case 'feedback':
        return <Star className="h-4 w-4 text-yellow-400" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'booking':
        return 'bg-purple-900/20 border-purple-500/30';
      case 'lead':
        return 'bg-blue-900/20 border-blue-500/30';
      case 'deal':
        return 'bg-amber-900/20 border-amber-500/30';
      case 'report':
        return 'bg-primary/10 border-primary/30';
      case 'feedback':
        return 'bg-yellow-900/20 border-yellow-500/30';
      default:
        return 'bg-gray-900/20 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={cn(
            "p-3 rounded-lg border hover-lift cursor-pointer",
            getColorClass(notification.type)
          )}
        >
          <div className="flex items-start gap-3">
            <div className="bg-background/30 p-2 rounded-full">
              {getIcon(notification.type)}
            </div>
            <div className="space-y-1">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPanel;
