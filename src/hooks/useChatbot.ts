
import { useState, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [streamController, setStreamController] = useState<AbortController | null>(null);

  // Function to handle sending messages to the webhook
  const sendToWebhook = useCallback(async (userMessage: string) => {
    try {
      setIsTyping(true);

      // Create a new AbortController for this request
      const controller = new AbortController();
      setStreamController(controller);

      // Webhook URL from requirements
      const webhookUrl = 'http://localhost:5678/webhook/151ba5ce-8799-4499-9a17-ca7549cb7acf';
      
      // Get the response as a stream
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      // Clear the current response
      setCurrentResponse('');
      
      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert the chunk to text and append to the current response
        const chunk = new TextDecoder().decode(value);
        setCurrentResponse(prev => prev + chunk);
      }

    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sending message to webhook:', error);
        
        // Add a fallback message if the request fails
        setMessages(prev => [
          ...prev, 
          { 
            role: 'assistant', 
            content: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team." 
          }
        ]);
      }
    } finally {
      setStreamController(null);
      setIsTyping(false);
    }
  }, []);

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
