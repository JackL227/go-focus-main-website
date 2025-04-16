
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
  targetX: number | null;
  targetY: number | null;
  text: string;
  
  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.size = 4 + Math.random() * 3;
    this.speed = 1 + Math.random() * 1;
    // Lead types: calendar, checkmark, dollar
    this.type = type || ['calendar', 'checkmark', 'dollar'][Math.floor(Math.random() * 3)];
    this.opacity = 0.8 + Math.random() * 0.2;
    this.trail = [];
    this.pulseSize = 0;
    this.pulseDir = 1;
    this.targetX = null;
    this.targetY = null;
    this.text = ""; // For displaying text on particle
    
    // Add initial trail positions
    for (let i = 0; i < 10; i++) {
      this.trail.push({x: this.x - i * 2, y: this.y});
    }
  }
  
  setTarget(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }
  
  hasReachedTarget() {
    if (this.targetX === null || this.targetY === null) return false;
    
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    return Math.sqrt(dx * dx + dy * dy) < 5;
  }
  
  update() {
    if (this.targetX !== null && this.targetY !== null) {
      // Move toward the target
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      } else {
        // Very close to target, move directly to it
        this.x = this.targetX;
        this.y = this.targetY;
      }
    } else {
      // Default movement (to the right)
      this.x += this.speed;
      // Subtle upward trend for success visualization
      this.y -= 0.05;
    }
    
    // Update trail
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > 10) {
      this.trail.shift();
    }
    
    // Pulse effect
    this.pulseSize += 0.05 * this.pulseDir;
    if (this.pulseSize > 1 || this.pulseSize < 0) {
      this.pulseDir *= -1;
    }
    
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw trail with gradient
    ctx.globalAlpha = 0.2;
    
    if (this.trail.length > 1) {
      const gradient = ctx.createLinearGradient(
        this.trail[0].x, this.trail[0].y, 
        this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y
      );
      
      gradient.addColorStop(0, 'rgba(255, 200, 50, 0)');
      gradient.addColorStop(1, 'rgba(255, 150, 50, 0.7)');
      
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    ctx.globalAlpha = this.opacity;
    
    // Draw glow effect
    const glowSize = 5 + this.pulseSize * 3;
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glowSize
    );
    
    gradient.addColorStop(0, 'rgba(255, 200, 50, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 150, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw lead particle based on type
    if (this.type === 'calendar') {
      // Calendar icon
      ctx.fillStyle = 'rgba(255, 220, 150, 0.9)';
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
      
      // Calendar details
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(this.x - this.size/3, this.y - this.size/4, this.size/1.5, this.size/2);
    } else if (this.type === 'checkmark') {
      // Checkmark circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size/1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 220, 150, 0.9)';
      ctx.fill();
      
      // Checkmark
      ctx.beginPath();
      ctx.moveTo(this.x - this.size/3, this.y);
      ctx.lineTo(this.x - this.size/10, this.y + this.size/4);
      ctx.lineTo(this.x + this.size/3, this.y - this.size/4);
      ctx.lineWidth = this.size/5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
    } else if (this.type === 'dollar') {
      // Dollar circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size/1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 220, 150, 0.9)';
      ctx.fill();
      
      // Dollar sign
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${this.size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', this.x, this.y);
    }
    
    // If we have text, draw it
    if (this.text) {
      ctx.font = `${this.size * 1.2}px Poppins, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.text, this.x, this.y - this.size * 2);
    }
    
    ctx.globalAlpha = 1;
  }
}

export default LeadParticle;
