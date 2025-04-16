
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
  orbitPoints: {angle: number, speed: number, size: number, distance: number, color: string}[];
  
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
    this.orbitPoints = [];
    const orbitCount = 12; // More orbit points
    
    for (let i = 0; i < orbitCount; i++) {
      this.orbitPoints.push({
        angle: (Math.PI * 2 / orbitCount) * i,
        speed: 0.01 + Math.random() * 0.02,
        size: 1.5 + Math.random() * 3,
        distance: this.size * (0.8 + Math.random() * 0.5),
        color: i % 3 === 0 ? '#00E676' : 
               i % 3 === 1 ? '#FFC107' : '#006eda'
      });
    }
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
      point.angle += point.speed;
      if (point.angle > Math.PI * 2) {
        point.angle -= Math.PI * 2;
      }
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Draw multiple outer pulses for enhanced glow effect
    for (let i = 0; i < 4; i++) { // More pulse rings
      const pulseRadius = this.pulseRadius - i * (this.size * 0.2);
      if (pulseRadius > 0) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseRadius
        );
        gradient.addColorStop(0, `rgba(0, 110, 218, ${this.pulseOpacity - i * 0.05})`);
        gradient.addColorStop(0.7, `rgba(0, 110, 218, ${(this.pulseOpacity - i * 0.05) * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 110, 218, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Draw orbiting particles
    for (let point of this.orbitPoints) {
      const x = this.x + Math.cos(point.angle) * point.distance;
      const y = this.y + Math.sin(point.angle) * point.distance;
      
      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `${point.color}44`;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(x, y, point.size, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
      
      // Add glow to particle
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, point.size * 3);
      glowGradient.addColorStop(0, `${point.color}66`);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, point.size * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw outer glow
    ctx.shadowColor = colors.primary;
    ctx.shadowBlur = 25; // Enhanced glow
    
    // Draw main node with glass effect
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    
    gradient.addColorStop(0, 'rgba(0, 110, 218, 0.95)');
    gradient.addColorStop(0.7, 'rgba(0, 82, 163, 0.9)');
    gradient.addColorStop(1, 'rgba(0, 56, 112, 0.85)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add highlight for glass effect
    ctx.beginPath();
    ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fill();
    
    // Draw outer ring with animated glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 1.15, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + this.processingEffect * 0.2})`;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
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
    // Inner connections (neural network style)
    const connections = 6; // More connections
    for (let i = 0; i < connections; i++) {
      const angle1 = (Math.PI * 2 / connections) * i;
      const x1 = Math.cos(angle1) * this.size * 0.3;
      const y1 = Math.sin(angle1) * this.size * 0.3;
      
      for (let j = i + 1; j < connections; j++) {
        const angle2 = (Math.PI * 2 / connections) * j;
        const x2 = Math.cos(angle2) * this.size * 0.3;
        const y2 = Math.sin(angle2) * this.size * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + Math.sin(this.rotation + i) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    
    // Inner circles (neural network nodes)
    for (let i = 0; i < connections; i++) {
      const angle = (Math.PI * 2 / connections) * i;
      const distance = this.size * 0.3;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const circleSize = this.size * (0.1 + 0.03 * Math.sin(this.rotation * 3 + i));
      
      // Pulse color based on position
      const pulseColor = i % 3 === 0 ? '#00E676' : 
                         i % 3 === 1 ? '#FFC107' : '#FFFFFF';
      
      ctx.beginPath();
      ctx.arc(x, y, circleSize, 0, Math.PI * 2);
      ctx.fillStyle = pulseColor;
      ctx.fill();
      
      // Add glow to node
      const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, circleSize * 2);
      nodeGlow.addColorStop(0, `${pulseColor}66`);
      nodeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nodeGlow;
      ctx.beginPath();
      ctx.arc(x, y, circleSize * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Apply logo scale animation
    const logoScale = this.logoScale;
    ctx.scale(logoScale, logoScale);
    
    // Core circle
    ctx.beginPath();
    ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2);
    const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.2);
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0.7)');
    ctx.fillStyle = coreGradient;
    ctx.fill();
    
    // Logo text with premium styling
    ctx.font = `bold ${this.size * 0.15}px Poppins, Arial`;
    ctx.fillStyle = '#003870';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text on two lines with enhanced styling
    ctx.fillText('GO FOCUS', 0, -this.size * 0.05);
    
    // Make AI text stand out
    ctx.font = `bold ${this.size * 0.18}px Poppins, Arial`;
    ctx.fillStyle = '#003870';
    ctx.fillText('AI', 0, this.size * 0.08);
    
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
