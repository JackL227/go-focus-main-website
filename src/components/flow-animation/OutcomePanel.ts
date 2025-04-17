
export default class OutcomePanel {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: string;
  pulseEffect: number;
  isPulsing: boolean;
  hoverEffect: number;
  isHovered: boolean;
  stats: { value: number; trend: string };
  
  constructor(x: number, y: number, label: string, type: string) {
    this.x = x;
    this.y = y;
    this.width = 140; // Increased width
    this.height = 80; // Increased height
    this.label = label;
    this.type = type; // checkmark, calendar, smile
    this.pulseEffect = 0;
    this.isPulsing = false;
    this.hoverEffect = 0;
    this.isHovered = false;
    
    // Generate random stats for interactivity
    this.stats = {
      value: Math.floor(Math.random() * 50) + (this.type === 'checkmark' ? 40 : 
                this.type === 'calendar' ? 25 : 15),
      trend: Math.random() > 0.5 ? '+' : '-'
    };
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
    
    if (this.isHovered) {
      this.hoverEffect += (1 - this.hoverEffect) * 0.1;
    } else {
      this.hoverEffect *= 0.9;
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
    
    // Calculate pulse and hover effects
    const hoverFactor = this.isHovered ? 0.1 : 0;
    const scaleFactor = 1 + (this.pulseEffect * 0.15) + (this.hoverEffect * 0.05);
    const width = this.width * scaleFactor;
    const height = this.height * scaleFactor;
    const x = this.x - width / 2;
    const y = this.y - height / 2;
    
    // Draw glow if pulsing or hovered
    if (this.isPulsing || this.isHovered) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 15 + (this.isHovered ? 10 : 0); // Enhanced glow on hover
    }
    
    // Draw panel background with 3D-like effect and glassmorphism
    const gradientBg = ctx.createLinearGradient(x, y, x, y + height);
    gradientBg.addColorStop(0, 'rgba(15, 25, 45, 0.8)');
    gradientBg.addColorStop(1, 'rgba(10, 20, 40, 0.9)');
    
    ctx.fillStyle = gradientBg;
    ctx.strokeStyle = `rgba(${color.slice(1).match(/.{2}/g)!.map(hex => parseInt(hex, 16)).join(', ')}, ${0.7 + this.pulseEffect * 0.3 + this.hoverEffect * 0.2})`;
    ctx.lineWidth = 2 + (this.isHovered ? 1 : 0);
    
    // Rounded rectangle with 3D effect
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10);
    ctx.fill();
    ctx.stroke();
    
    // Add highlight to give 3D effect
    ctx.beginPath();
    ctx.roundRect(x + 2, y + 2, width - 4, 10, [8, 8, 0, 0]);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw icon with enhanced style
    ctx.fillStyle = color;
    const iconSize = 20 + (this.isHovered ? 4 : 0); // Larger icon on hover
    const iconX = this.x;
    const iconY = this.y - 10;
    
    if (this.type === 'checkmark') {
      // Draw checkmark
      ctx.beginPath();
      ctx.moveTo(iconX - iconSize / 3, iconY);
      ctx.lineTo(iconX, iconY + iconSize / 2);
      ctx.lineTo(iconX + iconSize * 2/3, iconY - iconSize / 3);
      ctx.lineWidth = 3 + (this.isHovered ? 1 : 0);
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (this.type === 'calendar') {
      // Draw calendar
      ctx.fillRect(iconX - iconSize / 2, iconY - iconSize / 3, iconSize, iconSize * 1.2);
      ctx.fillStyle = 'rgba(10, 20, 40, 0.9)';
      ctx.fillRect(iconX - iconSize / 3, iconY, iconSize * 2/3, iconSize / 2);
    } else {
      // Draw smile (dollar sign for Closed Deal)
      ctx.font = `bold ${iconSize}px Arial`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', iconX, iconY);
    }
    
    // Draw label with enhanced styling
    ctx.font = `bold ${14 + (this.isHovered ? 2 : 0)}px 'Poppins', Arial`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, this.x, this.y + 20);
    
    // Draw stats value and trend with animation
    ctx.font = `${12 + (this.isHovered ? 1 : 0)}px 'Inter', Arial`;
    ctx.fillStyle = color;
    
    // More detailed stats on hover
    if (this.isHovered && this.hoverEffect > 0.5) {
      const trendValue = `${this.stats.trend}${Math.floor(Math.random() * 5) + 2}%`;
      ctx.fillText(`${this.stats.value} leads (${trendValue})`, this.x, this.y + 35);
    } else {
      ctx.fillText(`${this.stats.value}`, this.x, this.y + 35);
    }
    
    // Add subtle reflection at bottom
    ctx.beginPath();
    ctx.roundRect(x + width/4, y + height - 5, width/2, 3, 1.5);
    ctx.fillStyle = `rgba(${color.slice(1).match(/.{2}/g)!.map(hex => parseInt(hex, 16)).join(', ')}, 0.3)`;
    ctx.fill();
  }
  
  // Check if a point is inside this panel (for hover detection)
  isPointInside(x: number, y: number): boolean {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    
    return (
      x >= this.x - halfWidth &&
      x <= this.x + halfWidth &&
      y >= this.y - halfHeight &&
      y <= this.y + halfHeight
    );
  }
}
