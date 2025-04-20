
export default class OutcomePanel {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: string;
  iconType: string;
  pulseEffect: number;
  isPulsing: boolean;
  isHovered: boolean;
  
  constructor(x: number, y: number, label: string, iconType: string = "") {
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 80;
    this.label = label;
    this.type = label.toLowerCase().includes('qualified') ? 'checkmark' :
                label.toLowerCase().includes('booked') ? 'calendar' : 
                'smile';
    this.iconType = iconType || this.type;
    this.pulseEffect = 0;
    this.isPulsing = false;
    this.isHovered = false;
  }
  
  pulse() {
    this.isPulsing = true;
    this.pulseEffect = 1;
  }
  
  hover(isHovered: boolean) {
    this.isHovered = isHovered;
  }
  
  update() {
    if (this.isPulsing) {
      this.pulseEffect -= 0.03;
      if (this.pulseEffect <= 0) {
        this.pulseEffect = 0;
        this.isPulsing = false;
      }
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Define color based on type
    let color = this.type === 'checkmark' ? colors.qualified :
               this.type === 'calendar' ? colors.booked :
               colors.closed;
    
    // Draw pulse effect
    if (this.isPulsing) {
      ctx.beginPath();
      ctx.roundRect(
        this.x - this.width/2 - 20 * this.pulseEffect,
        this.y - this.height/2 - 20 * this.pulseEffect,
        this.width + 40 * this.pulseEffect,
        this.height + 40 * this.pulseEffect,
        8
      );
      ctx.fillStyle = `${color}${Math.floor(this.pulseEffect * 25).toString(16)}`;
      ctx.fill();
    }
    
    // Draw panel background with glassmorphism effect
    ctx.save();
    
    // Add glow on hover or pulse
    if (this.isHovered || this.isPulsing) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
    }
    
    // Create gradient for panel
    const panelGradient = ctx.createLinearGradient(
      this.x - this.width/2,
      this.y - this.height/2,
      this.x + this.width/2,
      this.y + this.height/2
    );
    panelGradient.addColorStop(0, 'rgba(30, 40, 60, 0.85)');
    panelGradient.addColorStop(1, 'rgba(20, 30, 50, 0.9)');
    
    // Draw main panel rectangle
    ctx.beginPath();
    ctx.roundRect(
      this.x - this.width/2,
      this.y - this.height/2,
      this.width,
      this.height,
      8
    );
    ctx.fillStyle = panelGradient;
    ctx.fill();
    
    // Draw border
    ctx.strokeStyle = color + (this.isHovered ? 'FF' : '99'); // Full or 60% opacity
    ctx.lineWidth = this.isHovered ? 2 : 1;
    ctx.stroke();
    
    // Draw highlight reflection (top edge)
    ctx.beginPath();
    ctx.roundRect(
      this.x - this.width/2 + 3,
      this.y - this.height/2 + 3,
      this.width - 6,
      this.height/6,
      [4, 4, 0, 0]
    );
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fill();
    
    // Draw icon
    const iconSize = 24;
    const iconY = this.y - 10;
    
    ctx.font = `${iconSize}px 'Arial'`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (this.type === 'checkmark') {
      ctx.fillText('✓', this.x, iconY);
    } else if (this.type === 'calendar') {
      ctx.fillText('📅', this.x, iconY);
    } else {
      ctx.fillText('💰', this.x, iconY);
    }
    
    // Draw label
    ctx.font = `bold 12px 'Poppins', Arial`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.label, this.x, this.y + iconSize/2 + 10);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.restore();
  }
  
  isPointInside(x: number, y: number): boolean {
    return x >= this.x - this.width/2 &&
           x <= this.x + this.width/2 &&
           y >= this.y - this.height/2 &&
           y <= this.y + this.height/2;
  }
}
