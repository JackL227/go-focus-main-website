import { useEffect, useState, useRef } from 'react';
import { setCanvasSize } from '../flowAnimationUtils';
import OutcomePanel from '../OutcomePanel';
import AINode from '../AINode';

export const useCanvasSetup = (isMobile = false) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [hoveredPanel, setHoveredPanel] = useState<OutcomePanel | null>(null);
  const aiNodeRef = useRef<AINode | null>(null);
  const panelsRef = useRef<OutcomePanel[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    setCtx(context);

    // Set canvas size
    const handleResize = () => {
      setCanvasSize(canvas);
      
      // Recalculate positions for AI node and panels based on new canvas size
      if (aiNodeRef.current) {
        // Place AI node more centrally on mobile
        aiNodeRef.current.x = isMobile ? canvas.width / 2 : canvas.width / 2;
        aiNodeRef.current.y = isMobile ? canvas.height * 0.4 : canvas.height / 2;
      }
      
      if (panelsRef.current.length === 3) {
        if (isMobile) {
          // Stack panels more vertically on mobile
          panelsRef.current[0].x = canvas.width * 0.65;
          panelsRef.current[0].y = canvas.height * 0.25;
          
          panelsRef.current[1].x = canvas.width * 0.7;
          panelsRef.current[1].y = canvas.height * 0.45;
          
          panelsRef.current[2].x = canvas.width * 0.65;
          panelsRef.current[2].y = canvas.height * 0.65;
        } else {
          // Desktop layout
          panelsRef.current[0].x = canvas.width * 0.75;
          panelsRef.current[0].y = canvas.height * 0.3;
          
          panelsRef.current[1].x = canvas.width * 0.82;
          panelsRef.current[1].y = canvas.height * 0.5;
          
          panelsRef.current[2].x = canvas.width * 0.75;
          panelsRef.current[2].y = canvas.height * 0.7;
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize AI node and panels
    aiNodeRef.current = new AINode(
      isMobile ? canvas.width / 2 : canvas.width / 2, 
      isMobile ? canvas.height * 0.4 : canvas.height / 2
    );
    
    // Create a scale factor for mobile but don't pass it as a separate argument
    const panelSize = isMobile ? 0.8 : 1; // Slightly smaller panels on mobile
    
    // Fix: Remove the panelSize as a separate parameter and include it in the options object if needed
    panelsRef.current = [
      new OutcomePanel(
        isMobile ? canvas.width * 0.65 : canvas.width * 0.75, 
        isMobile ? canvas.height * 0.25 : canvas.height * 0.3, 
        "Qualified Lead", 
        "checkmark"
      ),
      new OutcomePanel(
        isMobile ? canvas.width * 0.7 : canvas.width * 0.82, 
        isMobile ? canvas.height * 0.45 : canvas.height * 0.5, 
        "Booked Call", 
        "calendar"
      ),
      new OutcomePanel(
        isMobile ? canvas.width * 0.65 : canvas.width * 0.75, 
        isMobile ? canvas.height * 0.65 : canvas.height * 0.7, 
        "Closed Deal", 
        "smile"
      )
    ];

    // Mouse interaction handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      let foundHoveredPanel = null;
      for (const panel of panelsRef.current) {
        if (panel.isPointInside(mouseX, mouseY)) {
          foundHoveredPanel = panel;
          panel.hover(true);
        } else {
          panel.hover(false);
        }
      }

      setHoveredPanel(foundHoveredPanel);
      canvas.style.cursor = foundHoveredPanel ? 'pointer' : 'default';
    };

    // Touch interaction handler for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      
      const touch = event.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      let foundHoveredPanel = null;
      for (const panel of panelsRef.current) {
        if (panel.isPointInside(touchX, touchY)) {
          foundHoveredPanel = panel;
          panel.hover(true);
        } else {
          panel.hover(false);
        }
      }

      setHoveredPanel(foundHoveredPanel);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

  return {
    canvasRef,
    ctx,
    hoveredPanel,
    aiNode: aiNodeRef.current,
    panels: panelsRef.current
  };
};
