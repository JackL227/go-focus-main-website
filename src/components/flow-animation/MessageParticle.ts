
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
  color: string;
  trailPoints: {x: number, y: number, opacity: number}[];
  
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
    // Determine if this will be a qualified lead (roughly 30%)
    this.isQualified = Math.random() > 0.7;
    this.targetX = null;
    this.targetY = null;
    this.accelerationFactor = 1.03;
    this.color = this.isQualified ? '#006eda' : '#444444';
    this.trailPoints = [];
    
    // Initialize trail points
    for (let i = 0; i < 5; i++) {
      this.trailPoints.push({
        x: this.x - i * 2,
        y: this.y,
        opacity: 0.5 - i * 0.1
      });
    }
  }
  
  redirectToNode(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
    this.speed = 1 + Math.random() * 1.5;
    // Increase size and opacity for emphasis
    this.size *= 1.2;
    this.opacity = 0.8;
    this.color = this.isQualified ? '#00c4a7' : '#666666'; // Change color when directed to node
  }
  
  update() {
    // Update trail
    this.trailPoints.unshift({
      x: this.x,
      y: this.y,
      opacity: 0.4
    });
    
    if (this.trailPoints.length > 5) {
      this.trailPoints.pop();
    }
    
    if (this.targetX !== null && this.targetY !== null) {
      // Move toward the target (AI node)
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
      // Normal left-to-right movement
      this.x += this.speed;
      
      // Subtle vertical movement - more organic path
      const noiseScale = 0.01; 
      const noiseStrength = 0.3;
      this.y += Math.sin(this.x * noiseScale) * noiseStrength;
    }
    
    // Blink effect for emphasis
    this.blinkTime += this.blinkRate;
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    const blinkOpacity = Math.sin(this.blinkTime) * 0.2 + 0.8;
    
    // Draw trail
    for (let i = 0; i < this.trailPoints.length; i++) {
      const point = this.trailPoints[i];
      const trailSize = this.size * (1 - i * 0.15);
      const trailOpacity = point.opacity * (1 - i * 0.15) * blinkOpacity;
      
      ctx.globalAlpha = trailOpacity * 0.5;
      
      if (this.type === 'circle') {
        ctx.beginPath();
        ctx.arc(point.x, point.y, trailSize * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      } else if (this.type === 'square') {
        ctx.fillStyle = this.color;
        ctx.fillRect(
          point.x - trailSize/2 * 0.8, 
          point.y - trailSize/2 * 0.8, 
          trailSize * 0.8, 
          trailSize * 0.8
        );
      } else if (this.type === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y - trailSize * 0.8);
        ctx.lineTo(point.x + trailSize * 0.8, point.y);
        ctx.lineTo(point.x, point.y + trailSize * 0.8);
        ctx.lineTo(point.x - trailSize * 0.8, point.y);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Draw main particle
    ctx.globalAlpha = this.opacity * blinkOpacity;
    
    // Add glow effect to qualified leads
    if (this.isQualified) {
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 5;
    }
    
    if (this.type === 'circle') {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
      ctx.fill();
      
      // Inner detail for circles
      if (this.size > 4) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = this.isQualified ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
      }
    } else if (this.type === 'square') {
      ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
      ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
      
      // Inner detail for squares
      if (this.size > 4) {
        ctx.fillStyle = this.isQualified ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          this.size * 0.6,
          this.size * 0.6
        );
      }
    } else if (this.type === 'diamond') {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.size);
      ctx.lineTo(this.x + this.size, this.y);
      ctx.lineTo(this.x, this.y + this.size);
      ctx.lineTo(this.x - this.size, this.y);
      ctx.closePath();
      ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
      ctx.fill();
      
      // Inner detail for diamonds
      if (this.size > 4) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size * 0.6);
        ctx.lineTo(this.x + this.size * 0.6, this.y);
        ctx.lineTo(this.x, this.y + this.size * 0.6);
        ctx.lineTo(this.x - this.size * 0.6, this.y);
        ctx.closePath();
        ctx.fillStyle = this.isQualified ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
      }
    }
    
    // Reset shadow and opacity
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

export default MessageParticle;
