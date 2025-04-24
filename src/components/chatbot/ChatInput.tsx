
import React, { useState, useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      
      // Focus the input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Send message on Enter (but allow Shift+Enter for new lines)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-grow textarea
  const handleInput = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="relative flex rounded-xl border border-foreground/10 bg-background/50 focus-within:border-primary/50">
      <textarea
        ref={inputRef}
        className="flex-1 resize-none bg-transparent py-3 pl-4 pr-12 text-foreground placeholder:text-foreground/50 focus:outline-none"
        placeholder="Ask us anything... or book a call"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyPress}
      />
      <div className="absolute bottom-1 right-1 flex space-x-1">
        {/* Voice button (disabled for now) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/10 text-muted cursor-not-allowed opacity-50"
          disabled
        >
          <Mic className="h-4 w-4" />
        </motion.button>

        {/* Send button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatInput;
