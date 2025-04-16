
// Define the colors for the animation
export const animationColors = {
  primary: '#006eda', // blue
  secondary: '#006eda', // blue
  accent: '#00E676', // neon green
  highlight: '#FFC107', // amber/gold
  faded: 'rgba(120, 130, 150, 0.5)', // grey with opacity
  analytics: '#006eda', // blue
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
  
  // Create particles at regular vertical intervals to fill the left side of the screen
  const verticalSpacing = canvasHeight / count;
  
  for (let i = 0; i < count; i++) {
    // Stagger the horizontal positions for a more natural flow
    const horizontalOffset = Math.random() * 100;
    const x = -50 - horizontalOffset;
    
    // Place them at regular intervals vertically with some randomness
    const y = verticalSpacing * i + Math.random() * (verticalSpacing * 0.5);
    
    // Create particle with varying speeds
    const particle = new MessageParticle(x, y, canvasHeight);
    particles.push(particle);
  }
  
  return particles;
};
