
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
    this.size = 50;
    this.pulseSize = 0;
    this.pulseDir = 1;
    this.isImageLoaded = false;
    this.rotation = 0;
    
    // Load the new logo image
    this.image = new Image();
    this.image.src = '/lovable-uploads/873abdac-ee0c-4921-aef0-aaf1ca6223f8.png';
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
    // Subtle pulse effect only for the glow
    this.pulseSize += 0.01 * this.pulseDir;
    if (this.pulseSize > 0.3 || this.pulseSize < 0) {
      this.pulseDir *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw outer glow with subtle pulse
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.5,
      this.x, this.y, this.size * (1.2 + this.pulseSize)
    );
    gradient.addColorStop(0, `${colors.primary}33`);
    gradient.addColorStop(1, `${colors.primary}00`);
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1.2 + this.pulseSize), 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw logo image if loaded
    if (this.isImageLoaded) {
      const imgSize = this.size * 1.8;
      ctx.drawImage(
        this.image,
        this.x - imgSize / 2,
        this.y - imgSize / 2,
        imgSize,
        imgSize
      );
    }

    // Draw subtle inner glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 1.1, 0, Math.PI * 2);
    ctx.fillStyle = `${colors.primary}11`;
    ctx.fill();
  }
}

export default AINode;
