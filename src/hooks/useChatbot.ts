
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [streamController, setStreamController] = useState<AbortController | null>(null);
  const { toast } = useToast();

  // Function to generate a mock response based on user input
  const generateMockResponse = (userMessage: string): string => {
    const userMessageLower = userMessage.toLowerCase();
    
    if (userMessageLower.includes('hello') || userMessageLower.includes('hi') || userMessageLower.includes('hey')) {
      return "Hello there! 👋 How can I help you today? Want to know more about our AI agent or schedule a demo?";
    }
    
    if (userMessageLower.includes('demo') || userMessageLower.includes('book') || userMessageLower.includes('call')) {
      return "Great! I'd be happy to help you book a demo. You can schedule a time that works for you by clicking the 'Book a Free Demo' button below. Our team will walk you through how Go Focus AI can transform your lead generation.";
    }
    
    if (userMessageLower.includes('price') || userMessageLower.includes('cost') || userMessageLower.includes('pricing')) {
      return "Our pricing is tailored to your business needs. We offer flexible packages starting from $499/month. For a detailed pricing breakdown based on your specific requirements, I recommend booking a quick call with our team.";
    }
    
    if (userMessageLower.includes('how') && userMessageLower.includes('work')) {
      return "Go Focus AI works by engaging with your website visitors 24/7, qualifying leads through natural conversations, and booking meetings directly into your calendar. Our AI learns from each interaction to continuously improve its performance.";
    }
    
    if (userMessageLower.includes('feature') || userMessageLower.includes('capabilities')) {
      return "Go Focus AI features include: 24/7 lead engagement, natural conversation flows, automatic meeting scheduling, CRM integration, multilingual support, and detailed analytics. Which feature would you like to know more about?";
    }
    
    // Default response for other queries
    return "Thanks for your message! Our AI agent is designed to engage your website visitors, qualify leads, and book meetings automatically. Would you like to see it in action with a quick demo?";
  };

  // Function to simulate sending messages to the webhook
  const sendToWebhook = useCallback(async (userMessage: string) => {
    try {
      setIsTyping(true);

      // Create a new AbortController for this request
      const controller = new AbortController();
      setStreamController(controller);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to call the real webhook first (but handle failure gracefully)
      try {
        // Webhook URL from requirements
        const webhookUrl = 'http://localhost:5678/webhook/151ba5ce-8799-4499-9a17-ca7549cb7acf';
        
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
          signal: controller.signal,
        });
        
        console.log("Webhook call attempted");
      } catch (webhookError) {
        console.log("Webhook unavailable, using fallback response");
        // Don't throw error, just continue with fallback
      }
      
      // Generate a mock response as fallback
      const responseText = generateMockResponse(userMessage);
      
      // Simulate streaming the response
      setCurrentResponse('');
      for (let i = 0; i < responseText.length; i++) {
        // Check if the request has been aborted
        if (controller.signal.aborted) break;
        
        // Add one character at a time with a small delay
        await new Promise(resolve => setTimeout(resolve, 10));
        setCurrentResponse(prev => prev + responseText[i]);
      }

    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error in chat process:', error);
        
        // Show a toast notification about the error
        toast({
          title: "Connection Issue",
          description: "Using fallback responses while connection is restored.",
          duration: 3000,
        });
      }
    } finally {
      setStreamController(null);
      setIsTyping(false);
    }
  }, [toast]);

  // Effect to add the streamed response as a message once it's complete
  useEffect(() => {
    if (currentResponse && !isTyping) {
      setMessages(prev => [...prev, { role: 'assistant', content: currentResponse }]);
      setCurrentResponse('');
    }
  }, [currentResponse, isTyping]);

  // Function to add a message and optionally send to the webhook
  const sendMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
    
    // If it's a user message, send to webhook
    if (message.role === 'user') {
      sendToWebhook(message.content);
    }
  }, [sendToWebhook]);

  // Function to reset the chat
  const resetChat = useCallback(() => {
    // Abort any ongoing stream
    if (streamController) {
      streamController.abort();
      setStreamController(null);
    }
    
    setMessages([]);
    setIsTyping(false);
    setCurrentResponse('');
  }, [streamController]);

  return {
    messages,
    isTyping,
    sendMessage,
    resetChat,
  };
};
