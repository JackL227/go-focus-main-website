
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
  }
  
  update() {
    // Move message from left to center
    this.x += this.speed;
    // Subtle vertical movement
    this.y += Math.sin(this.x * 0.01) * 0.2;
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
