
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
    this.image.src = '/lovable-uploads/1f5c8895-5e56-4fd1-8478-e056bea50c33.png';
    this.image.onload = () => {
      this.isImageLoaded = true;
      console.log('Logo image loaded successfully');
    };
    this.image.onerror = () => {
      console.error('Failed to load logo image');
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
    this.pulseSize += 0.005 * this.pulseDir;
    if (this.pulseSize > 0.1 || this.pulseSize < 0) {
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

    // Draw logo image if loaded - make sure this is the main focus
    if (this.isImageLoaded) {
      const imgSize = this.size * 2.5; // Increased size to make logo more prominent
      ctx.save();
      ctx.drawImage(
        this.image,
        this.x - imgSize / 2,
        this.y - imgSize / 2,
        imgSize,
        imgSize
      );
      ctx.restore();
    } else {
      // Fallback if image isn't loaded
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = colors.primary;
      ctx.fill();
    }
  }
}

export default AINode;
