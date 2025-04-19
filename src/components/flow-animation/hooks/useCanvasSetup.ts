
import { useEffect, useState, useRef } from 'react';
import { setCanvasSize } from '../flowAnimationUtils';
import OutcomePanel from '../OutcomePanel';
import AINode from '../AINode';

export const useCanvasSetup = () => {
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
    const handleResize = () => setCanvasSize(canvas);
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize AI node and panels
    aiNodeRef.current = new AINode(canvas.width / 2, canvas.height / 2);
    panelsRef.current = [
      new OutcomePanel(canvas.width * 0.75, canvas.height * 0.3, "Qualified", "checkmark"),
      new OutcomePanel(canvas.width * 0.85, canvas.height * 0.5, "Booked Call", "calendar"),
      new OutcomePanel(canvas.width * 0.75, canvas.height * 0.7, "Closed Deal", "smile")
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

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return {
    canvasRef,
    ctx,
    hoveredPanel,
    aiNode: aiNodeRef.current,
    panels: panelsRef.current
  };
};

