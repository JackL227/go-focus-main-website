
class AINode {
  x: number;
  y: number;
  size: number;
  pulseSize: number;
  pulseDir: number;
  image: HTMLImageElement;
  isImageLoaded: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 60;
    this.pulseSize = 0;
    this.pulseDir = 1;
    this.isImageLoaded = false;
    
    // Load the logo image
    this.image = new Image();
    this.image.src = '/lovable-uploads/5aa60a2a-0096-4874-a3c7-f4c34cc374be.png';
    this.image.onload = () => {
      this.isImageLoaded = true;
    };
  }

  processParticle(particle: any): boolean {
    const dx = this.x - particle.x;
    const dy = this.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.size / 2;
  }

  update() {
    // Update pulse effect
    this.pulseSize += 0.02 * this.pulseDir;
    if (this.pulseSize > 1 || this.pulseSize < 0) {
      this.pulseDir *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw pulse effect
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1 + this.pulseSize * 0.3), 0, Math.PI * 2);
    ctx.fillStyle = `${colors.primary}33`;
    ctx.fill();

    // Draw logo image if loaded
    if (this.isImageLoaded) {
      const imgSize = this.size * 1.5;
      ctx.drawImage(
        this.image,
        this.x - imgSize / 2,
        this.y - imgSize / 2,
        imgSize,
        imgSize
      );
    }
  }
}

export default AINode;
