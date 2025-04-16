
/**
 * Represents an outcome panel that displays results of AI processing
 */
export class OutcomePanel {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: string;
  pulseEffect: number;
  isPulsing: boolean;
  
  constructor(x: number, y: number, label: string, type: string) {
    this.x = x;
    this.y = y;
    this.width = 140; // Increased width
    this.height = 80; // Increased height
    this.label = label;
    this.type = type; // checkmark, calendar, smile
    this.pulseEffect = 0;
    this.isPulsing = false;
  }
  
  pulse() {
    this.isPulsing = true;
    this.pulseEffect = 1;
  }
  
  update() {
    if (this.isPulsing) {
      this.pulseEffect -= 0.03;
      if (this.pulseEffect <= 0) {
        this.pulseEffect = 0;
        this.isPulsing = false;
      }
    }
  }
  
  draw(ctx: CanvasRenderingContext2D, colors: Record<string, string>) {
    const panelColor = this.getPanelColor(colors);
    const panelDimensions = this.calculateDimensions();
    
    // Draw the panel with effects
    drawOutcomePanel(ctx, panelDimensions, panelColor, this.isPulsing);
    
    // Draw icon and content
    drawPanelContents(ctx, panelDimensions, panelColor, this.type, this.label);
  }
  
  private getPanelColor(colors: Record<string, string>): string {
    if (this.type === 'checkmark') {
      return '#00E676'; // Green
    } else if (this.type === 'calendar') {
      return colors.primary; // Blue
    } else {
      return '#FFC107'; // Gold/amber
    }
  }
  
  private calculateDimensions() {
    const scaleFactor = 1 + (this.pulseEffect * 0.15);
    const width = this.width * scaleFactor;
    const height = this.height * scaleFactor;
    const x = this.x - width / 2;
    const y = this.y - height / 2;
    
    return { x, y, width, height, centerX: this.x, centerY: this.y };
  }
}

// Import drawing utilities for the panel
import { drawOutcomePanel, drawPanelContents } from '../utils/outcomePanelDrawUtils';

