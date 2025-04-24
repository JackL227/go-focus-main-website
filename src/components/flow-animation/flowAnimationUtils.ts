
// Define the colors for the animation with enhanced palette
export const animationColors = {
  primary: '#006eda', // blue
  secondary: '#1EAEDB', // neon teal
  accent: '#00E676', // neon green
  highlight: '#FFC107', // amber/gold
  qualified: '#00E676', // green for qualified leads
  booked: '#1EAEDB', // brighter blue for booked
  closed: '#FFC107', // gold for closed deals
  faded: 'rgba(120, 130, 150, 0.4)', // more transparent grey
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

// New helper function for creating glassmorphism effects
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
  // Create gradient for glass effect
  const gradient = ctx.createLinearGradient(
    x, y, 
    x, y + height
  );
  gradient.addColorStop(0, 'rgba(25, 35, 55, 0.85)');
  gradient.addColorStop(1, 'rgba(15, 25, 40, 0.9)');
  
  // Add shadow for depth
  ctx.shadowColor = isHovered ? color : 'rgba(0, 0, 0, 0.25)';
  ctx.shadowBlur = isHovered ? 15 : 8;
  ctx.shadowOffsetY = 3;
  
  // Draw main glass panel
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
  
  // Add subtle border
  ctx.strokeStyle = color + (isHovered ? 'AA' : '55');
  ctx.lineWidth = isHovered ? 1.5 : 1;
  ctx.stroke();
  
  // Add highlight reflection on top
  ctx.beginPath();
  ctx.roundRect(
    x + 3, y + 3, 
    width - 6, height / 6, 
    [radius - 2, radius - 2, 0, 0]
  );
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fill();
};
