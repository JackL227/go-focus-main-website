
// Define the colors for the animation
export const animationColors = {
  primary: '#006eda', // blue
  secondary: '#006eda', // blue
  accent: '#006eda', // blue
  highlight: '#006eda', // blue
  faded: 'rgba(206, 206, 206, 0.5)', // grey with opacity
  analytics: '#006eda', // blue
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
