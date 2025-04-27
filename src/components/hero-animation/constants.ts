
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 12, // Increased for more particles in view
  LEAD_GENERATION_INTERVAL: 4000, // Slightly faster generation
  PROCESSING_DELAY_BASE: 2500, // Faster processing
  CONVERSION_DISPLAY_DURATION: 4000, // Increased to allow for smoother transitions
  STAGGER_DELAY: 2, // Increased for more spacing between leads
  MOBILE_LEAD_COUNT: 6, // More leads even on mobile
  NAME_CARD_START_X: 100,
  NAME_CARD_END_X: 350,
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  START_X: -350,
  NAME_CARD_DISPLAY_COUNT: 5, // Show more cards at once
  LEAD_SCALE_START: 1.2, // Starting scale for leads
  LEAD_SCALE_END: 0.7,  // Ending scale before absorption (smaller for deeper effect)
  ABSORPTION_DURATION: 0.7, // Duration for absorption animation (slightly faster)
  RESULT_EMERGENCE_DELAY: 400, // Delay before showing result (faster response)
  OSCILLATION_AMPLITUDE: 15, // How much vertical oscillation
  OSCILLATION_SPEED: 0.8, // How fast the oscillation happens
  HORIZONTAL_WAVE_AMPLITUDE: 10, // Horizontal wave effect for name cards
  HORIZONTAL_WAVE_SPEED: 1.2, // Speed of horizontal wave
  SUCTION_EFFECT_RADIUS: 180, // Distance from center where suction begins
  SUCTION_EFFECT_STRENGTH: 1.8, // Strength of the pull effect
  DEPTH_Z_RANGE: 30, // Z-index range for depth perception
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
