
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Mic, Calendar } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChatbot } from '@/hooks/useChatbot';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    isTyping, 
    sendMessage,
    resetChat
  } = useChatbot();

  // Bounce animation interval
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      if (!isOpen) {
        // Add bounce animation class
        const button = document.getElementById('chatbot-button');
        if (button) {
          button.classList.add('animate-button-pop');
          setTimeout(() => {
            button.classList.remove('animate-button-pop');
          }, 1000);
        }
      }
    }, 12000);

    return () => clearInterval(bounceInterval);
  }, [isOpen]);

  // Auto message after inactivity
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Reset any existing timer
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
      
      // Set new inactivity timer
      const timer = setTimeout(() => {
        const lastMessage = messages[messages.length - 1];
        // Only send auto message if the last message wasn't from the AI
        if (lastMessage.role !== 'assistant') {
          sendMessage({
            role: 'assistant',
            content: "Hey 👋 just checking in — need help booking a demo or want to see the AI agent in action?"
          });
        }
      }, 15000);
      
      setInactivityTimer(timer);
    }
    
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [isOpen, messages]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Send welcome message when first opening
      sendMessage({
        role: 'assistant',
        content: "Hi there! 👋 I'm Go Focus AI. How can I help you today? I can tell you about our AI agents, book a demo call, or answer any questions you have."
      });
    }
  };

  const handleSend = (message: string) => {
    if (message.trim() === '') return;
    
    // Create user message
    sendMessage({
      role: 'user',
      content: message
    });
    
    // Reset inactivity timer when user sends a message
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Button */}
      <motion.button
        id="chatbot-button"
        className="relative flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-glow hover:bg-primary/90 group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative">
          <MessageCircle className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-ping opacity-75"></span>
        </span>
        <span className="font-medium">Ask Go Focus AI</span>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            className="absolute bottom-full mb-2 rounded-lg bg-background p-2 text-sm shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Chat with our AI Assistant 💬
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-[380px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#172235] to-[#101827] shadow-xl border border-foreground/10"
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: 580, y: 0 }}
            exit={{ opacity: 0, height: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-foreground/10 bg-[#172235]/90 p-4 backdrop-blur">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent"></span>
                </span>
                <h3 className="font-semibold text-foreground">Go Focus AI</h3>
              </div>
              <button 
                onClick={handleClose}
                className="rounded-full p-1 text-foreground/70 hover:bg-foreground/10 hover:text-foreground hover:shadow-md transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex h-[430px] flex-col gap-4 overflow-y-auto p-4 scrollbar"
            >
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 max-w-[70%] rounded-2xl rounded-bl-none bg-[#172235] p-3 text-foreground self-start">
                  <span className="text-sm">Go Focus AI is typing</span>
                  <span className="flex">
                    <span className="h-2 w-2 rounded-full bg-foreground/60 mx-0.5 animate-bounce [animation-delay:0ms]"></span>
                    <span className="h-2 w-2 rounded-full bg-foreground/60 mx-0.5 animate-bounce [animation-delay:300ms]"></span>
                    <span className="h-2 w-2 rounded-full bg-foreground/60 mx-0.5 animate-bounce [animation-delay:600ms]"></span>
                  </span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-foreground/10 p-4">
              <ChatInput onSendMessage={handleSend} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;
