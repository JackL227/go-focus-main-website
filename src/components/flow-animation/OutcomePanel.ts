
export default class OutcomePanel {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: string;
  pulseEffect: number;
  isPulsing: boolean;
  
  constructor(x: number, y: number, label: string, type: string) {
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 60;
    this.label = label;
    this.type = type; // checkmark, calendar, smile
    this.pulseEffect = 0;
    this.isPulsing = false;
  }
  
  pulse() {
    this.isPulsing = true;
    this.pulseEffect = 1;
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
    // Determine color based on type
    let color: string;
    if (this.type === 'checkmark') {
      color = '#00E676'; // Green
    } else if (this.type === 'calendar') {
      color = colors.primary; // Blue
    } else {
      color = '#FFC107'; // Gold/amber
    }
    
    // Calculate pulse effect
    const scaleFactor = 1 + (this.pulseEffect * 0.1);
    const width = this.width * scaleFactor;
    const height = this.height * scaleFactor;
    const x = this.x - width / 2;
    const y = this.y - height / 2;
    
    // Draw glow if pulsing
    if (this.isPulsing) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
    }
    
    // Draw panel background
    ctx.fillStyle = 'rgba(10, 20, 40, 0.7)';
    ctx.strokeStyle = `rgba(${color.slice(1).match(/.{2}/g)!.map(hex => parseInt(hex, 16)).join(', ')}, ${0.7 + this.pulseEffect * 0.3})`;
    ctx.lineWidth = 2;
    
    // Rounded rectangle
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 8);
    ctx.fill();
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Draw icon
    ctx.fillStyle = color;
    const iconSize = 16;
    const iconX = this.x - iconSize / 2;
    const iconY = this.y - 5 - iconSize / 2;
    
    if (this.type === 'checkmark') {
      // Draw checkmark
      ctx.beginPath();
      ctx.moveTo(iconX - iconSize / 3, iconY);
      ctx.lineTo(iconX, iconY + iconSize / 2);
      ctx.lineTo(iconX + iconSize * 2/3, iconY - iconSize / 3);
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.stroke();
    } else if (this.type === 'calendar') {
      // Draw calendar
      ctx.fillRect(iconX - iconSize / 2, iconY - iconSize / 3, iconSize * 2, iconSize * 1.5);
      ctx.fillStyle = 'rgba(10, 20, 40, 0.7)';
      ctx.fillRect(iconX - iconSize / 3, iconY, iconSize * 1.3, iconSize / 2);
    } else {
      // Draw smile
      ctx.beginPath();
      ctx.arc(iconX + iconSize / 3, iconY, iconSize / 1.5, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.stroke();
      
      // Smile curve
      ctx.beginPath();
      ctx.arc(iconX + iconSize / 3, iconY, iconSize / 3, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();
      
      // Eyes
      ctx.beginPath();
      ctx.arc(iconX + iconSize / 5, iconY - iconSize / 5, 2, 0, Math.PI * 2);
      ctx.arc(iconX + iconSize / 2, iconY - iconSize / 5, 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
    
    // Draw label
    ctx.font = '12px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, this.x, this.y + 18);
    
    // Draw connection count (simulated metrics)
    const count = Math.floor(Math.random() * 10) + 30;
    ctx.font = '10px Arial';
    ctx.fillStyle = color;
    ctx.fillText(`${count}`, this.x, this.y + 32);
  }
}
