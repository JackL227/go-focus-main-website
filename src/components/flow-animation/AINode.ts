
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
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 40; // Fixed size for consistent appearance
    this.pulseRadius = this.size;
    this.pulseOpacity = 0.2;
    this.pulseSpeed = 0.01;
    this.rotation = 0;
    this.rotationSpeed = 0.005;
    this.processingEffect = 0;
    this.processingDirection = 1;
  }
  
  update() {
    // Pulse effect
    this.pulseRadius += this.pulseSpeed;
    if (this.pulseRadius > this.size * 1.5) {
      this.pulseRadius = this.size;
    }
    
    // Rotation effect for inner elements
    this.rotation += this.rotationSpeed;
    if (this.rotation > Math.PI * 2) {
      this.rotation = 0;
    }
    
    // Processing effect
    this.processingEffect += 0.02 * this.processingDirection;
    if (this.processingEffect > 1 || this.processingEffect < 0) {
      this.processingDirection *= -1;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw outer pulse
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 110, 218, ${this.pulseOpacity})`;
    ctx.fill();
    
    // Draw outer glow
    ctx.shadowColor = colors.primary;
    ctx.shadowBlur = 15;
    
    // Draw main node
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(1, '#003870');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw processing indicator (ripple effect)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (0.6 + this.processingEffect * 0.3), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - this.processingEffect * 0.6})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw inner rotating elements (abstract AI representation)
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Inner circles
    for (let i = 0; i < 3; i++) {
      const angle = (Math.PI * 2 / 3) * i;
      const orbitRadius = this.size * 0.5;
      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius;
      const circleSize = this.size * (0.12 + this.processingEffect * 0.05);
      
      ctx.beginPath();
      ctx.arc(x, y, circleSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fill();
    }
    
    // Core circle
    ctx.beginPath();
    ctx.arc(0, 0, this.size * (0.22 + this.processingEffect * 0.05), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
    
    // Logo text
    ctx.font = `${this.size * 0.15}px Arial`;
    ctx.fillStyle = '#003870';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Go Focus', 0, -4);
    ctx.fillText('AI', 0, 4);
    
    ctx.restore();
  }
  
  processParticle(particle: {x: number, y: number}): boolean {
    // Check if particle is within processing range
    const dx = this.x - particle.x;
    const dy = this.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < this.size * 1.2;
  }
}

export default AINode;
