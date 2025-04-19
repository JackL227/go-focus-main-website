
export default class OutcomePanel {
  x: number;
  y: number;
  type: string;
  pulseEffect: number;
  isPulsing: boolean;
  
  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.pulseEffect = 0;
    this.isPulsing = false;
  }
  
  pulse() {
    this.isPulsing = true;
    this.pulseEffect = 1;
  }
  
  update() {
    if (this.isPulsing) {
      this.pulseEffect -= 0.03;
      if (this.pulseEffect <= 0) {
        this.pulseEffect = 0;
        this.isPulsing = false;
      }
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    if (this.isPulsing) {
      // Only draw a subtle pulse effect when receiving a particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, 30 * (1 + this.pulseEffect), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 110, 218, ${0.2 * this.pulseEffect})`;
      ctx.fill();
    }
  }
  
  isPointInside(x: number, y: number): boolean {
    return false; // Disable hover effects
  }
}
