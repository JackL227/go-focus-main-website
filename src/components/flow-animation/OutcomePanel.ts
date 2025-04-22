
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
    this.width = 140; // Slightly larger panels
    this.height = 90; // Slightly taller panels
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
    
    // Draw pulse effect with more subtle glow
    if (this.isPulsing) {
      ctx.beginPath();
      ctx.roundRect(
        this.x - this.width/2 - 20 * this.pulseEffect,
        this.y - this.height/2 - 20 * this.pulseEffect,
        this.width + 40 * this.pulseEffect,
        this.height + 40 * this.pulseEffect,
        12 // More rounded corners
      );
      ctx.fillStyle = `${color}${Math.floor(this.pulseEffect * 15).toString(16)}`; // More subtle
      ctx.fill();
    }
    
    // Draw panel background with improved glassmorphism effect
    ctx.save();
    
    // Add glow on hover or pulse - enhanced for more premium look
    if (this.isHovered || this.isPulsing) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 20; // Increased glow effect
      ctx.shadowOffsetY = 2; // Slight shadow offset for depth
    } else {
      // Subtle shadow even when not hovered for 3D effect
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;
    }
    
    // Enhanced gradient for panel - more depth and glass feeling
    const panelGradient = ctx.createLinearGradient(
      this.x - this.width/2,
      this.y - this.height/2,
      this.x + this.width/2,
      this.y + this.height/2
    );
    // More translucent gradient for glassmorphism
    panelGradient.addColorStop(0, 'rgba(25, 35, 60, 0.75)');
    panelGradient.addColorStop(1, 'rgba(15, 25, 45, 0.85)');
    
    // Draw main panel rectangle with more rounded corners
    ctx.beginPath();
    ctx.roundRect(
      this.x - this.width/2,
      this.y - this.height/2,
      this.width,
      this.height,
      12 // More rounded corners
    );
    ctx.fillStyle = panelGradient;
    ctx.fill();
    
    // Draw a more subtle border
    ctx.strokeStyle = color + (this.isHovered ? 'CC' : '66'); // Full or 40% opacity
    ctx.lineWidth = this.isHovered ? 1.5 : 0.8;
    ctx.stroke();
    
    // Draw top highlight reflection - enhanced for glass effect
    ctx.beginPath();
    ctx.roundRect(
      this.x - this.width/2 + 3,
      this.y - this.height/2 + 3,
      this.width - 6,
      this.height/7,
      [10, 10, 0, 0] // Rounded only on top corners
    );
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'; // Slightly more visible highlight
    ctx.fill();
    
    // Draw icon with more refined style
    const iconSize = 24;
    const iconY = this.y - 10;
    
    // Set up for icon drawing - cleaner look
    ctx.font = `${iconSize}px 'Poppins', Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw the icon with glow effect
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 8; // Subtle glow on icon
    
    if (this.type === 'checkmark') {
      // Clean checkmark symbol
      ctx.fillText('✓', this.x, iconY);
    } else if (this.type === 'calendar') {
      // Clean calendar icon
      ctx.fillText('📅', this.x, iconY);
    } else {
      // Money/deal icon
      ctx.fillText('💰', this.x, iconY);
    }
    ctx.restore();
    
    // Draw label with improved typography
    ctx.font = `600 13px 'Poppins', Arial`; // Bolder, slightly larger font
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; // Text shadow for legibility
    ctx.shadowBlur = 3;
    ctx.fillText(this.label, this.x, this.y + iconSize/2 + 12);
    
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
