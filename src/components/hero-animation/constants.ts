
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 5,
  LEAD_GENERATION_INTERVAL: 4000,
  PROCESSING_DELAY_BASE: 2000,
  CONVERSION_DISPLAY_DURATION: 6000,
  STAGGER_DELAY: 0.8,
  MOBILE_LEAD_COUNT: 3,
  NAME_CARD_START_X: 100,  // Starting position for name cards
  NAME_CARD_END_X: 350,    // Ending position for name cards
  CARD_HEIGHT: 50,         // Height of each card for spacing
  VERTICAL_SPACING: 70,    // Minimum vertical space between cards
  START_X: -350,           // Starting X position for lead cards
  NAME_CARD_DISPLAY_COUNT: 4  // Maximum number of name cards to display at once
} as const;

export const generateLeadPositions = (count: number) => {
  const positions = [];
  const { CARD_HEIGHT, VERTICAL_SPACING, START_X } = ANIMATION_SETTINGS;
  
  // Calculate total height needed
  const totalHeight = count * VERTICAL_SPACING;
  // Start from the top of the space
  const startY = -totalHeight / 2;
  
  for (let i = 0; i < count; i++) {
    // Evenly space cards vertically with some randomization
    const baseYPos = startY + (i * VERTICAL_SPACING);
    const yPos = baseYPos + (Math.random() * 20 - 10); // Add slight randomization
    
    positions.push({ 
      x: START_X,
      y: yPos
    });
  }
  
  return positions;
};
