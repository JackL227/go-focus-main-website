
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
  path: { x: number; y: number }[];
  pathIndex: number;
  
  constructor(x: number, y: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.size = 5 + Math.random() * 8;
    this.speed = 0.8 + Math.random() * 1.5;
    // Message types: circle, square, diamond, lead
    this.type = 'lead'; // Default to lead type
    this.opacity = 0.3 + Math.random() * 0.7;
    this.blinkRate = 0.005 + Math.random() * 0.02;
    this.blinkTime = Math.random() * Math.PI * 2;
    // Determine if this will be a qualified lead (roughly 70%)
    this.isQualified = Math.random() > 0.3;
    this.targetX = null;
    this.targetY = null;
    this.accelerationFactor = 1.02;
    
    // Create a curved path for the particle to follow
    this.path = this.generateCurvedPath(canvasHeight);
    this.pathIndex = 0;
  }
  
  generateCurvedPath(canvasHeight: number) {
    const path = [];
    const pathLength = 100;
    const amplitude = canvasHeight * 0.15;
    const centerY = this.y;
    
    // Generate a wavy path from left to right
    for (let i = 0; i < pathLength; i++) {
      const progress = i / pathLength;
      const x = progress * 800 - 50; // Extend path well beyond left edge to right side
      
      // Create a wave pattern with progressively smaller waves
      const waveStrength = 1 - progress * 0.5; // Waves get smaller as we progress
      const y = centerY + Math.sin(progress * Math.PI * 4) * amplitude * waveStrength;
      
      path.push({ x, y });
    }
    
    return path;
  }
  
  redirectToNode(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
    this.speed = 1.5 + Math.random();
    // Increase size and opacity for emphasis
    this.size *= 1.2;
    this.opacity = 0.8;
  }
  
  update() {
    this.blinkTime += this.blinkRate;
    
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
      // Follow the curved path
      if (this.pathIndex < this.path.length - 1) {
        const targetPoint = this.path[this.pathIndex];
        const dx = targetPoint.x - this.x;
        const dy = targetPoint.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.speed * 2) {
          this.pathIndex++;
        } else {
          this.x += (dx / distance) * this.speed;
          this.y += (dy / distance) * this.speed;
        }
      } else {
        // End of path, continue straight
        this.x += this.speed;
      }
    }
    
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    const blinkOpacity = Math.sin(this.blinkTime) * 0.2 + 0.8;
    ctx.globalAlpha = this.opacity * blinkOpacity;
    
    // Draw glow
    const glowSize = this.size * 1.5;
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glowSize
    );
    
    if (this.isQualified) {
      gradient.addColorStop(0, 'rgba(255, 220, 150, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 180, 0, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(200, 200, 200, 0.4)');
      gradient.addColorStop(1, 'rgba(150, 150, 150, 0)');
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    if (this.type === 'lead') {
      // Draw a lead pill shape
      const pillWidth = this.size * 2;
      const pillHeight = this.size * 1.2;
      const cornerRadius = pillHeight / 2;
      
      ctx.fillStyle = this.isQualified ? 'rgba(255, 200, 50, 0.9)' : 'rgba(180, 180, 180, 0.7)';
      
      // Draw rounded rectangle
      ctx.beginPath();
      ctx.moveTo(this.x - pillWidth/2 + cornerRadius, this.y - pillHeight/2);
      ctx.lineTo(this.x + pillWidth/2 - cornerRadius, this.y - pillHeight/2);
      ctx.arc(this.x + pillWidth/2 - cornerRadius, this.y, cornerRadius, -Math.PI/2, Math.PI/2, false);
      ctx.lineTo(this.x - pillWidth/2 + cornerRadius, this.y + pillHeight/2);
      ctx.arc(this.x - pillWidth/2 + cornerRadius, this.y, cornerRadius, Math.PI/2, -Math.PI/2, false);
      ctx.closePath();
      ctx.fill();
      
      // Draw "LEAD" text
      ctx.font = `${Math.min(pillHeight * 0.7, 10)}px Poppins, sans-serif`;
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('LEAD', this.x, this.y);
    } else {
      // Fall back to original shapes
      if (this.type === 'circle') {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
        ctx.fill();
      } else if (this.type === 'square') {
        ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
      } else if (this.type === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.lineTo(this.x - this.size, this.y);
        ctx.closePath();
        ctx.fillStyle = this.isQualified ? colors.secondary : colors.faded;
        ctx.fill();
      }
    }
    
    ctx.globalAlpha = 1;
  }
}

export default MessageParticle;
