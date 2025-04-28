
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 10, // Reduced count for cleaner appearance
  LEAD_GENERATION_INTERVAL: 3500, // Slightly faster generation
  PROCESSING_DELAY_BASE: 1200, // Faster processing
  CONVERSION_DISPLAY_DURATION: 5000,
  STAGGER_DELAY: 2.5, // Balanced spacing
  MOBILE_LEAD_COUNT: 5,
  NAME_CARD_START_X: 60,
  NAME_CARD_END_X: 350,
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  START_X: -350,
  NAME_CARD_DISPLAY_COUNT: 5,
  LEAD_SCALE_START: 1.15,
  LEAD_SCALE_END: 0.25, // Smaller end scale for smoother absorption
  ABSORPTION_DURATION: 1.2, // Better absorption timing
  RESULT_EMERGENCE_DELAY: 150, // Better emergence timing
  OSCILLATION_AMPLITUDE: 12, // Reduced for smoother movement
  OSCILLATION_SPEED: 0.75, // Slower oscillation
  HORIZONTAL_WAVE_AMPLITUDE: 8, // Reduced for cleaner flow
  HORIZONTAL_WAVE_SPEED: 1.1,
  SUCTION_EFFECT_RADIUS: 200, // Better radius for natural flow
  SUCTION_EFFECT_STRENGTH: 3.0, // Stronger pull
  DEPTH_Z_RANGE: 30,
  MAX_VISIBLE_LEADS: 12 // Maximum visible leads at once
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
      x: START_X - (Math.random() * 80), // Add some horizontal variance
      y: yPos,
      originalY: yPos // Store original Y for oscillation
    });
  }
  
  return positions;
};
