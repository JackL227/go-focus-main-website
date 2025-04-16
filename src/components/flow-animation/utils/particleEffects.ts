
// Functions for creating particle visual effects

export const createGlowEffect = (ctx: CanvasRenderingContext2D, color: string, intensity: number = 1, size: number) => {
  try {
    const gradient = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 3);
    
    // Safe color handling for different color formats
    if (color.includes('rgba')) {
      // Handle rgba format
      const baseColor = color.substring(0, color.lastIndexOf(',') + 1);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, `${baseColor} 0.5)`);
      gradient.addColorStop(1, `${baseColor} 0)`);
    } else if (color.includes('rgb')) {
      // Handle rgb format
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color.replace('rgb', 'rgba').replace(')', ', 0.5)'));
      gradient.addColorStop(1, color.replace('rgb', 'rgba').replace(')', ', 0)'));
    } else {
      // Handle hex or named colors
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, `${color}80`); // 50% opacity 
      gradient.addColorStop(1, `${color}00`);   // 0% opacity
    }
    
    return gradient;
  } catch (error) {
    // Fallback to simpler gradient if there's an error
    const fallbackGradient = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 3);
    fallbackGradient.addColorStop(0, '#006eda');
    fallbackGradient.addColorStop(1, 'rgba(0, 110, 218, 0)');
    return fallbackGradient;
  }
};

export const drawBubbleShape = (ctx: CanvasRenderingContext2D, size: number, isQualified: boolean, colors: Record<string, string>) => {
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  ctx.fillStyle = isQualified ? colors.primary : colors.faded;
  ctx.fill();
  
  // Add slight highlight for 3D effect
  ctx.beginPath();
  ctx.arc(-size * 0.3, -size * 0.3, size * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fill();
};

export const drawSquareShape = (ctx: CanvasRenderingContext2D, size: number, isQualified: boolean, colors: Record<string, string>) => {
  ctx.beginPath();
  ctx.rect(-size, -size, size * 2, size * 2);
  ctx.fillStyle = isQualified ? colors.primary : colors.faded;
  ctx.fill();
  
  // Add slight highlight for 3D effect
  ctx.beginPath();
  ctx.rect(-size * 0.7, -size * 0.7, size, size);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fill();
};

export const drawDiamondShape = (ctx: CanvasRenderingContext2D, size: number, isQualified: boolean, colors: Record<string, string>) => {
  ctx.beginPath();
  ctx.moveTo(0, -size * 1.2);
  ctx.lineTo(size, 0);
  ctx.lineTo(0, size * 1.2);
  ctx.lineTo(-size, 0);
  ctx.closePath();
  ctx.fillStyle = isQualified ? colors.accent : colors.faded;
  ctx.fill();
  
  // Add slight highlight for 3D effect
  ctx.beginPath();
  ctx.moveTo(-size * 0.3, -size * 0.3);
  ctx.lineTo(0, -size * 0.6);
  ctx.lineTo(size * 0.3, -size * 0.3);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fill();
};

export const drawEmoji = (ctx: CanvasRenderingContext2D, emoji: string, size: number) => {
  if (size > 6) {
    ctx.font = `${size * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 0, 0);
  }
};
