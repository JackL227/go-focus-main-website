
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
  initialNiche?: 'trading' | 'course';
}

const AIAgentDemo: React.FC<AIAgentDemoProps> = ({ onClose, initialNiche = 'trading' }) => {
  const [activeNiche, setActiveNiche] = useState<string>(initialNiche);
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
    course: {
      name: 'Emma - Course Creator AI',
      greeting: "Hello! I'm Emma, the virtual assistant for Course Creator Academy. What type of online course or info product are you looking to create?",
      avatar: '/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png',
      messages: [
        {
          text: "That sounds interesting! Many of our clients have had great success with similar courses. What's your current course creation experience level?",
          delay: 1200,
          options: [
            { text: "Complete beginner", response: "I'm just starting out" },
            { text: "Some experience", response: "I've created a few courses before" },
            { text: "Experienced", response: "I have multiple courses already" }
          ]
        },
        {
          text: "Great to know. What's your biggest challenge right now with your course business?",
          delay: 1500,
          options: [
            { text: "Getting students", response: "I struggle with attracting students" },
            { text: "Content creation", response: "Creating quality content is difficult" },
            { text: "Student engagement", response: "Keeping students engaged through completion" }
          ]
        },
        {
          text: "I understand those challenges. Our AI support system helps course creators like you overcome these exact issues. Would you like to schedule a call with our course business strategist to see how our AI can help scale your info product business?",
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
    
    const newUserMessage: Message = { 
      sender: 'user', 
      text: userMessage 
    };
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

  const getTriggerLabel = (niche: string) => {
    switch (niche) {
      case 'trading': return '🔁 Trading Mentor';
      case 'course': return '📚 Course Creator';
      default: return niche;
    }
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
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="trading" className="text-xs sm:text-sm">
                {getTriggerLabel('trading')}
              </TabsTrigger>
              <TabsTrigger value="course" className="text-xs sm:text-sm">
                {getTriggerLabel('course')}
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
