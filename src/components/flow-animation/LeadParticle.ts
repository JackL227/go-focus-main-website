
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
  glowIntensity: number;
  rotation: number;
  rotationSpeed: number;
  
  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.size = 12 + Math.random() * 8; // Larger size for bigger cards
    this.speed = 2 + Math.random() * 1.5; // Faster speed for more dynamic animation
    // Lead types: calendar, checkmark, smile
    this.type = type || ['calendar', 'checkmark', 'smile'][Math.floor(Math.random() * 3)];
    this.opacity = 0.9;
    this.trail = [];
    this.pulseSize = 0;
    this.pulseDir = 1;
    this.glowIntensity = 0.8 + Math.random() * 0.4;
    
    // Add rotation for visual interest
    this.rotation = (Math.random() * 0.3) - 0.15; // Slight rotation
    this.rotationSpeed = (Math.random() * 0.005) - 0.0025; // Very slow rotation
    
    // Add initial trail positions with more points for a smoother trail
    for (let i = 0; i < 20; i++) { // Extended trail
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
    
    // Update rotation
    this.rotation += this.rotationSpeed;
    
    // Update trail
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > 20) { // Keep longer trail
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
    
    // Draw trail with increased intensity and gradient
    ctx.save();
    
    const trailLength = this.trail.length;
    if (trailLength > 1) {
      for (let i = 0; i < trailLength - 1; i++) {
        const opacity = 0.7 * (i / trailLength);
        const width = 3 * (i / trailLength) + 1;
        
        ctx.beginPath();
        ctx.moveTo(this.trail[i].x, this.trail[i].y);
        ctx.lineTo(this.trail[i+1].x, this.trail[i+1].y);
        ctx.strokeStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = width;
        ctx.stroke();
      }
    }
    
    // Apply rotation to the card
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw lead card with increased size and premium styling
    const cardWidth = this.size * 4;  // Bigger cards
    const cardHeight = this.size * 2.5; // Bigger cards
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 15; // Enhanced glow
    
    // Draw card with rounded corners and glass morphism
    const gradient = ctx.createLinearGradient(-cardWidth/2, -cardHeight/2, cardWidth/2, cardHeight/2);
    gradient.addColorStop(0, 'rgba(20, 30, 50, 0.9)');
    gradient.addColorStop(1, 'rgba(10, 20, 40, 0.8)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(-cardWidth/2, -cardHeight/2, cardWidth, cardHeight, 8);
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = `${color}${Math.floor(this.glowIntensity * 255).toString(16).padStart(2, '0')}`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add glass highlight at the top
    ctx.beginPath();
    ctx.roundRect(-cardWidth/2 + 5, -cardHeight/2 + 5, cardWidth - 10, cardHeight/4, 4);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw LEAD label
    ctx.font = `bold ${this.size * 1.2}px Arial`; // Larger, bolder font
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LEAD', 0, 0);
    
    // Draw icon based on type if reached target
    if (this.hasReachedTarget() && this.targetX !== null) {
      // Draw success animation
      ctx.globalAlpha = this.pulseSize;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 3 * (1 + this.pulseSize), 0, Math.PI * 2);
      ctx.fillStyle = `${color}33`; // Semi-transparent
      ctx.fill();
      
      // Add ripple effects
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 4 * (0.7 + this.pulseSize * 0.3), 0, Math.PI * 2);
      ctx.strokeStyle = `${color}22`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.globalAlpha = 1;
    }
    
    ctx.restore();
  }
}

export default LeadParticle;
