
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
    this.size = 55; // Slightly larger central node
    this.pulseRadius = this.size;
    this.pulseOpacity = 0.3;
    this.pulseSpeed = 0.01;
    this.processingEffect = 0;
    this.logoImage = null;
    this.isLogoLoaded = false;
    
    this.loadLogoImage();
  }
  
  loadLogoImage() {
    this.logoImage = new Image();
    
    // Use a data URL for the logo to avoid path issues
    // This is a base64 encoded version of the logo
    const logoDataUrl = 'data:image/png;base64,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';
    this.logoImage.src = logoDataUrl;
    
    this.logoImage.onload = () => {
      console.log("Logo image loaded successfully");
      this.isLogoLoaded = true;
    };
    
    this.logoImage.onerror = (err) => {
      console.error("Failed to load logo image:", err);
      const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzAwNmVkYSIvPjwvc3ZnPg==';
      this.logoImage.src = fallbackImage;
    };
    
    setTimeout(() => {
      if (!this.isLogoLoaded && this.logoImage) {
        console.log("Logo loading timed out, using fallback");
        const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzAwNmVkYSIvPjwvc3ZnPg==';
        this.logoImage.src = fallbackImage;
      }
    }, 2000);
  }
  
  update() {
    // Smoother pulse effect with improved animation timing
    this.pulseRadius += this.pulseSpeed;
    if (this.pulseRadius > this.size * 1.4) { // Slightly reduced maximum pulse size for clean look
      this.pulseRadius = this.size;
    }
    
    // Enhanced processing effect animation for more fluid motion
    this.processingEffect = (Math.sin(Date.now() * 0.001) + 1) / 2; // Smoother circular animation
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw deep outer glow for depth
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseRadius * 1.3, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.7,
      this.x, this.y, this.pulseRadius * 1.3
    );
    // Enhanced glow with deeper blue at the edges
    glowGradient.addColorStop(0, 'rgba(0, 230, 118, 0.15)');
    glowGradient.addColorStop(0.5, 'rgba(0, 180, 220, 0.08)');
    glowGradient.addColorStop(1, 'rgba(0, 110, 218, 0.0)');
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    // Draw improved outer pulse with more energy and depth
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseRadius * 0.95, 0, Math.PI * 2);
    const pulseGradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.4,
      this.x, this.y, this.pulseRadius
    );
    // More vibrant but still subtle gradient
    pulseGradient.addColorStop(0, 'rgba(0, 230, 118, 0.18)');
    pulseGradient.addColorStop(0.6, 'rgba(0, 180, 220, 0.12)');
    pulseGradient.addColorStop(1, 'rgba(0, 110, 218, 0)');
    ctx.fillStyle = pulseGradient;
    ctx.fill();
    
    // Draw main node circle with improved glassmorphism effect
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    // More sophisticated depth with slightly better transparency
    gradient.addColorStop(0, 'rgba(0, 230, 118, 0.12)');
    gradient.addColorStop(0.5, 'rgba(0, 150, 220, 0.12)');
    gradient.addColorStop(0.9, 'rgba(0, 56, 112, 0.08)');
    gradient.addColorStop(1, 'rgba(0, 40, 80, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add enhanced shadow effect for the logo
    ctx.shadowColor = colors.accent;
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 2; // Slight offset for 3D feel
    
    // Draw logo in the center with adjusted size and better quality
    if (this.logoImage) {
      const logoSize = this.size * 3; // Larger logo size
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
    ctx.shadowOffsetY = 0;
    
    // Draw improved processing indicator rings (more subtle and refined)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1.1 + this.processingEffect * 0.2), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 230, 118, ${0.25 - this.processingEffect * 0.12})`; 
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Secondary processing circle with slight phase offset for visual interest
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1.2 + (1-this.processingEffect) * 0.25), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 150, 220, ${0.22 - (1-this.processingEffect) * 0.12})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    
    // Add subtle tertiary processing circle for more depth
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1.3 + (Math.sin(Date.now() * 0.0015) + 1) / 2 * 0.15), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(60, 130, 240, ${0.1})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  
  processParticle(particle: {x: number, y: number, isQualified?: boolean}): boolean {
    const dx = this.x - particle.x;
    const dy = this.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Create a slightly larger processing zone for qualified leads
    const qualifiedBonus = particle.isQualified ? 0.3 : 0;
    return distance < this.size * (1.2 + qualifiedBonus);
  }
}

export default AINode;
