
// Define the colors for the animation
export const animationColors = {
  primary: '#ffb347', // warm gold/amber
  secondary: '#ffd700', // golden yellow
  accent: '#ff8c00', // dark amber
  highlight: '#ffa500', // orange
  faded: 'rgba(255, 217, 179, 0.5)', // light amber with opacity
  analytics: '#ff7f50', // coral
};

// Canvas sizing helper function
export const setCanvasSize = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

// Create initial particles
export const createInitialMessageParticles = (count: number, MessageParticle: any, canvasHeight: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const x = -50 - Math.random() * 150;
    const y = Math.random() * canvasHeight * 0.7 + canvasHeight * 0.15; // Keep in middle area
    const particle = new MessageParticle(x, y, canvasHeight);
    particle.type = 'lead'; // All initial particles should be "Lead" type
    particles.push(particle);
  }
  return particles;
};
