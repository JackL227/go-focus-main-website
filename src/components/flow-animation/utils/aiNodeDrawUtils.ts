
// Utility functions for drawing AINode components

/**
 * Creates a radial gradient for glowing effects
 */
export const createNodeGradient = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  colors: string[]
) => {
  const gradient = ctx.createRadialGradient(
    x, y, 0,
    x, y, size
  );
  
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  
  return gradient;
};

/**
 * Draws the outer pulse effect
 */
export const drawPulseEffect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  pulseRadius: number,
  pulseOpacity: number
) => {
  // Draw multiple outer pulses for enhanced glow effect
  for (let i = 0; i < 4; i++) {
    const radius = pulseRadius - i * (pulseRadius * 0.15);
    if (radius > 0) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
      );
      gradient.addColorStop(0, `rgba(0, 110, 218, ${pulseOpacity - i * 0.05})`);
      gradient.addColorStop(0.7, `rgba(0, 110, 218, ${(pulseOpacity - i * 0.05) * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 110, 218, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
};

/**
 * Draws orbit points and connections
 */
export const drawOrbitPoints = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  orbitPoints: {angle: number, speed: number, size: number, distance: number, color: string}[]
) => {
  for (let point of orbitPoints) {
    const pointX = x + Math.cos(point.angle) * point.distance;
    const pointY = y + Math.sin(point.angle) * point.distance;
    
    // Draw connection line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(pointX, pointY);
    ctx.strokeStyle = `${point.color}44`;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw particle
    ctx.beginPath();
    ctx.arc(pointX, pointY, point.size, 0, Math.PI * 2);
    ctx.fillStyle = point.color;
    ctx.fill();
    
    // Add glow to particle
    const glowGradient = ctx.createRadialGradient(pointX, pointY, 0, pointX, pointY, point.size * 3);
    glowGradient.addColorStop(0, `${point.color}66`);
    glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(pointX, pointY, point.size * 3, 0, Math.PI * 2);
    ctx.fill();
  }
};

/**
 * Draws the main AI node body
 */
export const drawNodeBody = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  colors: Record<string, string>
) => {
  // Draw outer glow
  ctx.shadowColor = colors.primary;
  ctx.shadowBlur = 25; // Enhanced glow
  
  // Draw main node with glass effect
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  const gradient = ctx.createRadialGradient(
    x, y, 0,
    x, y, size
  );
  
  gradient.addColorStop(0, 'rgba(0, 110, 218, 0.95)');
  gradient.addColorStop(0.7, 'rgba(0, 82, 163, 0.9)');
  gradient.addColorStop(1, 'rgba(0, 56, 112, 0.85)');
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Add highlight for glass effect
  ctx.beginPath();
  ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fill();
  
  // Draw outer ring with animated glow
  ctx.beginPath();
  ctx.arc(x, y, size * 1.15, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + 0.2})`;
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
};

/**
 * Draw inner neural network connections
 */
export const drawInnerConnections = (
  ctx: CanvasRenderingContext2D, 
  connections: number,
  rotation: number,
  size: number
) => {
  for (let i = 0; i < connections; i++) {
    const angle1 = (Math.PI * 2 / connections) * i;
    const x1 = Math.cos(angle1) * size * 0.3;
    const y1 = Math.sin(angle1) * size * 0.3;
    
    for (let j = i + 1; j < connections; j++) {
      const angle2 = (Math.PI * 2 / connections) * j;
      const x2 = Math.cos(angle2) * size * 0.3;
      const y2 = Math.sin(angle2) * size * 0.3;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(rotation + i) * 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
};

/**
 * Draw inner neural network nodes
 */
export const drawInnerNodes = (
  ctx: CanvasRenderingContext2D,
  connections: number,
  rotation: number,
  size: number
) => {
  for (let i = 0; i < connections; i++) {
    const angle = (Math.PI * 2 / connections) * i;
    const distance = size * 0.3;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const circleSize = size * (0.1 + 0.03 * Math.sin(rotation * 3 + i));
    
    // Pulse color based on position
    const pulseColor = i % 3 === 0 ? '#00E676' : 
                      i % 3 === 1 ? '#FFC107' : '#FFFFFF';
    
    ctx.beginPath();
    ctx.arc(x, y, circleSize, 0, Math.PI * 2);
    ctx.fillStyle = pulseColor;
    ctx.fill();
    
    // Add glow to node
    const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, circleSize * 2);
    nodeGlow.addColorStop(0, `${pulseColor}66`);
    nodeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nodeGlow;
    ctx.beginPath();
    ctx.arc(x, y, circleSize * 2, 0, Math.PI * 2);
    ctx.fill();
  }
};

/**
 * Draw the node logo
 */
export const drawNodeLogo = (
  ctx: CanvasRenderingContext2D,
  size: number
) => {
  // Core circle
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
  const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.2);
  coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
  ctx.fillStyle = coreGradient;
  ctx.fill();
  
  // Logo text with premium styling
  ctx.font = `bold ${size * 0.15}px Poppins, Arial`;
  ctx.fillStyle = '#003870';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw text on two lines with enhanced styling
  ctx.fillText('GO FOCUS', 0, -size * 0.05);
  
  // Make AI text stand out
  ctx.font = `bold ${size * 0.18}px Poppins, Arial`;
  ctx.fillStyle = '#003870';
  ctx.fillText('AI', 0, size * 0.08);
};
