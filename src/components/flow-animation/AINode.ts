
class AINode {
  x: number;
  y: number;
  size: number;
  pulseSize: number;
  pulseDir: number;
  image: HTMLImageElement;
  isImageLoaded: boolean;
  rotation: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 50; // Slightly smaller for better proportion
    this.pulseSize = 0;
    this.pulseDir = 1;
    this.isImageLoaded = false;
    this.rotation = 0;
    
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
    
    // Add slight rotation for dynamic effect
    this.rotation += 0.002;
  }

  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw outer glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.5,
      this.x, this.y, this.size * (1.5 + this.pulseSize * 0.5)
    );
    gradient.addColorStop(0, `${colors.primary}33`);
    gradient.addColorStop(1, `${colors.primary}00`);
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1.5 + this.pulseSize * 0.5), 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw logo image if loaded
    if (this.isImageLoaded) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      const imgSize = this.size * 1.8;
      ctx.drawImage(
        this.image,
        -imgSize / 2,
        -imgSize / 2,
        imgSize,
        imgSize
      );
      ctx.restore();
    }

    // Draw inner glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1 + this.pulseSize * 0.2), 0, Math.PI * 2);
    ctx.fillStyle = `${colors.primary}22`;
    ctx.fill();
  }
}

export default AINode;
