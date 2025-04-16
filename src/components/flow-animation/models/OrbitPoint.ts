
/**
 * Represents an orbit point that circles around the AI Node
 */
export class OrbitPoint {
  angle: number;
  speed: number;
  size: number;
  distance: number;
  color: string;
  
  constructor(initialAngle: number, nodeSize: number, index: number) {
    this.angle = initialAngle;
    this.speed = 0.01 + Math.random() * 0.02;
    this.size = 1.5 + Math.random() * 3;
    this.distance = nodeSize * (0.8 + Math.random() * 0.5);
    this.color = index % 3 === 0 ? '#00E676' : 
                 index % 3 === 1 ? '#FFC107' : '#006eda';
  }
  
  update(): void {
    this.angle += this.speed;
    if (this.angle > Math.PI * 2) {
      this.angle -= Math.PI * 2;
    }
  }
}
