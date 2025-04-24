
class MessageParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'lead' | 'message';
  isQualified: boolean;
  targetX: number | null = null;
  targetY: number | null = null;

  constructor(x: number, y: number, canvasHeight: number) {
    this.x = x;
    this.y = canvasHeight * (0.4 + Math.random() * 0.2);
    this.size = 4 + Math.random() * 3;
    this.speed = 1 + Math.random();
    this.opacity = 0.6 + Math.random() * 0.4;
    this.type = Math.random() > 0.5 ? 'lead' : 'message';
    this.isQualified = Math.random() > 0.3; // 70% chance of being qualified
  }

  update() {
    if (this.targetX !== null && this.targetY !== null) {
      // Move towards target
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        this.x += (dx / distance) * this.speed * 2;
        this.y += (dy / distance) * this.speed * 2;
      }
    } else {
      this.x += this.speed;
    }
    return this.x;
  }

  redirectToNode(targetX: number, targetY: number) {
    this.targetX = targetX;
    this.targetY = targetY;
  }

  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `${colors.primary}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
    ctx.fill();

    // Add trail effect
    ctx.beginPath();
    ctx.moveTo(this.x - 20, this.y);
    ctx.lineTo(this.x, this.y);
    const gradient = ctx.createLinearGradient(this.x - 20, this.y, this.x, this.y);
    gradient.addColorStop(0, `${colors.primary}00`);
    gradient.addColorStop(1, `${colors.primary}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.size;
    ctx.stroke();
  }
}

export default MessageParticle;
