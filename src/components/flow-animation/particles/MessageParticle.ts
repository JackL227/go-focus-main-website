
import { BaseParticle } from './BaseParticle';
import { 
  createGlowEffect, 
  drawBubbleShape, 
  drawSquareShape, 
  drawDiamondShape, 
  drawEmoji 
} from '../utils/particleEffects';

class MessageParticle extends BaseParticle {
  type: string;
  blinkRate: number;
  blinkTime: number;
  isQualified: boolean;
  targetX: number | null;
  targetY: number | null;
  accelerationFactor: number;
  emoji: string;
  
  constructor(x: number, y: number, canvasHeight: number) {
    // Initialize the base particle properties
    const size = 5 + Math.random() * 8;
    super(x, y, size);
    
    // Set the vertical position to be within the middle area
    this.y = canvasHeight * (0.3 + Math.random() * 0.4);
    
    // Message types: circle (DM), square (chat), diamond (question)
    this.type = ['circle', 'square', 'diamond'][Math.floor(Math.random() * 3)];
    
    // Select a random emoji for the bubble
    const emojis = ['💬', '📩', '🧠', '🤖', '❓', '📱'];
    this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    this.blinkRate = 0.01 + Math.random() * 0.03;
    this.blinkTime = Math.random() * Math.PI * 2;
    
    // Determine if this will be a qualified lead
    this.isQualified = Math.random() > 0.5; // 50% chance for being qualified
    
    this.targetX = null;
    this.targetY = null;
    this.accelerationFactor = 1.05; // Higher acceleration for snappier movement
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
    try {
      const glowGradient = createGlowEffect(ctx, color, this.glowIntensity, this.size);
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
      ctx.fill();
    } catch (error) {
      // Fallback if gradient creation fails
      ctx.fillStyle = this.isQualified ? 'rgba(0, 110, 218, 0.5)' : 'rgba(120, 130, 150, 0.3)';
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw the main shape based on type
    if (this.type === 'circle') {
      drawBubbleShape(ctx, this.size, this.isQualified, colors);
    } else if (this.type === 'square') {
      drawSquareShape(ctx, this.size, this.isQualified, colors);
    } else if (this.type === 'diamond') {
      drawDiamondShape(ctx, this.size, this.isQualified, colors);
    }
    
    // Draw emoji in the center of larger particles
    drawEmoji(ctx, this.emoji, this.size);
    
    // Reset opacity and restore context
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

export default MessageParticle;
