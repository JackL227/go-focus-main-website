
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
  
  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.size = 4 + Math.random() * 3;
    this.speed = 1 + Math.random() * 1.5;
    // Lead types: calendar, checkmark, dollar, smile, analytics
    this.type = type || ['calendar', 'checkmark', 'dollar', 'smile', 'analytics'][Math.floor(Math.random() * 5)];
    this.opacity = 0.8 + Math.random() * 0.2;
    this.trail = [];
    this.pulseSize = 0;
    this.pulseDir = 1;
    this.targetX = null;
    this.targetY = null;
    
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
    
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < 5;
  }
  
  update() {
    if (this.targetX !== null && this.targetY !== null) {
      // Move toward target with slight curve
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Add a slight curve to the path
      const angle = Math.atan2(dy, dx);
      const curve = Math.sin(distance * 0.02) * 0.5;
      
      if (distance > 5) {
        this.x += (Math.cos(angle + curve) * this.speed);
        this.y += (Math.sin(angle + curve) * this.speed);
      } else {
        // Very close to target, move directly to it
        this.x = this.targetX;
        this.y = this.targetY;
      }
    } else {
      // Normal left-to-right movement
      this.x += this.speed;
      // Subtle vertical movement
      this.y += Math.sin(this.x * 0.01) * 0.2;
    }
    
    // Pulse effect for highlighting
    this.pulseSize += 0.05 * this.pulseDir;
    if (this.pulseSize > 1 || this.pulseSize < 0) {
      this.pulseDir *= -1;
    }
    
    // Update trail
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > 10) {
      this.trail.shift();
    }
    
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Determine color based on type
    let color;
    switch(this.type) {
      case 'checkmark': color = colors.qualified; break;
      case 'calendar': color = colors.booked; break;
      case 'dollar': case 'smile': color = colors.confirmed; break;
      case 'analytics': default: color = colors.analytics;
    }
    
    // Draw glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 5 + this.pulseSize * 3;
    
    // Draw trail
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.moveTo(this.trail[0].x, this.trail[0].y);
    for (let i = 1; i < this.trail.length; i++) {
      ctx.lineTo(this.trail[i].x, this.trail[i].y);
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Reset shadow for the lead icon
    ctx.shadowBlur = 3;
    
    // Draw lead particle
    ctx.globalAlpha = this.opacity;
    
    if (this.type === 'calendar') {
      // Calendar icon
      ctx.fillStyle = color;
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
      
      // Calendar details
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(this.x - this.size/3, this.y - this.size/4, this.size/1.5, this.size/2);
    } else if (this.type === 'checkmark') {
      // Checkmark circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size/1.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
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
      ctx.fillStyle = color;
      ctx.fill();
      
      // Dollar sign
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${this.size}px Arial`;
      ctx.fillText('$', this.x - this.size/3, this.y + this.size/3);
    } else if (this.type === 'smile') {
      // Smile circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size/1.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Smile
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size/3, 0, Math.PI);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Eyes
      ctx.beginPath();
      ctx.arc(this.x - this.size/4, this.y - this.size/6, 1, 0, Math.PI * 2);
      ctx.arc(this.x + this.size/4, this.y - this.size/6, 1, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    } else if (this.type === 'analytics') {
      // Analytics icon - bar chart
      const extraSize = this.pulseSize * 2;
      
      ctx.fillStyle = color;
      
      // Bar chart icon
      const barWidth = this.size/3;
      const barSpacing = this.size/6;
      const barBase = this.y + this.size/2;
      
      // First bar
      const bar1Height = this.size * 0.5 + extraSize;
      ctx.fillRect(
        this.x - barWidth*1.5 - barSpacing, 
        barBase - bar1Height, 
        barWidth, 
        bar1Height
      );
      
      // Second bar
      const bar2Height = this.size * 0.8 + extraSize;
      ctx.fillRect(
        this.x - barWidth/2, 
        barBase - bar2Height, 
        barWidth, 
        bar2Height
      );
      
      // Third bar
      const bar3Height = this.size * 0.6 + extraSize;
      ctx.fillRect(
        this.x + barWidth/2 + barSpacing, 
        barBase - bar3Height, 
        barWidth, 
        bar3Height
      );
    }
    
    // Reset shadow and opacity
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

export default LeadParticle;
