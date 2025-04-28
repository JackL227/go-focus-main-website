
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 10,
  LEAD_GENERATION_INTERVAL: 1500,
  START_X: -200,
  MAX_SCALE: 1,
  MIN_SCALE: 0.5,
  SCALE_DECREASE_RATE: 0.004,
  LEAD_SPEED: 4,
  CONVERTED_SPEED: 3,
  MOBILE_SCALE_FACTOR: 0.8,
  // Additional settings for animation effects
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  NAME_CARD_START_X: 60,
  NAME_CARD_END_X: 350,
  ABSORPTION_DURATION: 0.8,
  RESULT_EMERGENCE_DELAY: 800,
  OSCILLATION_AMPLITUDE: 12,
  OSCILLATION_SPEED: 0.75,
  HORIZONTAL_WAVE_AMPLITUDE: 8,
  HORIZONTAL_WAVE_SPEED: 1.1,
  SUCTION_EFFECT_RADIUS: 150,
  SUCTION_EFFECT_STRENGTH: 2.5,
  DEPTH_Z_RANGE: 30,
  LEAD_SCALE_START: 1.15,
  LEAD_SCALE_END: 0.25
} as const;

export const CONVERSION_TYPES = [
  // Trading conversions
  'joined program',
  'enrolled in course',
  'became student',
  'purchased course',
  'scheduled consultation',
  'started free trial',
  'signed up for webinar',
  'completed purchase',
  
  // Course creator conversions
  'enrolled in academy',
  'purchased membership',
  'joined coaching program',
  'requested curriculum',
  'booked strategy call',
  
  // Real estate conversions
  'scheduled viewing',
  'requested valuation',
  'booked consultation',
  'inquired about property',
  'scheduled call'
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
