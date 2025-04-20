
class MessageParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  type: string;
  opacity: number;
  blinkRate: number;
  blinkTime: number;
  isQualified: boolean;
  targetX: number | null;
  targetY: number | null;
  accelerationFactor: number;
  trailPositions: {x: number, y: number}[];
  label: string;
  
  constructor(x: number, y: number, canvasHeight: number) {
    this.x = x;
    this.y = canvasHeight * (0.3 + Math.random() * 0.4); // Keep within middle area
    this.size = 3 + Math.random() * 5;
    this.speed = 0.5 + Math.random() * 1.5;
    // Message types: circle (DM), square (chat), diamond (question)
    this.type = ['circle', 'square', 'diamond'][Math.floor(Math.random() * 3)];
    this.opacity = 0.3 + Math.random() * 0.5;
    this.blinkRate = 0.005 + Math.random() * 0.02;
    this.blinkTime = Math.random() * Math.PI * 2;
    // Determine if this will be a qualified lead (roughly 70%)
    this.isQualified = Math.random() > 0.3;
    this.targetX = null;
    this.targetY = null;
    this.accelerationFactor = 1.03;
    this.trailPositions = [];
    
    // Possible lead labels
    const labels = [
      'DM Lead', 'Chat Lead', 'Form Lead', 
      'Cold Lead', 'IG Lead', 'FB Lead',
      'Email Lead', 'Website Lead'
    ];
    this.label = labels[Math.floor(Math.random() * labels.length)];
    
    // Initialize trail positions
    for (let i = 0; i < 5; i++) {
      this.trailPositions.push({x: this.x - i * 2, y: this.y});
    }
  }
  
  redirectToNode(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
    this.speed = 1 + Math.random() * 1.5;
    // Increase size and opacity for emphasis
    this.size *= 1.2;
    this.opacity = 0.8;
  }
  
  update() {
    // Update trail positions
    this.trailPositions.unshift({x: this.x, y: this.y});
    if (this.trailPositions.length > 5) {
      this.trailPositions.pop();
    }
    
    if (this.targetX !== null && this.targetY !== null) {
      // Move toward the target (AI node) with acceleration
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
        this.speed *= this.accelerationFactor; // Accelerate toward target
      } else {
        // Very close to target, move directly to it
        this.x = this.targetX;
        this.y = this.targetY;
      }
    } else {
      // Normal left-to-right movement with curved path
      this.x += this.speed;
      // Enhanced curved movement
      this.y += Math.sin(this.x * 0.02) * 0.3;
    }
    
    // Blink effect for emphasis
    this.blinkTime += this.blinkRate;
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    const blinkOpacity = Math.sin(this.blinkTime) * 0.2 + 0.8;
    const color = this.isQualified ? colors.qualified : colors.faded;
    
    // Draw light trail effect for motion emphasis
    ctx.globalAlpha = this.opacity * 0.3;
    for (let i = 1; i < this.trailPositions.length; i++) {
      const fadeOpacity = (this.trailPositions.length - i) / this.trailPositions.length;
      ctx.globalAlpha = this.opacity * fadeOpacity * 0.3;
      
      this.drawShape(
        ctx,
        color,
        this.trailPositions[i].x,
        this.trailPositions[i].y,
        this.size * 0.7
      );
    }
    
    // Draw main shape (lead card)
    ctx.globalAlpha = this.opacity * blinkOpacity;
    
    // Draw a lead card instead of simple shapes
    this.drawLeadCard(ctx, color);
    
    // Add glow effect for qualified leads
    if (this.isQualified) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 5;
      this.drawLeadCard(ctx, color);
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    }
    
    ctx.globalAlpha = 1;
  }
  
  private drawLeadCard(ctx: CanvasRenderingContext2D, color: string) {
    const cardWidth = this.size * 4;
    const cardHeight = this.size * 2.5;
    
    // Draw card background
    ctx.beginPath();
    ctx.roundRect(
      this.x - cardWidth/2, 
      this.y - cardHeight/2, 
      cardWidth, 
      cardHeight, 
      3
    );
    
    // Create gradient for card
    const cardGradient = ctx.createLinearGradient(
      this.x - cardWidth/2, this.y - cardHeight/2,
      this.x + cardWidth/2, this.y + cardHeight/2
    );
    cardGradient.addColorStop(0, 'rgba(30, 40, 60, 0.85)');
    cardGradient.addColorStop(1, 'rgba(20, 30, 50, 0.9)');
    
    ctx.fillStyle = cardGradient;
    ctx.fill();
    
    // Add border
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw small icon based on type
    const iconSize = this.size * 0.8;
    const iconX = this.x - cardWidth/2 + iconSize + 2;
    const iconY = this.y - cardHeight/4;
    
    // Draw icon background
    ctx.beginPath();
    ctx.arc(iconX, iconY, iconSize, 0, Math.PI * 2);
    ctx.fillStyle = color + '33'; // 20% opacity
    ctx.fill();
    
    // Draw icon
    ctx.font = `${iconSize * 1.2}px 'Poppins', Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (this.type === 'circle') {
      ctx.fillText('📱', iconX, iconY);
    } else if (this.type === 'square') {
      ctx.fillText('📧', iconX, iconY);
    } else {
      ctx.fillText('🌐', iconX, iconY);
    }
    
    // Draw label
    ctx.font = `${this.size * 0.7}px 'Poppins', Arial`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(this.label, this.x + this.size * 0.5, this.y + cardHeight/4);
  }
  
  private drawShape(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, size: number) {
    if (this.type === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else if (this.type === 'square') {
      ctx.fillStyle = color;
      ctx.fillRect(x - size/2, y - size/2, size, size);
    } else if (this.type === 'diamond') {
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

export default MessageParticle;
