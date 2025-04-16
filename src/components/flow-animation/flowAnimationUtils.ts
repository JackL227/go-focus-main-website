
// Define the colors for the animation
export const animationColors = {
  primary: '#006eda', // blue
  secondary: '#006eda', // blue
  accent: '#00E676', // neon green
  highlight: '#FFC107', // amber/gold
  faded: 'rgba(120, 130, 150, 0.5)', // grey with opacity
  analytics: '#006eda', // blue
  glassBg: 'rgba(15, 25, 45, 0.7)', // semi-transparent background for glass effect
  glassBorder: 'rgba(255, 255, 255, 0.1)', // subtle white border for glass effect
  shadow: 'rgba(0, 0, 0, 0.15)', // soft shadow
  glow: 'rgba(0, 110, 218, 0.3)', // soft glow color
};

// Canvas sizing helper function
export const setCanvasSize = (canvas: HTMLCanvasElement) => {
  const parent = canvas.parentElement;
  if (parent) {
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Set higher resolution for retina displays
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = canvas.width * dpr;
  canvas.height = canvas.height * dpr;
  canvas.style.width = `${canvas.width / dpr}px`;
  canvas.style.height = `${canvas.height / dpr}px`;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
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

// Draw glassmorphism effect
export const drawGlassmorphism = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, colors: Record<string, string>) => {
  // Save context state
  ctx.save();
  
  // Create gradient for glass effect
  const gradient = ctx.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
  
  // Draw rounded rectangle for glass panel
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fillStyle = colors.glassBg;
  ctx.fill();
  
  // Apply gradient overlay
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Add subtle border
  ctx.strokeStyle = colors.glassBorder;
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Add shine effect at the top
  ctx.beginPath();
  ctx.roundRect(x + 5, y + 5, width - 10, height * 0.15, radius / 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.fill();
  
  // Restore context state
  ctx.restore();
};

// Create radial glow effect
export const createGlow = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, intensity: number = 1) => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'transparent');
  
  ctx.globalAlpha = 0.7 * intensity;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};
