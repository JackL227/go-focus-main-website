
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 10,
  LEAD_GENERATION_INTERVAL: 1500,
  START_X: -300, // Start farther to the left
  MAX_SCALE: 1,
  MIN_SCALE: 0.5,
  SCALE_DECREASE_RATE: 0.004,
  LEAD_SPEED: 4,
  CONVERTED_SPEED: 3,
  MOBILE_SCALE_FACTOR: 0.8,
  // Enhanced animation settings
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  NAME_CARD_START_X: 80,
  NAME_CARD_END_X: 350,
  ABSORPTION_DURATION: 0.6, // Faster absorption for better performance
  RESULT_EMERGENCE_DELAY: 700, // Quicker emergence
  OSCILLATION_AMPLITUDE: 14, // Increased oscillation
  OSCILLATION_SPEED: 0.7, // Adjusted for smoother flow
  HORIZONTAL_WAVE_AMPLITUDE: 10,
  HORIZONTAL_WAVE_SPEED: 1.2,
  SUCTION_EFFECT_RADIUS: 200, // Larger suction radius for better animation
  SUCTION_EFFECT_STRENGTH: 3.0, // Optimized pull effect
  DEPTH_Z_RANGE: 40,
  LEAD_SCALE_START: 1.2, // Start slightly larger
  LEAD_SCALE_END: 0.2 // End slightly smaller for better absorption effect
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
    // More natural distribution of starting positions
    const baseYPos = startY + (i * VERTICAL_SPACING);
    const yVariation = Math.random() * 80 - 40; // More vertical variation
    const xVariation = Math.random() * 120 - 20; // More horizontal variation
    
    positions.push({ 
      x: START_X + xVariation,
      y: baseYPos + yVariation,
      originalY: baseYPos + yVariation
    });
  }
  
  return positions;
};
