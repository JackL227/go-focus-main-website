
import { useEffect, useRef } from 'react';
import { MessageParticle } from '../particles';
import LeadParticle from '../LeadParticle';
import AINode from '../AINode';
import { OutcomePanel } from '../models/OutcomePanel';
import { animationColors, setCanvasSize, createInitialMessageParticles } from '../flowAnimationUtils';
import { createBackgroundParticles, drawBackground } from '../utils/backgroundUtils';
import { drawFlowPanel } from '../utils/panelUtils';
import { updateAndDrawOutcomePanels, drawConnectionLines } from '../utils/outcomeUtils';
import { updateMessageParticles, updateLeadParticles } from '../utils/particleHandlers';

export const useFlowAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full width
    const handleResize = () => {
      setCanvasSize(canvas);
      initializeAnimation();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Animation variables
    let messageParticles: MessageParticle[] = [];
    let leadParticles: LeadParticle[] = [];
    let aiNode: AINode;
    let qualifiedPanel: OutcomePanel;
    let bookedPanel: OutcomePanel;
    let closedPanel: OutcomePanel;
    let bgParticles: any[] = [];
    
    // Initialize animation elements
    function initializeAnimation() {
      // Clear existing particles
      messageParticles = [];
      leadParticles = [];
      
      // Center the AI node
      aiNode = new AINode(canvas.width / 2, canvas.height / 2);
      
      // Create outcome panels with improved positioning that works with any screen size
      qualifiedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.3, "Qualified", "checkmark");
      bookedPanel = new OutcomePanel(canvas.width * 0.85, canvas.height * 0.5, "Booked Call", "calendar");
      closedPanel = new OutcomePanel(canvas.width * 0.75, canvas.height * 0.7, "Closed Deal", "smile");
      
      // Background particles
      bgParticles = createBackgroundParticles(canvas.width, canvas.height);
      
      // Create initial particles
      createInitialMessageParticles(20, MessageParticle, canvas.height).forEach(particle => {
        messageParticles.push(particle);
      });
    }
    
    let animationId: number;
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      // Clear the canvas with a solid background color first
      ctx.fillStyle = '#050A15';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawBackground(ctx, canvas.width, canvas.height, bgParticles);
      
      // Draw glass panels to highlight the flow
      drawFlowPanel(ctx, canvas.width, canvas.height);
      
      // Update and draw AI node
      aiNode.update();
      aiNode.draw(ctx, animationColors);
      
      // Update and draw outcome panels
      updateAndDrawOutcomePanels(ctx, qualifiedPanel, bookedPanel, closedPanel);
      
      // Connect glowing lines between AI node and outcome panels
      drawConnectionLines(ctx, aiNode, qualifiedPanel, bookedPanel, closedPanel);
      
      try {
        // Update and draw message particles
        updateMessageParticles(ctx, messageParticles, aiNode, qualifiedPanel, bookedPanel, closedPanel, leadParticles);
        
        // Update and draw lead particles
        updateLeadParticles(ctx, leadParticles);
      } catch (error) {
        console.error('Error in particle animation:', error);
      }
      
      // Create new message particles at a controlled rate
      if (Math.random() < 0.06 && messageParticles.length < 30) {
        const x = -20;
        const y = canvas.height * (0.3 + Math.random() * 0.4); // Keep within middle area
        const newParticle = new MessageParticle(x, y, canvas.height);
        messageParticles.push(newParticle);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    initializeAnimation();
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return canvasRef;
};
