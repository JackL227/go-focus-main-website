
// Define the colors for the animation
export const animationColors = {
  primary: '#006eda', // blue
  secondary: '#1EAEDB', // neon teal
  accent: '#00E676', // neon green
  highlight: '#FFC107', // amber/gold
  qualified: '#00E676', // green for qualified leads
  booked: '#006eda', // blue for booked
  closed: '#FFC107', // gold for closed deals
  faded: 'rgba(120, 130, 150, 0.5)', // grey with opacity
  analytics: '#006eda', // blue
  darkNavy: '#081020', // deep navy background
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
  
  // Distribute particles more naturally across channels
  for (let i = 0; i < count; i++) {
    // Enhanced horizontal position distribution
    const horizontalOffset = Math.random() * 400 + (i * 20);
    const x = -horizontalOffset;
    
    // Create more precise channels for visual flow
    let y;
    const channel = i % 4; // Four channels instead of three
    
    if (channel === 0) {
      // Top channel
      y = canvasHeight * (0.15 + Math.random() * 0.15);
    } else if (channel === 1) {
      // Upper middle channel
      y = canvasHeight * (0.35 + Math.random() * 0.15);
    } else if (channel === 2) {
      // Lower middle channel
      y = canvasHeight * (0.55 + Math.random() * 0.15);
    } else {
      // Bottom channel
      y = canvasHeight * (0.75 + Math.random() * 0.15);
    }
    
    // Create particle with enhanced speed variation
    const particle = new MessageParticle(x, y, canvasHeight);
    
    // Add more speed variation for natural flow
    particle.speed = 0.8 + Math.random() * 1.5;
    
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
  // Quadratic Bezier curve formula
  const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
  const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
  
  return { x, y };
};
