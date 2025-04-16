
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
  
  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.size = 5 + Math.random() * 3;
    this.speed = 1.5 + Math.random() * 1;
    // Lead types: calendar, checkmark, smile
    this.type = type || ['calendar', 'checkmark', 'smile'][Math.floor(Math.random() * 3)];
    this.opacity = 0.8 + Math.random() * 0.2;
    this.trail = [];
    this.pulseSize = 0;
    this.pulseDir = 1;
    
    // Add initial trail positions
    for (let i = 0; i < 10; i++) {
      this.trail.push({x: this.x - i * 2, y: this.y});
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
        // Move towards target
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      } else {
        // Very close to target, snap to it
        this.x = this.targetX;
        this.y = this.targetY;
      }
    } else {
      // Default movement if no target
      this.x += this.speed;
    }
    
    // Update trail
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > 10) {
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
    
    // Draw trail
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(this.trail[0].x, this.trail[0].y);
    for (let i = 1; i < this.trail.length; i++) {
      ctx.lineTo(this.trail[i].x, this.trail[i].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Draw lead card
    const cardWidth = this.size * 3;
    const cardHeight = this.size * 2;
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    
    // Draw card with rounded corners
    ctx.fillStyle = 'rgba(10, 20, 40, 0.8)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.roundRect(
      this.x - cardWidth/2, 
      this.y - cardHeight/2, 
      cardWidth, 
      cardHeight, 
      3
    );
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw label
    ctx.font = `${this.size * 0.8}px Arial`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LEAD', this.x, this.y);
    
    // Draw icon based on type
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
}

export default LeadParticle;
