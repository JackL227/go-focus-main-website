
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
    
    // Initialize variables before functions that use them
    let messageParticles: MessageParticle[] = [];
    let leadParticles: LeadParticle[] = [];
    let aiNode: AINode;
    let qualifiedPanel: OutcomePanel;
    let bookedPanel: OutcomePanel;
    let closedPanel: OutcomePanel;
    let bgParticles: any[] = [];
    
    // Set canvas to full width
    const handleResize = () => {
      setCanvasSize(canvas);
      initializeAnimation();
    };
    
    // Initialize animation elements
    function initializeAnimation() {
      // Clear existing particles
      messageParticles = [];
      leadParticles = [];
      
      // Center the AI node precisely in the middle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      aiNode = new AINode(centerX, centerY);
      
      // Position outcome panels around the central node
      const panelDistance = Math.min(canvas.width, canvas.height) * 0.25;
      qualifiedPanel = new OutcomePanel(centerX + panelDistance, centerY - panelDistance, "Qualified", "checkmark");
      bookedPanel = new OutcomePanel(centerX + panelDistance, centerY, "Booked Call", "calendar");
      closedPanel = new OutcomePanel(centerX + panelDistance, centerY + panelDistance, "Closed Deal", "smile");
      
      // Background particles
      bgParticles = createBackgroundParticles(canvas.width, canvas.height);
      
      // Create initial particles
      messageParticles = createInitialMessageParticles(20, MessageParticle, canvas.height);
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    let animationId: number;
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      try {
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
        
        // Update and draw message particles
        updateMessageParticles(ctx, messageParticles, aiNode, qualifiedPanel, bookedPanel, closedPanel, leadParticles);
        
        // Update and draw lead particles
        updateLeadParticles(ctx, leadParticles);
        
        // Create new message particles at a controlled rate
        if (Math.random() < 0.06 && messageParticles.length < 30) {
          const x = -20;
          const y = canvas.height * (0.3 + Math.random() * 0.4); // Keep within middle area
          const newParticle = new MessageParticle(x, y, canvas.height);
          messageParticles.push(newParticle);
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return canvasRef;
};
