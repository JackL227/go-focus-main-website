
import { OutcomePanel } from '../models/OutcomePanel';
import AINode from '../AINode';

/**
 * Update and draw all outcome panels
 */
export const updateAndDrawOutcomePanels = (
  ctx: CanvasRenderingContext2D,
  qualifiedPanel: OutcomePanel,
  bookedPanel: OutcomePanel,
  closedPanel: OutcomePanel
) => {
  qualifiedPanel.update();
  qualifiedPanel.draw(ctx, getAnimationColors());
  
  bookedPanel.update();
  bookedPanel.draw(ctx, getAnimationColors());
  
  closedPanel.update();
  closedPanel.draw(ctx, getAnimationColors());
};

/**
 * Draw connection lines between AI node and outcome panels
 */
export const drawConnectionLines = (
  ctx: CanvasRenderingContext2D,
  aiNode: AINode,
  qualifiedPanel: OutcomePanel,
  bookedPanel: OutcomePanel,
  closedPanel: OutcomePanel
) => {
  // First connection
  ctx.beginPath();
  ctx.moveTo(aiNode.x, aiNode.y);
  ctx.lineTo(qualifiedPanel.x, qualifiedPanel.y);
  
  const gradientLine1 = ctx.createLinearGradient(
    aiNode.x, aiNode.y, 
    qualifiedPanel.x, qualifiedPanel.y
  );
  gradientLine1.addColorStop(0, 'rgba(0, 110, 218, 0.8)');
  gradientLine1.addColorStop(1, 'rgba(0, 230, 118, 0.4)');
  
  ctx.strokeStyle = gradientLine1;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Second connection
  ctx.beginPath();
  ctx.moveTo(aiNode.x, aiNode.y);
  ctx.lineTo(bookedPanel.x, bookedPanel.y);
  
  const gradientLine2 = ctx.createLinearGradient(
    aiNode.x, aiNode.y, 
    bookedPanel.x, bookedPanel.y
  );
  gradientLine2.addColorStop(0, 'rgba(0, 110, 218, 0.8)');
  gradientLine2.addColorStop(1, 'rgba(0, 110, 218, 0.4)');
  
  ctx.strokeStyle = gradientLine2;
  ctx.stroke();
  
  // Third connection
  ctx.beginPath();
  ctx.moveTo(aiNode.x, aiNode.y);
  ctx.lineTo(closedPanel.x, closedPanel.y);
  
  const gradientLine3 = ctx.createLinearGradient(
    aiNode.x, aiNode.y, 
    closedPanel.x, closedPanel.y
  );
  gradientLine3.addColorStop(0, 'rgba(0, 110, 218, 0.8)');
  gradientLine3.addColorStop(1, 'rgba(255, 193, 7, 0.4)');
  
  ctx.strokeStyle = gradientLine3;
  ctx.stroke();
};

const getAnimationColors = () => {
  return {
    primary: '#006eda',
    secondary: '#006eda',
    accent: '#00E676',
    highlight: '#FFC107',
    faded: 'rgba(120, 130, 150, 0.5)',
    analytics: '#006eda',
    glassBg: 'rgba(15, 25, 45, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.15)',
    glow: 'rgba(0, 110, 218, 0.3)',
  };
};
