
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
    this.size = 10 + Math.random() * 5; // Sized for visibility
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
    if (this.trail.length > 15) { // Keep trail length consistent
      this.trail.shift();
    }
    
    // Pulse effect animation
    this.pulseSize += 0.05 * this.pulseDir;
    if (this.pulseSize > 1 || this.pulseSize < 0) {
      this.pulseDir *= -1;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Determine color based on type - enhanced colors for modern look
    let color: string;
    if (this.type === 'checkmark') {
      color = '#00E676'; // Bright green
    } else if (this.type === 'calendar') {
      color = '#1EAEDB'; // Bright blue
    } else {
      color = '#FFC107'; // Gold/amber
    }
    
    // Draw improved trail with increased smoothness
    ctx.globalAlpha = 0.6; // Increased opacity for visibility
    
    // Create enhanced gradient for trail
    const trailGradient = ctx.createLinearGradient(
      this.trail[0].x, this.trail[0].y,
      this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y
    );
    trailGradient.addColorStop(0, `${color}22`); // 13% opacity
    trailGradient.addColorStop(0.5, `${color}55`); // 33% opacity
    trailGradient.addColorStop(1, `${color}88`); // 53% opacity - more subtle
    
    // Draw curved trail with enhanced smoothness
    ctx.beginPath();
    ctx.moveTo(this.trail[0].x, this.trail[0].y);
    
    // Improved curved trail for smoother animation using bezier curves
    for (let i = 1; i < this.trail.length - 2; i++) {
      const xc = (this.trail[i].x + this.trail[i + 1].x) / 2;
      const yc = (this.trail[i].y + this.trail[i + 1].y) / 2;
      ctx.quadraticCurveTo(this.trail[i].x, this.trail[i].y, xc, yc);
    }
    
    // Handle the last two points for a complete curve
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
    
    // More refined trail appearance
    ctx.strokeStyle = trailGradient;
    ctx.lineWidth = 2.5; // Thicker trail for visibility
    ctx.lineCap = 'round'; // Rounded caps for smoother look
    ctx.lineJoin = 'round'; // Rounded joins for smoother look
    ctx.stroke();
    
    // Add glow effect for trails - modern subtle glow
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.globalAlpha = 1;
    
    // Draw lead card with improved glassmorphism
    const cardWidth = this.size * 4;
    const cardHeight = this.size * 2.5;
    
    // Add glow effect - more subtle and refined
    ctx.shadowColor = color;
    ctx.shadowBlur = 12; // Refined glow
    ctx.shadowOffsetY = 2; // Slight offset for depth
    
    // Draw card with improved rounded corners and glassmorphism
    const cardGradient = ctx.createLinearGradient(
      this.x - cardWidth/2, 
      this.y - cardHeight/2, 
      this.x + cardWidth/2, 
      this.y + cardHeight/2
    );
    // More transparent gradient for glass effect
    cardGradient.addColorStop(0, 'rgba(25, 35, 55, 0.85)');
    cardGradient.addColorStop(1, 'rgba(15, 25, 45, 0.9)');
    
    ctx.fillStyle = cardGradient;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    
    // Draw card body with more rounded corners
    ctx.beginPath();
    ctx.roundRect(
      this.x - cardWidth/2, 
      this.y - cardHeight/2, 
      cardWidth, 
      cardHeight, 
      8 // More rounded corners
    );
    ctx.fill();
    ctx.stroke();
    
    // Add highlight to give enhanced 3D effect - more subtle
    ctx.beginPath();
    ctx.roundRect(
      this.x - cardWidth/2 + 2, 
      this.y - cardHeight/2 + 2, 
      cardWidth - 4, 
      cardHeight/5, 
      [6, 6, 0, 0] // Rounded only on top
    );
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'; // More subtle highlight
    ctx.fill();
    
    // Reset shadow for text elements
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw icon based on type - more minimal and modern
    const iconY = this.y - this.size * 0.2;
    
    // Enhanced icon drawing with subtle glow
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.font = `bold ${this.size * 1.4}px 'Poppins', Arial`; // Larger, bolder font
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw icon - simplified and cleaner
    if (this.type === 'checkmark') {
      ctx.fillText('✓', this.x, iconY); // Simple checkmark
    } else if (this.type === 'calendar') {
      ctx.fillText('📅', this.x, iconY); // Calendar icon
    } else {
      ctx.fillText('$', this.x, iconY); // Dollar sign instead of smile
    }
    ctx.restore();
    
    // Draw "LEAD" text with improved typography
    ctx.font = `600 ${this.size}px 'Poppins', Arial`; // Bolder font
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LEAD', this.x, this.y + this.size * 0.9);
    
    // Add success animation when reaching target - enhanced effect
    if (this.hasReachedTarget() && this.targetX !== null) {
      ctx.globalAlpha = this.pulseSize * 0.7;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2.8 * (1 + this.pulseSize * 0.5), 0, Math.PI * 2);
      const pulseGradient = ctx.createRadialGradient(
        this.x, this.y, 0, 
        this.x, this.y, this.size * 2.8 * (1 + this.pulseSize * 0.5)
      );
      pulseGradient.addColorStop(0, `${color}44`);
      pulseGradient.addColorStop(1, `${color}00`);
      ctx.fillStyle = pulseGradient;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}

export default LeadParticle;
