
class MessageParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  type: string;
  opacity: number;
  blinkRate: number;
  blinkTime: number;
  isQualified: boolean;
  targetX: number | null;
  targetY: number | null;
  accelerationFactor: number;
  
  constructor(x: number, y: number, canvasHeight: number) {
    this.x = x;
    this.y = canvasHeight * (0.3 + Math.random() * 0.4); // Keep within middle area
    this.size = 3 + Math.random() * 5;
    this.speed = 0.5 + Math.random() * 1.5;
    // Message types: circle (DM), square (chat), diamond (question)
    this.type = ['circle', 'square', 'diamond'][Math.floor(Math.random() * 3)];
    this.opacity = 0.3 + Math.random() * 0.5;
    this.blinkRate = 0.005 + Math.random() * 0.02;
    this.blinkTime = Math.random() * Math.PI * 2;
    // Determine if this will be a qualified lead (roughly 30%)
    this.isQualified = Math.random() > 0.7;
    this.targetX = null;
    this.targetY = null;
    this.accelerationFactor = 1.03;
  }
  
  redirectToNode(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
    this.speed = 1 + Math.random() * 1.5;
    // Increase size and opacity for emphasis
    this.size *= 1.2;
    this.opacity = 0.8;
  }
  
  update() {
    if (this.targetX !== null && this.targetY !== null) {
      // Move toward the target (AI node)
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
        this.speed *= this.accelerationFactor; // Accelerate toward target
      } else {
        // Very close to target, move directly to it
        this.x = this.targetX;
        this.y = this.targetY;
      }
    } else {
      // Normal left-to-right movement
      this.x += this.speed;
      // Subtle vertical movement
      this.y += Math.sin(this.x * 0.01) * 0.2;
    }
    
    // Blink effect for emphasis
    this.blinkTime += this.blinkRate;
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    const blinkOpacity = Math.sin(this.blinkTime) * 0.2 + 0.8;
    ctx.globalAlpha = this.opacity * blinkOpacity;
    
    if (this.type === 'circle') {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
      ctx.fill();
    } else if (this.type === 'square') {
      ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    } else if (this.type === 'diamond') {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.size);
      ctx.lineTo(this.x + this.size, this.y);
      ctx.lineTo(this.x, this.y + this.size);
      ctx.lineTo(this.x - this.size, this.y);
      ctx.closePath();
      ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
  }
}

export default MessageParticle;
