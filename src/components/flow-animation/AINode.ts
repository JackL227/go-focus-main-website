
class AINode {
  x: number;
  y: number;
  size: number;
  pulseRadius: number;
  pulseOpacity: number;
  pulseSpeed: number;
  rotation: number;
  rotationSpeed: number;
  processingEffect: number;
  processingDirection: number;
  logoImage: HTMLImageElement | null;
  isLogoLoaded: boolean;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.pulseRadius = this.size;
    this.pulseOpacity = 0.3;
    this.pulseSpeed = 0.02;
    this.rotation = 0;
    this.rotationSpeed = 0.007;
    this.processingEffect = 0;
    this.processingDirection = 1;
    this.logoImage = null;
    this.isLogoLoaded = false;
    
    this.loadLogoImage();
  }
  
  loadLogoImage() {
    const img = new Image();
    img.src = '/lovable-uploads/2169d2e1-980e-4b57-bd71-e3801dd099ec.png';
    img.onload = () => {
      this.logoImage = img;
      this.isLogoLoaded = true;
    };
    img.onerror = (err) => {
      console.error("Failed to load logo image:", err);
    };
  }
  
  update() {
    // Pulse effect
    this.pulseRadius += this.pulseSpeed;
    if (this.pulseRadius > this.size * 1.8) {
      this.pulseRadius = this.size;
    }
    
    // Processing effect
    this.processingEffect += 0.03 * this.processingDirection;
    if (this.processingEffect > 1 || this.processingEffect < 0) {
      this.processingDirection *= -1;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw multiple outer pulses for enhanced glow effect
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.pulseRadius - i * 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 110, 218, ${this.pulseOpacity - i * 0.05})`;
      ctx.fill();
    }
    
    // Draw outer glow
    ctx.shadowColor = colors.primary;
    ctx.shadowBlur = 20;
    
    // Draw main node
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.7, '#0052a3');
    gradient.addColorStop(1, '#003870');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw logo in the center
    if (this.isLogoLoaded && this.logoImage) {
      const logoSize = this.size * 1.8;
      ctx.save();
      ctx.globalAlpha = 0.95;
      ctx.drawImage(
        this.logoImage, 
        this.x - logoSize/2, 
        this.y - logoSize/2, 
        logoSize, 
        logoSize
      );
      ctx.restore();
    }
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw processing indicator (ripple effect)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (0.6 + this.processingEffect * 0.3), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - this.processingEffect * 0.6})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  processParticle(particle: {x: number, y: number}): boolean {
    const dx = this.x - particle.x;
    const dy = this.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.size * 1.2;
  }
}

export default AINode;
