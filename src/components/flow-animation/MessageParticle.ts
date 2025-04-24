
class MessageParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'lead' | 'message';

  constructor(x: number, y: number, canvasHeight: number) {
    this.x = x;
    this.y = canvasHeight * (0.4 + Math.random() * 0.2);
    this.size = 4 + Math.random() * 3;
    this.speed = 1 + Math.random();
    this.opacity = 0.6 + Math.random() * 0.4;
    this.type = Math.random() > 0.5 ? 'lead' : 'message';
  }

  update() {
    this.x += this.speed;
    return this.x;
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
