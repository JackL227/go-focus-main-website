
class AINode {
  x: number;
  y: number;
  size: number;
  pulseValue: number;
  pulseDirection: number;
  glowIntensity: number;
  rotationAngle: number;
  particles: Array<{x: number, y: number, speed: number, size: number, opacity: number}>;
  logoImage: HTMLImageElement | null;
  logoLoaded: boolean;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = canvasWidth * 0.45; // Slightly left of center
    this.y = canvasHeight * 0.5;
    this.size = Math.min(canvasWidth, canvasHeight) * 0.05;
    this.pulseValue = 0;
    this.pulseDirection = 1;
    this.glowIntensity = 0.7;
    this.rotationAngle = 0;
    this.particles = [];
    this.logoImage = null;
    this.logoLoaded = false;
    
    // Create orbiting particles
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: 0,
        y: 0,
        speed: 0.01 + Math.random() * 0.02,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7
      });
    }
    
    // Load logo image
    this.logoImage = new Image();
    this.logoImage.src = '/lovable-uploads/8b31d02f-6dc6-4cdc-9888-4466c2749bd6.png';
    this.logoImage.onload = () => {
      this.logoLoaded = true;
    };
  }
  
  update() {
    // Pulsing animation
    this.pulseValue += 0.03 * this.pulseDirection;
    if (this.pulseValue > 1 || this.pulseValue < 0) {
      this.pulseDirection *= -1;
    }
    
    // Rotate slightly
    this.rotationAngle += 0.01;
    
    // Update orbiting particles
    for (const particle of this.particles) {
      const angle = this.rotationAngle * particle.speed * 10;
      const distance = this.size * (1.5 + Math.sin(this.pulseValue * Math.PI) * 0.3);
      particle.x = this.x + Math.cos(angle) * distance;
      particle.y = this.y + Math.sin(angle) * distance;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw outer glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 2
    );
    
    const pulseIntensity = 0.5 + Math.sin(this.pulseValue * Math.PI) * 0.3;
    
    gradient.addColorStop(0, `rgba(255, 200, 50, ${0.8 * pulseIntensity})`);
    gradient.addColorStop(0.5, `rgba(255, 150, 0, ${0.4 * pulseIntensity})`);
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw inner core
    const innerGradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    
    innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    innerGradient.addColorStop(0.4, 'rgba(255, 220, 150, 0.8)');
    innerGradient.addColorStop(1, 'rgba(255, 180, 50, 0.7)');
    
    ctx.fillStyle = innerGradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw orbiting particles
    for (const particle of this.particles) {
      ctx.globalAlpha = particle.opacity * (0.7 + Math.sin(this.pulseValue * Math.PI) * 0.3);
      ctx.fillStyle = 'rgba(255, 220, 150, 1)';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw logo on top if loaded
    if (this.logoLoaded && this.logoImage) {
      try {
        // Calculate size to maintain aspect ratio but fit within the orb
        const aspectRatio = this.logoImage.width / this.logoImage.height;
        let drawWidth = this.size * 1.2;
        let drawHeight = drawWidth / aspectRatio;
        
        if (drawHeight > this.size * 1.2) {
          drawHeight = this.size * 1.2;
          drawWidth = drawHeight * aspectRatio;
        }
        
        ctx.globalAlpha = 0.8 + Math.sin(this.pulseValue * Math.PI) * 0.2;
        ctx.drawImage(
          this.logoImage,
          this.x - drawWidth / 2,
          this.y - drawHeight / 2,
          drawWidth,
          drawHeight
        );
      } catch (e) {
        console.error("Error drawing logo:", e);
      }
    }
    
    ctx.globalAlpha = 1;
  }
  
  processParticle(particle: any): boolean {
    const dx = this.x - particle.x;
    const dy = this.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < this.size;
  }
}

export default AINode;
