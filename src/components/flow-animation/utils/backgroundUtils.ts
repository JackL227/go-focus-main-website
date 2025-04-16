
// Utility functions for handling background elements

/**
 * Creates background particles with various colors and properties
 */
export const createBackgroundParticles = (width: number, height: number) => {
  const bgParticles: {x: number; y: number; size: number; speed: number; opacity: number; color: string;}[] = [];
  for (let i = 0; i < 60; i++) {
    // Determine color based on position - creates visual depth
    const colorValue = i % 5 === 0 ? '#00E676' : 
                      i % 7 === 0 ? '#FFC107' : '#006eda';
    
    bgParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.4 + 0.1,
      color: colorValue
    });
  }
  return bgParticles;
};

/**
 * Draw the background with grid and particles
 */
export const drawBackground = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  bgParticles: {x: number; y: number; size: number; speed: number; opacity: number; color: string;}[]
) => {
  // Create premium dark gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#050A15');
  gradient.addColorStop(0.5, '#071020');
  gradient.addColorStop(1, '#091830');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Draw subtle grid pattern for depth
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  
  const gridSize = 40;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  // Draw background particles with improved visual quality
  bgParticles.forEach((particle, i) => {
    // Draw glow around particle
    createGlow(ctx, particle.x, particle.y, particle.size * 3, particle.color, particle.opacity);
    
    // Draw core particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.fill();
    
    // Move particles
    particle.x += particle.speed;
    
    // Reset particles that go off screen
    if (particle.x > width) {
      particle.x = 0;
      particle.y = Math.random() * height;
    }
  });
  
  // Apply slight blur for depth effect - only if performance allows
  if (width < 1200) { // Skip on larger screens to maintain performance
    ctx.filter = 'blur(1px)';
    ctx.drawImage(ctx.canvas, 0, 0, width, height);
    ctx.filter = 'none';
  }
};

// Create radial glow effect - imported from flowAnimationUtils
const createGlow = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, intensity: number = 1) => {
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
