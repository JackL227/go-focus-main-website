
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
  
  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.size = 4 + Math.random() * 3;
    this.speed = 1 + Math.random() * 1;
    // Lead types: calendar, checkmark, dollar, analytics
    this.type = type || ['calendar', 'checkmark', 'dollar', 'analytics'][Math.floor(Math.random() * 4)];
    this.opacity = 0.8 + Math.random() * 0.2;
    this.trail = [];
    this.pulseSize = 0;
    this.pulseDir = 1;
    
    // Add initial trail positions
    for (let i = 0; i < 10; i++) {
      this.trail.push({x: this.x - i * 2, y: this.y});
    }
  }
  
  update() {
    // Move lead from center to right
    this.x += this.speed;
    // Subtle upward trend for success visualization
    this.y -= 0.05;
    
    // Update trail
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > 10) {
      this.trail.shift();
    }
    
    // Pulse effect for analytics
    if (this.type === 'analytics') {
      this.pulseSize += 0.05 * this.pulseDir;
      if (this.pulseSize > 1 || this.pulseSize < 0) {
        this.pulseDir *= -1;
      }
    }
    
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw trail
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.moveTo(this.trail[0].x, this.trail[0].y);
    for (let i = 1; i < this.trail.length; i++) {
      ctx.lineTo(this.trail[i].x, this.trail[i].y);
    }
    
    const trailColor = this.type === 'analytics' ? colors.analytics : 
                     this.type === 'calendar' ? colors.accent : colors.accent;
    ctx.strokeStyle = trailColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;
    
    // Draw lead particle
    ctx.globalAlpha = this.opacity;
    
    if (this.type === 'calendar') {
      // Calendar icon
      ctx.fillStyle = colors.accent;
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
      
      // Calendar details
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(this.x - this.size/3, this.y - this.size/4, this.size/1.5, this.size/2);
    } else if (this.type === 'checkmark') {
      // Checkmark circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size/1.5, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
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
      ctx.fillStyle = colors.highlight;
      ctx.fill();
      
      // Dollar sign
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `${this.size}px Arial`;
      ctx.fillText('$', this.x - this.size/3, this.y + this.size/3);
    } else if (this.type === 'analytics') {
      // Analytics icon - bar chart
      const extraSize = this.pulseSize * 2;
      
      ctx.fillStyle = colors.analytics;
      
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
    
    ctx.globalAlpha = 1;
  }
}

export default LeadParticle;
