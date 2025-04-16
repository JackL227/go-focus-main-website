
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
  orbitElements: Array<{angle: number, speed: number, size: number, distance: number}>;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.size = Math.min(canvasWidth, canvasHeight) * 0.08; // Responsive size
    this.pulseRadius = this.size;
    this.pulseOpacity = 0.2;
    this.pulseSpeed = 0.01;
    this.rotation = 0;
    this.rotationSpeed = 0.005;
    this.processingEffect = 0;
    this.processingDirection = 1;
    
    // Create orbital elements around the AI node
    this.orbitElements = [];
    for (let i = 0; i < 5; i++) {
      this.orbitElements.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.003,
        size: 2 + Math.random() * 4,
        distance: this.size * (0.8 + Math.random() * 0.5)
      });
    }
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
    
    // Update orbit elements
    this.orbitElements.forEach(el => {
      el.angle += el.speed;
      if (el.angle > Math.PI * 2) {
        el.angle -= Math.PI * 2;
      }
    });
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw outer glow pulses
    for (let i = 0; i < 3; i++) {
      const radius = this.pulseRadius * (1 + i * 0.3);
      const opacity = this.pulseOpacity / (i + 1) * 1.5;
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 196, 167, ${opacity})`; // Teal glow
      ctx.fill();
    }
    
    // Draw orbiting elements
    this.orbitElements.forEach(el => {
      const x = this.x + Math.cos(el.angle) * el.distance;
      const y = this.y + Math.sin(el.angle) * el.distance;
      
      ctx.beginPath();
      ctx.arc(x, y, el.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 196, 167, ${0.6 + Math.sin(el.angle * 2) * 0.4})`;
      ctx.fill();
      
      // Draw connection line to core
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `rgba(0, 196, 167, ${0.2 + Math.sin(el.angle * 3) * 0.1})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });
    
    // Draw main node with shadow for glow effect
    ctx.shadowColor = colors.accent;
    ctx.shadowBlur = 15;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, '#00c4a7'); // Teal core
    gradient.addColorStop(0.7, colors.primary);
    gradient.addColorStop(1, '#003d68'); // Darker blue edge
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Reset shadow
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
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Small "S" or logo in the center
    ctx.fillStyle = '#00c4a7';
    ctx.font = `bold ${this.size * 0.3}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', 0, 0);
    
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
