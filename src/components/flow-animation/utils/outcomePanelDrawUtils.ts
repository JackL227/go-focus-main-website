
/**
 * Utility functions for drawing outcome panels
 */

/**
 * Draws the main outcome panel with background, borders and effects
 */
export const drawOutcomePanel = (
  ctx: CanvasRenderingContext2D,
  dimensions: { x: number; y: number; width: number; height: number },
  color: string,
  isPulsing: boolean
) => {
  const { x, y, width, height } = dimensions;
  
  // Apply glow effect if pulsing
  if (isPulsing) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 20; // Enhanced glow
  }
  
  // Draw panel background with 3D-like effect
  const gradientBg = ctx.createLinearGradient(x, y, x, y + height);
  gradientBg.addColorStop(0, 'rgba(15, 25, 45, 0.8)');
  gradientBg.addColorStop(1, 'rgba(10, 20, 40, 0.9)');
  
  ctx.fillStyle = gradientBg;
  ctx.strokeStyle = `rgba(${color.slice(1).match(/.{2}/g)!.map(hex => parseInt(hex, 16)).join(', ')}, ${0.7 + (isPulsing ? 0.3 : 0)})`;
  ctx.lineWidth = 2;
  
  // Rounded rectangle with 3D effect
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 10);
  ctx.fill();
  ctx.stroke();
  
  // Add highlight to give 3D effect
  ctx.beginPath();
  ctx.roundRect(x + 2, y + 2, width - 4, 10, 10);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fill();
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  
  // Add subtle reflection at bottom
  ctx.beginPath();
  ctx.roundRect(x + width/4, y + height - 5, width/2, 3, 1.5);
  ctx.fillStyle = `rgba(${color.slice(1).match(/.{2}/g)!.map(hex => parseInt(hex, 16)).join(', ')}, 0.3)`;
  ctx.fill();
};

/**
 * Draws the content inside the panel including icon, label and metrics
 */
export const drawPanelContents = (
  ctx: CanvasRenderingContext2D,
  dimensions: { centerX: number; centerY: number },
  color: string,
  type: string,
  label: string
) => {
  const { centerX, centerY } = dimensions;
  
  // Draw icon with enhanced style
  ctx.fillStyle = color;
  const iconSize = 20; // Larger icon
  const iconX = centerX;
  const iconY = centerY - 10;
  
  drawPanelIcon(ctx, iconX, iconY, iconSize, type, color);
  
  // Draw label with enhanced styling
  ctx.font = `bold 14px Arial`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(label, centerX, centerY + 20);
  
  // Draw connection count with dynamic animation
  drawConnectionCount(ctx, centerX, centerY, type, color);
};

/**
 * Draws the appropriate icon based on panel type
 */
const drawPanelIcon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  type: string,
  color: string
) => {
  if (type === 'checkmark') {
    // Draw checkmark
    ctx.beginPath();
    ctx.moveTo(x - size / 3, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x + size * 2/3, y - size / 3);
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
  } else if (type === 'calendar') {
    // Draw calendar
    ctx.fillRect(x - size / 2, y - size / 3, size, size * 1.2);
    ctx.fillStyle = 'rgba(10, 20, 40, 0.9)';
    ctx.fillRect(x - size / 3, y, size * 2/3, size / 2);
  } else {
    // Draw smile (dollar sign for Closed Deal)
    ctx.font = `bold ${size}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', x, y);
  }
};

/**
 * Draws the connection count with randomization for visual interest
 */
const drawConnectionCount = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  type: string,
  color: string
) => {
  const count = Math.floor(Math.random() * 10) + (type === 'checkmark' ? 40 : 
                                               type === 'calendar' ? 25 : 15);
  ctx.font = `12px Arial`;
  ctx.fillStyle = color;
  ctx.fillText(`${count}`, x, y + 35);
};

