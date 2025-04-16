
export const createGlowEffect = (
  ctx: CanvasRenderingContext2D, 
  color: string, 
  glowIntensity: number, 
  size: number
) => {
  const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.5);
  const glowIntensityHex = Math.floor(glowIntensity * 70).toString(16).padStart(2, '0');
  glowGradient.addColorStop(0, `${color}${glowIntensityHex}`);
  glowGradient.addColorStop(1, `${color}00`);
  return glowGradient;
};

export const drawBubbleShape = (
  ctx: CanvasRenderingContext2D, 
  size: number, 
  isQualified: boolean, 
  colors: Record<string, string>
) => {
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  
  // Create glass effect with gradient
  const gradient = ctx.createRadialGradient(
    -size * 0.3, -size * 0.3, 0,
    0, 0, size * 1.2
  );
  gradient.addColorStop(0, `rgba(255, 255, 255, ${isQualified ? 0.6 : 0.3})`);
  gradient.addColorStop(0.8, isQualified ? colors.primary : colors.faded);
  gradient.addColorStop(1, isQualified ? colors.primary : colors.faded);
  
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Add a subtle stroke
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
  
  // Add highlight/shine effect
  ctx.beginPath();
  ctx.arc(-size * 0.3, -size * 0.3, size * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fill();
};

export const drawSquareShape = (
  ctx: CanvasRenderingContext2D, 
  size: number, 
  isQualified: boolean, 
  colors: Record<string, string>
) => {
  // Draw rounded square for chat messages
  ctx.beginPath();
  ctx.roundRect(-size, -size, size * 2, size * 2, size * 0.3);
  
  // Create glass effect with gradient
  const gradient = ctx.createLinearGradient(-size, -size, size, size);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${isQualified ? 0.3 : 0.1})`);
  gradient.addColorStop(1, isQualified ? colors.primary : colors.faded);
  
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Add a subtle stroke
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
};

export const drawDiamondShape = (
  ctx: CanvasRenderingContext2D, 
  size: number, 
  isQualified: boolean, 
  colors: Record<string, string>
) => {
  // Draw diamond for questions/inquiries
  ctx.beginPath();
  ctx.moveTo(0, -size * 1.2);
  ctx.lineTo(size, 0);
  ctx.lineTo(0, size * 1.2);
  ctx.lineTo(-size, 0);
  ctx.closePath();
  
  // Create glass effect with gradient
  const gradient = ctx.createLinearGradient(0, -size, 0, size);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${isQualified ? 0.3 : 0.1})`);
  gradient.addColorStop(1, isQualified ? colors.primary : colors.faded);
  
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Add a subtle stroke
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
};

export const drawEmoji = (
  ctx: CanvasRenderingContext2D, 
  emoji: string, 
  size: number
) => {
  if (size > 8) {
    ctx.font = `${size * 1.2}px Arial`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 0, 0);
  }
};
