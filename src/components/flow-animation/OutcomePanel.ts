
class OutcomePanel {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  opacity: number;
  pulseValue: number;
  pulseDir: number;
  glowSize: number;
  receiveFlash: number;
  floatOffset: number;
  floatSpeed: number;
  
  constructor(x: number, y: number, width: number, height: number, label: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.opacity = 0; // Start invisible and fade in
    this.pulseValue = 0;
    this.pulseDir = 1;
    this.glowSize = 0;
    this.receiveFlash = 0;
    // For floating animation
    this.floatOffset = Math.random() * Math.PI * 2;
    this.floatSpeed = 0.5 + Math.random() * 0.5;
  }
  
  update() {
    // Fade in
    if (this.opacity < 1) {
      this.opacity += 0.01;
    }
    
    // Pulse effect
    this.pulseValue += 0.03 * this.pulseDir;
    if (this.pulseValue > 1 || this.pulseValue < 0) {
      this.pulseDir *= -1;
    }
    
    // Flash effect when receiving lead
    if (this.receiveFlash > 0) {
      this.receiveFlash -= 0.05;
    }
    
    // Update floating animation
    this.floatOffset += 0.01;
  }
  
  receiveLead() {
    this.receiveFlash = 1; // Start flash effect
    this.glowSize = 20; // Temporarily increase glow
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    const pulseScale = 1 + this.pulseValue * 0.05;
    const flashIntensity = this.receiveFlash * 0.4;
    
    // Calculate floating position
    const floatY = this.y + Math.sin(this.floatOffset * this.floatSpeed) * 3;
    
    // Draw glow effect
    if (this.glowSize > 0 || this.receiveFlash > 0) {
      const glowSize = this.glowSize * this.receiveFlash + 5;
      const gradient = ctx.createRadialGradient(
        this.x, floatY, 0,
        this.x, floatY, this.width * 0.8
      );
      
      gradient.addColorStop(0, `rgba(255, 200, 50, ${0.4 * this.opacity * (this.receiveFlash + 0.2)})`);
      gradient.addColorStop(1, `rgba(255, 150, 0, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(this.x, floatY, this.width * pulseScale, this.height * pulseScale, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Gradually reduce glow size
      this.glowSize *= 0.9;
    }
    
    // Draw panel background (with glass effect)
    ctx.globalAlpha = this.opacity;
    
    // Create gradient for panel background
    const gradient = ctx.createLinearGradient(
      this.x - this.width/2, floatY - this.height/2,
      this.x + this.width/2, floatY + this.height/2
    );
    
    // Custom colors based on panel type
    let startColor, endColor;
    if (this.label === "Qualified") {
      startColor = `rgba(40, 40, 40, ${0.8 + flashIntensity})`;
      endColor = `rgba(60, 60, 60, ${0.8 + flashIntensity})`;
    } else if (this.label === "Booked Call") {
      startColor = `rgba(45, 45, 45, ${0.8 + flashIntensity})`;
      endColor = `rgba(65, 65, 65, ${0.8 + flashIntensity})`;
    } else {
      startColor = `rgba(50, 50, 50, ${0.8 + flashIntensity})`;
      endColor = `rgba(70, 70, 70, ${0.8 + flashIntensity})`;
    }
    
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    
    // Draw rounded rectangle for panel
    ctx.fillStyle = gradient;
    const radius = 10; // border radius
    
    const x = this.x - this.width/2 * pulseScale;
    const y = floatY - this.height/2 * pulseScale;
    const w = this.width * pulseScale;
    const h = this.height * pulseScale;
    
    // Draw rounded rectangle
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    
    // Draw subtle border
    ctx.strokeStyle = `rgba(255, 180, 50, ${(0.3 + this.pulseValue * 0.2) * this.opacity + flashIntensity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Draw label
    ctx.fillStyle = `rgba(255, 220, 150, ${0.9 * this.opacity + flashIntensity})`;
    ctx.font = `${Math.min(this.height * 0.35, 16)}px Poppins, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, this.x, floatY);
    
    // Draw icon or indicator based on panel type
    this.drawPanelIcon(ctx, colors, flashIntensity);
    
    ctx.globalAlpha = 1;
  }
  
  drawPanelIcon(ctx: CanvasRenderingContext2D, colors: Record<string, string>, flashIntensity: number) {
    const iconY = this.y + Math.sin(this.floatOffset * this.floatSpeed) * 3;
    const iconSize = Math.min(this.width * 0.1, 10);
    
    if (this.label === "Qualified") {
      // Checkmark
      ctx.strokeStyle = `rgba(255, 220, 100, ${0.8 * this.opacity + flashIntensity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.x - iconSize * 1.5, iconY - this.height * 0.2);
      ctx.lineTo(this.x - iconSize * 0.5, iconY - this.height * 0.1);
      ctx.lineTo(this.x + iconSize, iconY - this.height * 0.3);
      ctx.stroke();
    } else if (this.label === "Booked Call") {
      // Calendar icon
      ctx.fillStyle = `rgba(255, 220, 100, ${0.8 * this.opacity + flashIntensity})`;
      ctx.fillRect(
        this.x - iconSize * 1.5, 
        iconY - this.height * 0.25 - iconSize, 
        iconSize * 3, 
        iconSize * 2
      );
    } else {
      // Dollar/growth icon
      ctx.strokeStyle = `rgba(255, 220, 100, ${0.8 * this.opacity + flashIntensity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.x - iconSize, iconY - this.height * 0.2);
      ctx.lineTo(this.x, iconY - this.height * 0.3);
      ctx.lineTo(this.x + iconSize, iconY - this.height * 0.1);
      ctx.stroke();
    }
  }
}

export default OutcomePanel;
