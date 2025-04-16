import { MessageParticle } from './particles';

interface LetterPoint {
  x: number;
  y: number;
  occupied: boolean;
  particle: MessageParticle | null;
  releaseTime: number;
}

class WordFormation {
  x: number;
  y: number;
  word: string;
  letterPoints: LetterPoint[];
  fontSize: number;
  letterSpacing: number;
  pointDensity: number;
  releaseRate: number;
  lastReleaseTime: number;

  constructor(x: number, y: number, word: string) {
    this.x = x;
    this.y = y;
    this.word = word;
    this.fontSize = 60;
    this.letterSpacing = 15;
    this.pointDensity = 0.5; // Higher means more points
    this.letterPoints = [];
    this.releaseRate = 400; // ms between particles release
    this.lastReleaseTime = Date.now();
    
    this.generateLetterPoints();
  }

  generateLetterPoints() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.fontSize * this.word.length * 1.5;
    canvas.height = this.fontSize * 2;
    
    ctx.font = `bold ${this.fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    let offsetX = this.fontSize / 2;
    
    // Generate points for each letter
    for (let i = 0; i < this.word.length; i++) {
      const letter = this.word[i];
      ctx.fillText(letter, offsetX, canvas.height / 2);
      
      // Sample points from the letter
      const letterWidth = ctx.measureText(letter).width;
      const startX = offsetX - letterWidth / 2;
      const endX = offsetX + letterWidth / 2;
      
      // Sample points from the text pixels
      for (let x = startX; x < endX; x += this.fontSize / 20) {
        for (let y = canvas.height / 2 - this.fontSize / 2; y < canvas.height / 2 + this.fontSize / 2; y += this.fontSize / 20) {
          // Sample more points where there's actual letter data
          const pixelData = ctx.getImageData(x, y, 1, 1).data;
          if (pixelData[3] > 0) { // If pixel is not transparent
            if (Math.random() < this.pointDensity) {
              // Add the point with position relative to the formation's center
              this.letterPoints.push({
                x: this.x + (x - offsetX + letterWidth / 2),
                y: this.y + (y - canvas.height / 2),
                occupied: false,
                particle: null,
                releaseTime: 0
              });
            }
          }
        }
      }
      
      offsetX += letterWidth + this.letterSpacing;
    }
    
    // Shuffle points for more natural filling
    this.letterPoints.sort(() => Math.random() - 0.5);
  }

  attractParticle(particle: MessageParticle): boolean {
    // Find the closest available point
    let closestPoint: LetterPoint | null = null;
    let closestDistance = Number.MAX_VALUE;
    
    for (const point of this.letterPoints) {
      if (!point.occupied) {
        const dx = point.x - particle.x;
        const dy = point.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint = point;
        }
      }
    }
    
    // If we found a point and it's reasonably close
    if (closestPoint && closestDistance < 50) {
      // Move particle to point
      particle.x = closestPoint.x;
      particle.y = closestPoint.y;
      particle.speed = 0;
      
      // Mark point as occupied
      closestPoint.occupied = true;
      closestPoint.particle = particle;
      closestPoint.releaseTime = Date.now() + Math.random() * 5000 + 2000; // Release after 2-7 seconds
      
      return true;
    }
    
    return false;
  }

  releaseParticles(): MessageParticle[] {
    const currentTime = Date.now();
    const releasedParticles: MessageParticle[] = [];
    
    // Only release if enough time has passed
    if (currentTime - this.lastReleaseTime < this.releaseRate) {
      return releasedParticles;
    }
    
    // Find particles ready to be released
    for (const point of this.letterPoints) {
      if (point.occupied && point.particle && point.releaseTime <= currentTime) {
        releasedParticles.push(point.particle);
        point.occupied = false;
        point.particle = null;
        point.releaseTime = 0;
        this.lastReleaseTime = currentTime;
        break; // Only release one particle at a time
      }
    }
    
    return releasedParticles;
  }

  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    // Optional: Visualize the word outline subtly
    ctx.globalAlpha = 0.1;
    ctx.font = `bold ${this.fontSize}px Arial`;
    ctx.fillStyle = colors.accent;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(this.word, this.x, this.y);
    ctx.globalAlpha = 1;
    
    // Particles are drawn separately in the main animation loop
  }
}

export default WordFormation;
