
// Define the colors for the animation
export const animationColors = {
  primary: '#1E3A8A', // trader-blue
  secondary: '#3B82F6', // trader-blue-light
  accent: '#10B981', // trader-green-light
  highlight: '#F59E0B', // trader-accent
  faded: 'rgba(107, 114, 128, 0.5)', // trader-gray with opacity
  analytics: '#8B5CF6', // purple for analytics
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
    const x = -50 - Math.random() * 100;
    const y = Math.random() * canvasHeight;
    particles.push(new MessageParticle(x, y, canvasHeight));
  }
  return particles;
};
