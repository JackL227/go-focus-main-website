
// Define the colors for the animation with enhanced palette
export const animationColors = {
  primary: '#006eda', // blue
  secondary: '#1EAEDB', // neon teal
  accent: '#00E676', // neon green
  highlight: '#FFC107', // amber/gold
  qualified: '#00E676', // green for qualified leads
  booked: '#1EAEDB', // brighter blue for booked
  closed: '#FFC107', // gold for closed deals
  faded: 'rgba(120, 130, 150, 0.3)', // more transparent grey
  analytics: '#006eda', // blue
  darkNavy: '#050F20', // deeper navy background
  glowBlue: 'rgba(30, 174, 219, 0.8)', // glow effect blue
  glowGreen: 'rgba(0, 230, 118, 0.8)', // glow effect green
};

// Canvas sizing helper function
export const setCanvasSize = (canvas: HTMLCanvasElement) => {
  const parent = canvas.parentElement;
  if (parent) {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  } else {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
};

// Create initial particles with improved distribution
export const createInitialMessageParticles = (count: number, MessageParticle: any, canvasHeight: number) => {
  const particles = [];
  
  // Calculate a more natural distribution for particles
  for (let i = 0; i < count; i++) {
    // Horizontal position: staggered from left edge with increasing distance
    const horizontalOffset = Math.random() * 300 + (i * 15);
    const x = -horizontalOffset;
    
    // Create clusters of particles at different heights with improved distribution
    let y;
    
    // Distribute particles in three main channels with slight variations
    const channel = i % 3;
    if (channel === 0) {
      // Top channel with variation
      y = canvasHeight * (0.2 + Math.random() * 0.15);
    } else if (channel === 1) {
      // Middle channel with variation
      y = canvasHeight * (0.4 + Math.random() * 0.2);
    } else {
      // Bottom channel with variation
      y = canvasHeight * (0.65 + Math.random() * 0.15);
    }
    
    // Create particle with varying speeds for more natural flow
    const particle = new MessageParticle(x, y, canvasHeight);
    
    // Add randomization to speeds for natural flow
    particle.speed = 0.5 + Math.random() * 1.8;
    
    particles.push(particle);
  }
  
  return particles;
};

// Helper function to get a random point along a curved path
export const getPointOnCurve = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  controlX: number,
  controlY: number,
  t: number
) => {
  // Quadratic Bezier curve formula - more precise calculation
  const x = Math.pow(1-t, 2) * startX + 2 * (1-t) * t * controlX + t * t * endX;
  const y = Math.pow(1-t, 2) * startY + 2 * (1-t) * t * controlY + t * t * endY;
  
  return { x, y };
};

// Enhanced helper function for creating glassmorphism effects
export const createGlassMorphism = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  radius: number, 
  color: string, 
  isHovered: boolean = false
) => {
  // Depth effect for more 3D appearance
  if (isHovered) {
    // Drop shadow for hovering
    ctx.shadowColor = color.includes('rgba') ? color : color + 'AA';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 5;
    ctx.shadowOffsetX = 0;
  } else {
    // Regular shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.shadowOffsetX = 0;
  }
  
  // Glassmorphic background
  const baseAlpha = isHovered ? 0.75 : 0.65;
  
  // Create multiple gradients for layered effect
  const bgGradient = ctx.createLinearGradient(x, y, x, y + height);
  bgGradient.addColorStop(0, `rgba(16, 28, 45, ${baseAlpha + 0.1})`);
  bgGradient.addColorStop(1, `rgba(8, 16, 30, ${baseAlpha})`);
  
  // Draw main glass panel with rounded corners
  ctx.fillStyle = bgGradient;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
  
  // Add subtle border - brighter when hovered
  const borderOpacity = isHovered ? 0.35 : 0.15;
  ctx.strokeStyle = color.includes('rgba') 
    ? color.replace(/[^,]+\)/, `${borderOpacity})`)
    : `${color}${Math.floor(borderOpacity * 255).toString(16).padStart(2, '0')}`;
  ctx.lineWidth = isHovered ? 1.5 : 1;
  ctx.stroke();
  
  // Add highlight reflection on top
  ctx.beginPath();
  ctx.roundRect(
    x + 3, 
    y + 3, 
    width - 6, 
    height / 8, 
    [radius - 2, radius - 2, 0, 0]
  );
  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fill();
  
  // Add subtle bottom edge
  ctx.beginPath();
  ctx.roundRect(
    x + 3, 
    y + height - height/16, 
    width - 6, 
    height / 16, 
    [0, 0, radius - 2, radius - 2]
  );
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fill();
  
  // Reset shadow for subsequent drawing
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
};

// New function for drawing glowing connection lines
export const drawGlowingPath = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string,
  lineWidth: number = 2,
  dashPattern: number[] = []
) => {
  // Save context state
  ctx.save();
  
  // Set up shadow for glow effect
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  
  // Set line properties
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  
  if (dashPattern.length > 0) {
    ctx.setLineDash(dashPattern);
  }
  
  // Draw path
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  
  // Create a slight curve for more visual interest
  const controlX = (startX + endX) / 2;
  const controlY = Math.min(startY, endY) - 20;
  
  ctx.quadraticCurveTo(controlX, controlY, endX, endY);
  ctx.stroke();
  
  // Reset context state
  ctx.restore();
};

// New function for creating pulsing dots along a path
export const createPulsingDots = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string,
  count: number = 3,
  time: number
) => {
  const controlX = (startX + endX) / 2;
  const controlY = Math.min(startY, endY) - 20;
  
  for (let i = 0; i < count; i++) {
    // Calculate position along the path (0 to 1)
    const position = ((time / 100) + (i / count)) % 1;
    
    // Get point on curve
    const point = getPointOnCurve(
      startX, startY,
      endX, endY,
      controlX, controlY,
      position
    );
    
    // Calculate pulse size (0.7 to 1.3 range)
    const pulse = 1 + 0.3 * Math.sin((time + i * 100) / 200);
    const dotSize = 3 * pulse;
    
    // Draw glowing dot
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.arc(point.x, point.y, dotSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
  }
};

// New utility function for creating modern text rendering
export const renderModernText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string,
  align: CanvasTextAlign = 'center',
  isBold: boolean = false
) => {
  ctx.save();
  ctx.textAlign = align;
  ctx.font = `${isBold ? 'bold' : ''} ${fontSize}px Inter, SF Pro Display, sans-serif`;
  
  // Text shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetY = 1;
  
  // Text fill
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  
  ctx.restore();
};
