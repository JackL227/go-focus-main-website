
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
  emoji: string;
  rotation: number;
  rotationSpeed: number;
  glowIntensity: number;
  
  constructor(x: number, y: number, canvasHeight: number) {
    this.x = x;
    this.y = canvasHeight * (0.3 + Math.random() * 0.4); // Keep within middle area
    this.size = 5 + Math.random() * 8; // Larger size for more prominence
    this.speed = 0.7 + Math.random() * 2; // Faster speed for more dynamic feel
    
    // Message types: circle (DM), square (chat), diamond (question)
    this.type = ['circle', 'square', 'diamond'][Math.floor(Math.random() * 3)];
    
    // Select a random emoji for the bubble
    const emojis = ['💬', '📩', '🧠', '🤖', '❓', '📱'];
    this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    this.opacity = 0.5 + Math.random() * 0.5; // More opacity for better visibility
    this.blinkRate = 0.01 + Math.random() * 0.03; // Faster blink for more dynamic feel
    this.blinkTime = Math.random() * Math.PI * 2;
    
    // Determine if this will be a qualified lead
    this.isQualified = Math.random() > 0.5; // 50% chance for being qualified
    
    this.targetX = null;
    this.targetY = null;
    this.accelerationFactor = 1.05; // Higher acceleration for snappier movement
    
    // Add rotation for visual interest
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() * 0.02) - 0.01;
    
    // Glow effect intensity
    this.glowIntensity = 0.3 + Math.random() * 0.7;
  }
  
  redirectToNode(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
    this.speed = 1.5 + Math.random() * 2; // Higher speed when targeting node
    
    // Increase size and opacity for emphasis
    this.size *= 1.3;
    this.opacity = 0.9;
    this.glowIntensity = 0.8 + Math.random() * 0.4; // Increase glow as it approaches AI node
  }
  
  update() {
    if (this.targetX !== null && this.targetY !== null) {
      // Move toward the target (AI node)
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
        this.speed *= this.accelerationFactor; // Accelerate toward target
        
        // Increase glow as it gets closer to the node
        this.glowIntensity = Math.min(this.glowIntensity + 0.01, 1.5);
      } else {
        // Very close to target, move directly to it
        this.x = this.targetX;
        this.y = this.targetY;
      }
    } else {
      // Normal left-to-right movement
      this.x += this.speed;
      
      // More organic vertical movement using sin wave
      this.y += Math.sin(this.x * 0.02) * 0.3;
    }
    
    // Update rotation for visual interest
    this.rotation += this.rotationSpeed;
    
    // Blink effect for emphasis
    this.blinkTime += this.blinkRate;
    return this.x;
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Apply rotation
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    const blinkOpacity = Math.sin(this.blinkTime) * 0.2 + 0.8;
    ctx.globalAlpha = this.opacity * blinkOpacity;
    
    // Draw glow effect first
    const color = this.isQualified ? colors.primary : colors.faded;
    ctx.beginPath();
    ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.5);
    glowGradient.addColorStop(0, `${color}${Math.floor(this.glowIntensity * 70).toString(16)}`);
    glowGradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = glowGradient;
    ctx.fill();
    
    // Draw the main shape
    if (this.type === 'circle') {
      // Draw a bubble-like shape
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      
      // Create glass effect with gradient
      const gradient = ctx.createRadialGradient(
        -this.size * 0.3, -this.size * 0.3, 0,
        0, 0, this.size * 1.2
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${this.isQualified ? 0.6 : 0.3})`);
      gradient.addColorStop(0.8, this.isQualified ? colors.primary : colors.faded);
      gradient.addColorStop(1, this.isQualified ? colors.primary : colors.faded);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add a subtle stroke
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Add highlight/shine effect
      ctx.beginPath();
      ctx.arc(-this.size * 0.3, -this.size * 0.3, this.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
    } else if (this.type === 'square') {
      // Draw rounded square for chat messages
      ctx.beginPath();
      ctx.roundRect(-this.size, -this.size, this.size * 2, this.size * 2, this.size * 0.3);
      
      // Create glass effect with gradient
      const gradient = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${this.isQualified ? 0.3 : 0.1})`);
      gradient.addColorStop(1, this.isQualified ? colors.primary : colors.faded);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add a subtle stroke
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    } else if (this.type === 'diamond') {
      // Draw diamond for questions/inquiries
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 1.2);
      ctx.lineTo(this.size, 0);
      ctx.lineTo(0, this.size * 1.2);
      ctx.lineTo(-this.size, 0);
      ctx.closePath();
      
      // Create glass effect with gradient
      const gradient = ctx.createLinearGradient(0, -this.size, 0, this.size);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${this.isQualified ? 0.3 : 0.1})`);
      gradient.addColorStop(1, this.isQualified ? colors.primary : colors.faded);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add a subtle stroke
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    
    // Draw emoji in the center of larger particles
    if (this.size > 8) {
      ctx.font = `${this.size * 1.2}px Arial`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.emoji, 0, 0);
    }
    
    // Reset opacity and restore context
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

export default MessageParticle;
