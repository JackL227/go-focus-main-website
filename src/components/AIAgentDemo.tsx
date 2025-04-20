
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, Volume2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from './ui/button';
import BookingWidget from './BookingWidget';

interface Message {
  sender: 'user' | 'agent';
  text: string;
  isTyping?: boolean;
}

interface AgentConfig {
  name: string;
  greeting: string;
  avatar: string;
  messages: Array<{
    text: string;
    delay: number;
    options?: Array<{
      text: string;
      response: string;
    }>;
  }>;
}

interface AIAgentDemoProps {
  onClose: () => void;
}

const AIAgentDemo: React.FC<AIAgentDemoProps> = ({ onClose }) => {
  const [activeNiche, setActiveNiche] = useState<string>('trading');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agentConfigs: Record<string, AgentConfig> = {
    trading: {
      name: 'Alex - Trading Mentor AI',
      greeting: "Hi there! I'm Alex, the AI assistant for Elite Trading Academy. Are you a beginner or do you have some experience with trading already?",
      avatar: '/lovable-uploads/d410a2a7-6cd4-4de0-82f0-761a7a3f26c9.png',
      messages: [
        {
          text: "Great! To recommend the right program, I need to understand your goals better. What's your current income range?",
          delay: 1000,
          options: [
            { text: "Under $50k", response: "I'm interested in growing my income" },
            { text: "$50k-$100k", response: "I make between $50k-$100k" },
            { text: "$100k+", response: "I earn over $100k" }
          ]
        },
        {
          text: "Thanks for sharing. Our premium mentorship has helped traders at your income level achieve consistent results. What trading markets are you most interested in?",
          delay: 1500,
          options: [
            { text: "Forex", response: "I'm most interested in Forex" },
            { text: "Stocks", response: "Stock trading interests me most" },
            { text: "Crypto", response: "I'm focused on cryptocurrency" }
          ]
        },
        {
          text: "Perfect! I'd like to offer you our free training on successful trading strategies. Would you like to schedule a 1-on-1 strategy call with one of our mentors to discuss a personalized plan?",
          delay: 1800
        }
      ]
    },
    medspa: {
      name: 'Sarah - Med Spa AI',
      greeting: "Hello! I'm Sarah, your virtual assistant at Pure Aesthetics Med Spa. What treatment are you interested in learning more about today?",
      avatar: '/lovable-uploads/9dc911d9-ffea-4dc9-8c9f-53a8114665de.png',
      messages: [
        {
          text: "Our Botox treatments start at $12 per unit. Most clients need between 20-40 units depending on the treatment area. Would you like to know about our current special offers?",
          delay: 1200,
          options: [
            { text: "Yes, tell me about specials", response: "Yes, I'd like to hear about special offers" },
            { text: "What areas do you treat?", response: "What areas can be treated?" }
          ]
        },
        {
          text: "We're offering 20% off your first Botox treatment this month! We treat all facial areas including frown lines, crow's feet, and forehead. When was the last time you had a Botox treatment?",
          delay: 1500,
          options: [
            { text: "Never had it", response: "This would be my first time" },
            { text: "Within 6 months", response: "I had treatment in the last 6 months" }
          ]
        },
        {
          text: "Great! I'd be happy to check our next available appointment slots for a free consultation. Our specialist can create a personalized treatment plan. Would you like to see our availability this week?",
          delay: 2000
        }
      ]
    },
    fitness: {
      name: 'Mike - Fitness Coach AI',
      greeting: "Hey there! I'm Mike, the virtual coach for Body Transformation Academy. What are your main fitness goals right now?",
      avatar: '/lovable-uploads/d410a2a7-6cd4-4de0-82f0-761a7a3f26c9.png',
      messages: [
        {
          text: "Weight loss is our specialty! Have you worked with a fitness coach before?",
          delay: 1000,
          options: [
            { text: "Yes, I have", response: "Yes, I've worked with coaches before" },
            { text: "No, never", response: "No, this would be my first time" }
          ]
        },
        {
          text: "Our 12-week transformation program includes personalized nutrition planning, custom workouts, and weekly check-ins. Most clients see 10-15 pounds of fat loss in the first month. Would you like to see a sample program?",
          delay: 1500,
          options: [
            { text: "Yes, show me", response: "Yes, I'd like to see a sample" },
            { text: "How much is it?", response: "What's the program cost?" }
          ]
        },
        {
          text: "I'd be happy to send more details! But first, let's schedule a free discovery call with one of our coaches to discuss your specific goals and how we can customize the program for you. Would that work for you?",
          delay: 2000
        }
      ]
    }
  };

  useEffect(() => {
    // Clear messages when changing niches
    setMessages([]);
    setCurrentStep(0);
    
    // Add greeting message with typing animation
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{
        sender: 'agent',
        text: agentConfigs[activeNiche].greeting
      }]);
      setIsTyping(false);
    }, 1000);
  }, [activeNiche]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserInput = (input?: string) => {
    // Add user message
    const userMessage = input || userInput;
    if (!userMessage) return;
    
    const newUserMessage = { sender: 'user', text: userMessage };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setUserInput('');
    setIsTyping(true);
    
    // Get next agent response
    const config = agentConfigs[activeNiche];
    const nextMessage = config.messages[currentStep];
    
    if (nextMessage) {
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, {
          sender: 'agent',
          text: nextMessage.text
        }]);
        setIsTyping(false);
        setCurrentStep(prev => prev + 1);
      }, nextMessage.delay);
    } else {
      // If no more predefined messages, show booking CTA
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prevMessages => [...prevMessages, {
          sender: 'agent',
          text: "Great! Let me check our calendar. You can book a time that works for you using the button below."
        }]);
      }, 1500);
    }
  };

  const handleOptionClick = (optionText: string, response: string) => {
    setUserInput(response);
    handleUserInput(response);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background/95 border border-foreground/10 rounded-xl shadow-xl w-full max-w-md mx-4 h-[600px] max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
        {/* Header with close button and tabs */}
        <div className="bg-background p-4 border-b border-border flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-foreground">
              💬 See how we book leads in real-time for your niche
            </h3>
            <button 
              onClick={onClose} 
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          
          <Tabs value={activeNiche} onValueChange={setActiveNiche}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="trading" className="text-xs sm:text-sm">
                🔁 Trading Mentor
              </TabsTrigger>
              <TabsTrigger value="medspa" className="text-xs sm:text-sm">
                💉 Med Spa
              </TabsTrigger>
              <TabsTrigger value="fitness" className="text-xs sm:text-sm">
                🏋️ Fitness Coach
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Agent info */}
        <div className="bg-primary/5 p-3 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20">
            <img 
              src={agentConfigs[activeNiche].avatar} 
              alt={agentConfigs[activeNiche].name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{agentConfigs[activeNiche].name}</p>
            <p className="text-xs text-foreground/70">Online • Typically responds instantly</p>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          
          {/* Current agent message options */}
          {!isTyping && messages.length > 0 && currentStep < agentConfigs[activeNiche].messages.length && agentConfigs[activeNiche].messages[currentStep - 1]?.options && (
            <div className="flex flex-col gap-2 mb-4">
              {agentConfigs[activeNiche].messages[currentStep - 1].options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option.text, option.response)}
                  className="text-left p-2 border border-primary/30 text-primary hover:bg-primary/10 rounded-md text-sm transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
          
          {/* Show booking button after conversation */}
          {currentStep >= agentConfigs[activeNiche].messages.length && (
            <div className="flex justify-center mt-4">
              <BookingWidget className="w-full" />
            </div>
          )}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-1 text-foreground/60">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.4s]"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
              placeholder="Type your message..."
              className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              disabled={isTyping || currentStep > agentConfigs[activeNiche].messages.length}
            />
            <Button 
              size="icon" 
              onClick={() => handleUserInput()} 
              disabled={!userInput || isTyping || currentStep > agentConfigs[activeNiche].messages.length}
            >
              <Send size={18} />
            </Button>
            <Button size="icon" variant="outline">
              <Mic size={18} />
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-foreground/60 mb-2">Powered by Go Focus AI</p>
            <BookingWidget>
              🔗 Want this for your business? Book Your AI Strategy Call
            </BookingWidget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentDemo;
