
export abstract class BaseParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  glowIntensity: number;
  
  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 0.7 + Math.random() * 2;
    this.opacity = 0.5 + Math.random() * 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() * 0.02) - 0.01;
    this.glowIntensity = 0.3 + Math.random() * 0.7;
  }
  
  abstract update(): number;
  
  abstract draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>): void;
}
