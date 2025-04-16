
class OutcomePanel {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  type: string;
  pulseSize: number;
  pulseDirection: number;
  counter: number;
  glowIntensity: number;
  glowDirection: number;
  floatOffset: number;
  floatSpeed: number;
  
  constructor(x: number, y: number, title: string, type: string) {
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 70;
    this.title = title;
    this.type = type;
    this.pulseSize = 0;
    this.pulseDirection = 1;
    this.counter = 0;
    this.glowIntensity = 0.5;
    this.glowDirection = 1;
    this.floatOffset = 0;
    this.floatSpeed = 0.01 + Math.random() * 0.01;
  }
  
  update() {
    // Subtle floating animation
    this.floatOffset += this.floatSpeed;
    
    // Pulsing glow effect
    this.glowIntensity += 0.01 * this.glowDirection;
    if (this.glowIntensity > 0.8 || this.glowIntensity < 0.2) {
      this.glowDirection *= -1;
    }
    
    // Pulse animation when receiving a lead
    if (this.pulseSize > 0) {
      this.pulseSize += 0.1 * this.pulseDirection;
      if (this.pulseSize > 1) {
        this.pulseDirection = -1;
      } else if (this.pulseSize < 0) {
        this.pulseSize = 0;
        this.pulseDirection = 1;
      }
    }
  }
  
  pulse() {
    this.pulseSize = 0.1;
    this.pulseDirection = 1;
  }
  
  incrementCounter() {
    this.counter++;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    const floatY = Math.sin(this.floatOffset) * 3;
    const drawY = this.y + floatY;
    
    // Determine color based on type
    let color;
    let iconType;
    switch(this.type) {
      case 'qualified':
        color = colors.qualified;
        iconType = 'checkmark';
        break;
      case 'booked':
        color = colors.booked;
        iconType = 'calendar';
        break;
      case 'confirmed':
        color = colors.confirmed;
        iconType = 'smile';
        break;
      default:
        color = colors.primary;
        iconType = 'analytics';
    }
    
    // Pulse effect
    if (this.pulseSize > 0) {
      ctx.beginPath();
      ctx.roundRect(
        this.x - this.width/2 - 10 * this.pulseSize, 
        drawY - this.height/2 - 10 * this.pulseSize, 
        this.width + 20 * this.pulseSize, 
        this.height + 20 * this.pulseSize,
        8
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 * (1 - this.pulseSize)})`;
      ctx.fill();
    }
    
    // Glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 10 * this.glowIntensity;
    
    // Panel background with rounded corners
    ctx.beginPath();
    ctx.roundRect(
      this.x - this.width/2, 
      drawY - this.height/2, 
      this.width, 
      this.height,
      8
    );
    ctx.fillStyle = 'rgba(30, 30, 40, 0.8)';
    ctx.fill();
    
    // Border
    ctx.beginPath();
    ctx.roundRect(
      this.x - this.width/2, 
      drawY - this.height/2, 
      this.width, 
      this.height,
      8
    );
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + this.glowIntensity * 0.3})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Title text
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.title, this.x, drawY - 15);
    
    // Icon based on type
    this.drawIcon(ctx, iconType, this.x, drawY, color);
    
    // Counter
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.counter.toString(), this.x, drawY + 25);
  }
  
  drawIcon(ctx: CanvasRenderingContext2D, type: string, x: number, y: number, color: string) {
    const size = 16;
    
    ctx.fillStyle = color;
    
    switch(type) {
      case 'checkmark':
        // Checkmark in a circle
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Checkmark
        ctx.beginPath();
        ctx.moveTo(x - size/3, y);
        ctx.lineTo(x - size/6, y + size/4);
        ctx.lineTo(x + size/3, y - size/3);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        break;
        
      case 'calendar':
        // Calendar icon
        ctx.fillStyle = color;
        ctx.fillRect(x - size/2, y - size/2, size, size);
        
        // Calendar details
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x - size/3, y - size/4, size/1.5, size/2);
        break;
        
      case 'smile':
        // Smile circle
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Smile
        ctx.beginPath();
        ctx.arc(x, y, size/3, 0, Math.PI);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Eyes
        ctx.beginPath();
        ctx.arc(x - size/4, y - size/6, 1, 0, Math.PI * 2);
        ctx.arc(x + size/4, y - size/6, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        break;
        
      case 'analytics':
      default:
        // Analytics icon - bar chart
        const barWidth = size/5;
        const barSpacing = size/10;
        const barMaxHeight = size/2;
        
        // First bar
        ctx.fillStyle = color;
        ctx.fillRect(
          x - barWidth*2 - barSpacing, 
          y + barMaxHeight/2 - barMaxHeight * 0.6, 
          barWidth, 
          barMaxHeight * 0.6
        );
        
        // Second bar
        ctx.fillRect(
          x - barWidth/2, 
          y + barMaxHeight/2 - barMaxHeight * 0.9, 
          barWidth, 
          barMaxHeight * 0.9
        );
        
        // Third bar
        ctx.fillRect(
          x + barWidth + barSpacing, 
          y + barMaxHeight/2 - barMaxHeight * 0.7, 
          barWidth, 
          barMaxHeight * 0.7
        );
        break;
    }
  }
}

export default OutcomePanel;
