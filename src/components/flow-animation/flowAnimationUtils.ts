
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

// Create initial particles
export const createInitialMessageParticles = (count: number, MessageParticle: any, canvasHeight: number) => {
  const particles = [];
  
  // Calculate a more natural distribution for particles
  for (let i = 0; i < count; i++) {
    // Horizontal position: staggered from left edge with increasing distance
    const horizontalOffset = Math.random() * 300 + (i * 15);
    const x = -horizontalOffset;
    
    // Create clusters of particles at different heights
    let y;
    
    // Distribute particles in three main channels
    const channel = i % 3;
    if (channel === 0) {
      // Top channel
      y = canvasHeight * (0.2 + Math.random() * 0.15);
    } else if (channel === 1) {
      // Middle channel
      y = canvasHeight * (0.4 + Math.random() * 0.2);
    } else {
      // Bottom channel
      y = canvasHeight * (0.65 + Math.random() * 0.15);
    }
    
    // Create particle with varying speeds
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
  // Quadratic Bezier curve formula
  const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
  const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
  
  return { x, y };
};
