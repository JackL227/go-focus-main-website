
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 8, // Reduced for smoother flow
  LEAD_GENERATION_INTERVAL: 4000, // Slower generation
  PROCESSING_DELAY_BASE: 1800, // Faster processing
  CONVERSION_DISPLAY_DURATION: 5000,
  STAGGER_DELAY: 3.0, // Increased for better spacing
  MOBILE_LEAD_COUNT: 4,
  NAME_CARD_START_X: 60,
  NAME_CARD_END_X: 350,
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  START_X: -350,
  NAME_CARD_DISPLAY_COUNT: 5,
  LEAD_SCALE_START: 1.2,
  LEAD_SCALE_END: 0.3, // Smaller end scale for smoother absorption
  ABSORPTION_DURATION: 1.4, // Longer absorption
  RESULT_EMERGENCE_DELAY: 200,
  OSCILLATION_AMPLITUDE: 15, // Reduced for smoother movement
  OSCILLATION_SPEED: 0.8, // Slower oscillation
  HORIZONTAL_WAVE_AMPLITUDE: 10,
  HORIZONTAL_WAVE_SPEED: 1.2,
  SUCTION_EFFECT_RADIUS: 250, // Larger radius
  SUCTION_EFFECT_STRENGTH: 2.8, // Stronger pull
  DEPTH_Z_RANGE: 35
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
      x: START_X - (Math.random() * 100), // Add some horizontal variance
      y: yPos
    });
  }
  
  return positions;
};
