export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 10,
  LEAD_GENERATION_INTERVAL: 1500,
  START_X: -200,
  MAX_SCALE: 1,
  MIN_SCALE: 0.5,
  SCALE_DECREASE_RATE: 0.004,
  LEAD_SPEED: 4,
  CONVERTED_SPEED: 3,
  MOBILE_SCALE_FACTOR: 0.8
} as const;

export const CONVERSION_TYPES = [
  'enrolled in program',
  'booked a call',
  'joined mentorship',
  'signed up',
  'enrolled',
  'booked a demo'
] as const;

export const generateLeadPositions = (count: number) => {
  const positions = [];
  const { CARD_HEIGHT, VERTICAL_SPACING, START_X } = ANIMATION_SETTINGS;
  
  const totalHeight = count * VERTICAL_SPACING;
  const startY = -totalHeight / 2;
  
  for (let i = 0; i < count; i++) {
    const baseYPos = startY + (i * VERTICAL_SPACING);
    const yPos = baseYPos + (Math.random() * 40 - 20);
    
    positions.push({ 
      x: START_X - (Math.random() * 80),
      y: yPos,
      originalY: yPos
    });
  }
  
  return positions;
};
