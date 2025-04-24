
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  // Check if message contains "book a call" to show the booking CTA
  const showBookingCTA = !isUser && message.content.toLowerCase().includes("book a call") || 
                         !isUser && message.content.toLowerCase().includes("booking") ||
                         isUser && message.content.toLowerCase().includes("book a call") || 
                         isUser && message.content.toLowerCase().includes("demo");

  // Check if message is a thank you after booking to show the demo CTA
  const showDemoCTA = !isUser && (
    message.content.toLowerCase().includes("thank you") && 
    message.content.toLowerCase().includes("booked")
  );

  return (
    <motion.div 
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-3 ${
          isUser
            ? 'rounded-br-none bg-accent text-accent-foreground self-end'
            : 'rounded-bl-none bg-[#172235] text-foreground self-start'
        }`}
      >
        <p className={`text-base md:text-lg ${!isUser && 'font-medium'}`}>{message.content}</p>
      </div>

      {/* Booking CTA */}
      {showBookingCTA && (
        <motion.div 
          className="mt-2 p-3 rounded-xl bg-foreground/10 border border-primary/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium mb-2">Ready to see Go Focus AI in action?</p>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            onClick={() => window.open('/book-demo', '_blank')}
          >
            <Calendar className="h-4 w-4" />
            Book a Free Demo
          </Button>
        </motion.div>
      )}

      {/* Demo Video CTA */}
      {showDemoCTA && (
        <motion.div 
          className="mt-2 p-3 rounded-xl bg-foreground/10 border border-primary/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium mb-2">While you wait, see how our AI turns leads into customers 24/7</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary"
            onClick={() => window.open('/demo-video', '_blank')}
          >
            Watch Demo
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
