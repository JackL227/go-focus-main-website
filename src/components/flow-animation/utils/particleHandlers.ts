
import { MessageParticle } from '../particles';
import LeadParticle from '../LeadParticle';
import AINode from '../AINode';
import { OutcomePanel } from '../models/OutcomePanel';
import { animationColors } from '../flowAnimationUtils';

/**
 * Update message particles and create new lead particles when needed
 */
export const updateMessageParticles = (
  ctx: CanvasRenderingContext2D,
  messageParticles: MessageParticle[],
  aiNode: AINode,
  qualifiedPanel: OutcomePanel,
  bookedPanel: OutcomePanel,
  closedPanel: OutcomePanel,
  leadParticles: LeadParticle[]
) => {
  for (let i = messageParticles.length - 1; i >= 0; i--) {
    const particle = messageParticles[i];
    const x = particle.update();
    particle.draw(ctx, animationColors);
    
    // Check if particle reached AI node for processing
    if (aiNode.processParticle(particle)) {
      messageParticles.splice(i, 1);
      
      // Visual flash effect on AI node
      aiNode.pulseOpacity = 0.6;
      
      const targetPanel = selectTargetPanel(qualifiedPanel, bookedPanel, closedPanel);
      
      // Create a lead particle heading to the selected panel
      const leadType = targetPanel.type === "calendar" ? "calendar" : 
                      targetPanel.type === "checkmark" ? "checkmark" : "smile";
                      
      const newLead = new LeadParticle(aiNode.x, aiNode.y, leadType);
      newLead.setTarget(targetPanel.x, targetPanel.y);
      leadParticles.push(newLead);
      
      continue;
    }
    
    // Auto-direct particles once they reach mid-screen
    if (!particle.targetX && x > ctx.canvas.width * 0.35) {
      particle.redirectToNode(aiNode.x, aiNode.y);
    }
    
    // Remove if off screen
    if (x > ctx.canvas.width + 50) {
      messageParticles.splice(i, 1);
    }
  }
};

/**
 * Select a target panel with weighted probabilities
 */
const selectTargetPanel = (
  qualifiedPanel: OutcomePanel, 
  bookedPanel: OutcomePanel, 
  closedPanel: OutcomePanel
): OutcomePanel => {
  // Determine outcome panel with weighted probabilities
  const rand = Math.random();
  
  if (rand < 0.45) { // Higher chance for qualified
    qualifiedPanel.pulse();
    return qualifiedPanel;
  } else if (rand < 0.8) { // Medium chance for booked call
    bookedPanel.pulse();
    return bookedPanel;
  } else { // Lower chance for closed deal
    closedPanel.pulse();
    return closedPanel;
  }
};

/**
 * Update and draw lead particles
 */
export const updateLeadParticles = (
  ctx: CanvasRenderingContext2D,
  leadParticles: LeadParticle[]
) => {
  for (let i = leadParticles.length - 1; i >= 0; i--) {
    const particle = leadParticles[i];
    particle.update();
    particle.draw(ctx, animationColors);
    
    // Check if reached target panel
    if (particle.hasReachedTarget()) {
      leadParticles.splice(i, 1);
      continue;
    }
  }
};
