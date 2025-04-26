export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 5,
  LEAD_GENERATION_INTERVAL: 2000,
  PROCESSING_DELAY_BASE: 2000,
  CONVERSION_DISPLAY_DURATION: 6000,
  STAGGER_DELAY: 1.2,
  MOBILE_LEAD_COUNT: 3,
  NAME_CARD_START_X: 100,
  NAME_CARD_END_X: 350,
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  START_X: -350,
  NAME_CARD_DISPLAY_COUNT: 4
} as const;

export const CONVERSION_TYPES = [
  'joined program',
  'enrolled',
  'became customer',
  'completed purchase',
  'scheduled call',
  'started trial'
] as const;

export const generateLeadPositions = (count: number) => {
  const positions = [];
  const { CARD_HEIGHT, VERTICAL_SPACING, START_X } = ANIMATION_SETTINGS;
  
  const totalHeight = count * VERTICAL_SPACING;
  const startY = -totalHeight / 2;
  
  for (let i = 0; i < count; i++) {
    const baseYPos = startY + (i * VERTICAL_SPACING);
    const yPos = baseYPos + (Math.random() * 20 - 10);
    
    positions.push({ 
      x: START_X,
      y: yPos
    });
  }
  
  return positions;
};
