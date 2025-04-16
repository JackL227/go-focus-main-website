
import { drawGlassmorphism } from '../flowAnimationUtils';

/**
 * Draw the glass panel that highlights the flow
 */
export const drawFlowPanel = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  const centerX = width / 2;
  const centerY = height / 2;
  
  const glassPanelWidth = width * 0.7;
  const glassPanelHeight = height * 0.5;
  const glassPanelX = centerX - glassPanelWidth / 2;
  const glassPanelY = centerY - glassPanelHeight / 2;
  
  // Use the existing glassmorphism utility function
  const animationColors = {
    primary: '#006eda',
    glassBg: 'rgba(15, 25, 45, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  };
  
  drawGlassmorphism(ctx, glassPanelX, glassPanelY, glassPanelWidth, glassPanelHeight, 20, animationColors);
};
