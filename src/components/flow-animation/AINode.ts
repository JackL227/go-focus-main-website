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
    this.pulseSpeed = 0.01;
    this.processingEffect = 0;
    this.logoImage = null;
    this.isLogoLoaded = false;
    
    this.loadLogoImage();
  }
  
  loadLogoImage() {
    this.logoImage = new Image();
    
    // Load the new logo
    this.logoImage.src = '/lovable-uploads/5194beae-d1b9-4241-aa64-908298f6913b.png';
    
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
    // Smoother pulse effect
    this.pulseRadius += this.pulseSpeed;
    if (this.pulseRadius > this.size * 1.5) { // Reduced maximum pulse size
      this.pulseRadius = this.size;
    }
    
    // Smooth processing effect animation
    this.processingEffect = (Math.sin(Date.now() * 0.001) + 1) / 2; // Smoother circular animation
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw outer glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseRadius * 1.2, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.8,
      this.x, this.y, this.pulseRadius * 1.2
    );
    glowGradient.addColorStop(0, 'rgba(0, 230, 118, 0.2)');
    glowGradient.addColorStop(1, 'rgba(0, 110, 218, 0.0)');
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    // Draw subtle outer pulse with more energy
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
    const pulseGradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.5,
      this.x, this.y, this.pulseRadius
    );
    pulseGradient.addColorStop(0, 'rgba(0, 230, 118, 0.15)');
    pulseGradient.addColorStop(0.7, 'rgba(0, 110, 218, 0.1)');
    pulseGradient.addColorStop(1, 'rgba(0, 110, 218, 0)');
    ctx.fillStyle = pulseGradient;
    ctx.fill();
    
    // Draw main node circle with very transparent background
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, 'rgba(0, 230, 118, 0.1)');
    gradient.addColorStop(0.6, 'rgba(0, 110, 218, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 56, 112, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add shadow effect for the logo
    ctx.shadowColor = colors.accent;
    ctx.shadowBlur = 15;
    
    // Draw logo in the center with adjusted size
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
    
    // Draw smooth processing indicator
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1.1 + this.processingEffect * 0.2), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 230, 118, ${0.3 - this.processingEffect * 0.15})`; 
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Secondary processing circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (1.2 + (1-this.processingEffect) * 0.25), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 110, 218, ${0.25 - (1-this.processingEffect) * 0.15})`;
    ctx.lineWidth = 1.5;
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
