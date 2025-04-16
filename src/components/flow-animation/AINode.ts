
import { OrbitPoint } from './models/OrbitPoint';
import { 
  drawPulseEffect, 
  drawOrbitPoints, 
  drawNodeBody, 
  drawInnerConnections, 
  drawInnerNodes,
  drawNodeLogo
} from './utils/aiNodeDrawUtils';

class AINode {
  x: number;
  y: number;
  size: number;
  pulseRadius: number;
  pulseOpacity: number;
  pulseSpeed: number;
  rotation: number;
  rotationSpeed: number;
  processingEffect: number;
  processingDirection: number;
  logoScale: number;
  logoScaleDir: number;
  orbitPoints: OrbitPoint[];
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = 60; // Increased size for more prominence
    this.pulseRadius = this.size;
    this.pulseOpacity = 0.35; // Increased opacity
    this.pulseSpeed = 0.03; // Faster pulse
    this.rotation = 0;
    this.rotationSpeed = 0.01; // Faster rotation
    this.processingEffect = 0;
    this.processingDirection = 1;
    this.logoScale = 1;
    this.logoScaleDir = 0.005;
    
    // Create orbiting particles
    this.orbitPoints = this.initializeOrbitPoints();
  }
  
  private initializeOrbitPoints(): OrbitPoint[] {
    const points: OrbitPoint[] = [];
    const orbitCount = 12; // More orbit points
    
    for (let i = 0; i < orbitCount; i++) {
      const initialAngle = (Math.PI * 2 / orbitCount) * i;
      points.push(new OrbitPoint(initialAngle, this.size, i));
    }
    
    return points;
  }
  
  update() {
    // Pulse effect
    this.pulseRadius += this.pulseSpeed;
    if (this.pulseRadius > this.size * 2.2) { // Larger pulse
      this.pulseRadius = this.size;
    }
    
    // Rotation effect for inner elements
    this.rotation += this.rotationSpeed;
    if (this.rotation > Math.PI * 2) {
      this.rotation = 0;
    }
    
    // Processing effect
    this.processingEffect += 0.03 * this.processingDirection; // Faster processing effect
    if (this.processingEffect > 1 || this.processingEffect < 0) {
      this.processingDirection *= -1;
    }
    
    // Logo scaling effect
    this.logoScale += this.logoScaleDir;
    if (this.logoScale > 1.1 || this.logoScale < 0.95) {
      this.logoScaleDir *= -1;
    }
    
    // Update orbiting particles
    for (let point of this.orbitPoints) {
      point.update();
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw pulse effects
    drawPulseEffect(ctx, this.x, this.y, this.pulseRadius, this.pulseOpacity);
    
    // Draw orbit points
    drawOrbitPoints(ctx, this.x, this.y, this.orbitPoints);
    
    // Draw main node body
    drawNodeBody(ctx, this.x, this.y, this.size, colors);
    
    // Draw processing indicator (ripple effect)
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * (0.7 + this.processingEffect * 0.2), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 - this.processingEffect * 0.5})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Save context for rotation
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw inner rotating elements (abstract AI representation)
    const connections = 6;
    
    // Inner connections (neural network style)
    drawInnerConnections(ctx, connections, this.rotation, this.size);
    
    // Inner circles (neural network nodes)
    drawInnerNodes(ctx, connections, this.rotation, this.size);
    
    // Apply logo scale animation
    ctx.scale(this.logoScale, this.logoScale);
    
    // Draw the node logo
    drawNodeLogo(ctx, this.size);
    
    // Restore context
    ctx.restore();
  }
  
  processParticle(particle: {x: number, y: number}): boolean {
    // Check if particle is within processing range
    const dx = this.x - particle.x;
    const dy = this.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < this.size;
  }
}

export default AINode;
