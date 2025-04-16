
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
  for (let i = 0; i < count; i++) {
    const x = -50 - Math.random() * 100;
    const y = Math.random() * canvasHeight;
    particles.push(new MessageParticle(x, y, canvasHeight));
  }
  return particles;
};
