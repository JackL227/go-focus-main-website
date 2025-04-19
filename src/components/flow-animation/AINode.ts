
class AINode {
  x: number;
  y: number;
  size: number;
  pulseRadius: number;
  pulseOpacity: number;
  pulseSpeed: number;
  processingEffect: number;
  logoImage: HTMLImageElement | null;
  isLogoLoaded: boolean;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.pulseRadius = this.size;
    this.pulseOpacity = 0.3;
    this.pulseSpeed = 0.01; // Slower pulse speed for smoother animation
    this.processingEffect = 0;
    this.logoImage = null;
    this.isLogoLoaded = false;
    
    this.loadLogoImage();
  }
  
  loadLogoImage() {
    this.logoImage = new Image();
    
    // Immediately set a fallback in case the image fails to load
    const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzAwNmVkYSIvPjwvc3ZnPg==';
    
    // Set up event handlers before setting src to avoid race conditions
    this.logoImage.onload = () => {
      console.log("Logo image loaded successfully");
      this.isLogoLoaded = true;
    };
    
    this.logoImage.onerror = (err) => {
      console.error("Failed to load logo image:", err);
      // If loading fails, use the fallback
      if (this.logoImage) {
        this.logoImage.src = fallbackImage;
      }
    };
    
    // Try to load the requested image
    this.logoImage.src = '/lovable-uploads/9586f2a1-3b2d-447e-9de4-2add6bd5fc4d.png';
    
    // Set a timeout as a safety measure - if image hasn't loaded in 2 seconds, use fallback
    setTimeout(() => {
      if (!this.isLogoLoaded && this.logoImage) {
        console.log("Logo loading timed out, using fallback");
        this.logoImage.src = fallbackImage;
      }
    }, 2000);
  }
  
  update() {
    // Smoother pulse effect
    this.pulseRadius += this.pulseSpeed;
    if (this.pulseRadius > this.size * 1.5) { // Reduced maximum pulse size
      this.pulseRadius = this.size;
    }
    
    // Smooth processing effect animation
    this.processingEffect = (Math.sin(Date.now() * 0.001) + 1) / 2; // Smoother circular animation
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw subtle outer pulse
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 110, 218, ${this.pulseOpacity * 0.3})`; // More subtle pulse
    ctx.fill();
    
    // Draw outer glow
    ctx.shadowColor = colors.primary;
    ctx.shadowBlur = 15;
    
    // Draw main node circle with very transparent background
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, 'rgba(0, 110, 218, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 56, 112, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw logo in the center - ensure it's visible
    if (this.logoImage) {  // Always try to draw the logo even if isLogoLoaded is false
      const logoSize = this.size * 2.8; // Slightly larger logo
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.drawImage(
        this.logoImage, 
        this.x - logoSize/2, 
        this.y - logoSize/2, 
        logoSize, 
        logoSize
      );
      ctx.restore();
    }
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw smooth processing indicator
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (0.8 + this.processingEffect * 0.2), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - this.processingEffect * 0.2})`; // More subtle processing circle
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  
  processParticle(particle: {x: number, y: number}): boolean {
    const dx = this.x - particle.x;
    const dy = this.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.size * 1.2;
  }
}

export default AINode;
