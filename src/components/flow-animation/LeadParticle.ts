
class LeadParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  type: string;
  opacity: number;
  trail: {x: number, y: number}[];
  pulseSize: number;
  pulseDir: number;
  targetX: number | null = null;
  targetY: number | null = null;
  hueRotate: number;
  
  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.size = 10 + Math.random() * 5; // Increased size for bigger cards
    this.speed = 1.5 + Math.random() * 1;
    // Lead types: calendar, checkmark, smile
    this.type = type || ['calendar', 'checkmark', 'smile'][Math.floor(Math.random() * 3)];
    this.opacity = 0.9;
    this.trail = [];
    this.pulseSize = 0;
    this.pulseDir = 1;
    this.hueRotate = Math.random() * 20; // Slight color variation
    
    // Add initial trail positions
    for (let i = 0; i < 15; i++) { // Extended trail
      this.trail.push({x: this.x - i * 3, y: this.y});
    }
  }
  
  setTarget(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }
  
  hasReachedTarget(): boolean {
    if (this.targetX === null || this.targetY === null) return false;
    
    const dx = this.x - this.targetX;
    const dy = this.y - this.targetY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < 10;
  }
  
  update() {
    if (this.targetX !== null && this.targetY !== null) {
      // Calculate direction to target
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        // Move towards target with dynamic speed (slower at start, faster at end)
        const progress = Math.max(0, 1 - distance / 100);
        const speedMultiplier = 0.8 + progress * 0.7;
        
        this.x += (dx / distance) * this.speed * speedMultiplier;
        this.y += (dy / distance) * this.speed * speedMultiplier;
      } else {
        // Very close to target, snap to it
        this.x = this.targetX;
        this.y = this.targetY;
      }
    } else {
      // Default movement if no target
      this.x += this.speed;
    }
    
    // Update trail with smoothing
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > 15) { // Keep longer trail
      this.trail.shift();
    }
    
    // Pulse effect animation
    this.pulseSize += 0.05 * this.pulseDir;
    if (this.pulseSize > 1 || this.pulseSize < 0) {
      this.pulseDir *= -1;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Determine color based on type
    let color: string;
    if (this.type === 'checkmark') {
      color = '#00E676'; // Green
    } else if (this.type === 'calendar') {
      color = colors.primary; // Blue
    } else {
      color = '#FFC107'; // Gold/amber
    }
    
    // Draw fancy trail with increased intensity
    ctx.globalAlpha = 0.5; // Increased opacity
    
    // Draw glowing trail
    ctx.lineWidth = 3; // Thicker trail
    ctx.strokeStyle = color;
    
    // Create gradient for trail
    const trailGradient = ctx.createLinearGradient(
      this.trail[0].x, this.trail[0].y,
      this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y
    );
    trailGradient.addColorStop(0, `${color}33`); // 20% opacity
    trailGradient.addColorStop(0.5, `${color}66`); // 40% opacity
    trailGradient.addColorStop(1, color); // Full opacity
    
    // Draw curved trail
    ctx.beginPath();
    ctx.moveTo(this.trail[0].x, this.trail[0].y);
    
    // Enhanced curved trail for smoother animation
    for (let i = 1; i < this.trail.length - 2; i++) {
      const xc = (this.trail[i].x + this.trail[i + 1].x) / 2;
      const yc = (this.trail[i].y + this.trail[i + 1].y) / 2;
      ctx.quadraticCurveTo(this.trail[i].x, this.trail[i].y, xc, yc);
    }
    
    // Handle the last two points separately to close the curve
    if (this.trail.length > 2) {
      const lastPoint = this.trail[this.trail.length - 1];
      const secondLastPoint = this.trail[this.trail.length - 2];
      ctx.quadraticCurveTo(
        secondLastPoint.x, 
        secondLastPoint.y, 
        lastPoint.x, 
        lastPoint.y
      );
    }
    
    ctx.strokeStyle = trailGradient;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Add glow effect for trails
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.globalAlpha = 1;
    
    // Draw lead card with increased size
    const cardWidth = this.size * 4;  // Bigger cards
    const cardHeight = this.size * 2.5; // Bigger cards
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 15; // Enhanced glow
    
    // Draw card with rounded corners and glassmorphism effect
    const cardGradient = ctx.createLinearGradient(
      this.x - cardWidth/2, 
      this.y - cardHeight/2, 
      this.x + cardWidth/2, 
      this.y + cardHeight/2
    );
    cardGradient.addColorStop(0, 'rgba(20, 30, 50, 0.85)');
    cardGradient.addColorStop(1, 'rgba(10, 20, 40, 0.9)');
    
    ctx.fillStyle = cardGradient;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.roundRect(
      this.x - cardWidth/2, 
      this.y - cardHeight/2, 
      cardWidth, 
      cardHeight, 
      5
    );
    ctx.fill();
    ctx.stroke();
    
    // Add highlight to give 3D effect
    ctx.beginPath();
    ctx.roundRect(
      this.x - cardWidth/2 + 2, 
      this.y - cardHeight/2 + 2, 
      cardWidth - 4, 
      cardHeight/5, 
      [4, 4, 0, 0]
    );
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw label with icon based on type
    ctx.font = `bold ${this.size * 1.2}px 'Poppins', Arial`; // Larger, bolder font
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw different icon based on type
    const iconY = this.y - this.size * 0.2;
    if (this.type === 'checkmark') {
      // Checkmark icon
      this.drawIcon(ctx, '✓', color, this.x, iconY);
    } else if (this.type === 'calendar') {
      // Calendar icon
      this.drawIcon(ctx, '📅', color, this.x, iconY);
    } else {
      // Dollar sign icon
      this.drawIcon(ctx, '$', color, this.x, iconY);
    }
    
    // Draw "LEAD" text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${this.size}px 'Poppins', Arial`;
    ctx.fillText('LEAD', this.x, this.y + this.size * 0.9);
    
    if (this.hasReachedTarget() && this.targetX !== null) {
      // Draw success animation
      ctx.globalAlpha = this.pulseSize;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3 * (1 + this.pulseSize), 0, Math.PI * 2);
      ctx.fillStyle = `${color}33`; // Semi-transparent
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  
  // Helper method to draw different icons
  private drawIcon(ctx: CanvasRenderingContext2D, text: string, color: string, x: number, y: number) {
    // First draw a subtle glow
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.font = `bold ${this.size * 1.4}px 'Poppins', Arial`;
    ctx.fillText(text, x, y);
    
    // Then draw the actual text
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(text, x, y);
  }
}

export default LeadParticle;
