export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 12, // Adjusted to optimal number
  LEAD_GENERATION_INTERVAL: 3500, // Slowed down for smoother flow
  PROCESSING_DELAY_BASE: 2000, // Slightly faster processing
  CONVERSION_DISPLAY_DURATION: 5000, // Increased for smoother transitions
  STAGGER_DELAY: 2.5, // Increased for more spacing between leads
  MOBILE_LEAD_COUNT: 6, // Keep mobile lead count
  NAME_CARD_START_X: 80, // Adjusted for better positioning
  NAME_CARD_END_X: 350,
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  START_X: -350,
  NAME_CARD_DISPLAY_COUNT: 5,
  LEAD_SCALE_START: 1.4, // Increased starting scale for better perspective
  LEAD_SCALE_END: 0.4,  // Smaller ending scale for more dramatic shrinking effect
  ABSORPTION_DURATION: 1.2, // Extended duration for more visible absorption
  RESULT_EMERGENCE_DELAY: 300, // Faster response after absorption
  OSCILLATION_AMPLITUDE: 18, // Increased vertical oscillation
  OSCILLATION_SPEED: 1.0, // Adjusted oscillation speed
  HORIZONTAL_WAVE_AMPLITUDE: 12, // Enhanced horizontal wave effect
  HORIZONTAL_WAVE_SPEED: 1.4, // Increased wave speed
  SUCTION_EFFECT_RADIUS: 220, // Increased radius to start pull effect earlier
  SUCTION_EFFECT_STRENGTH: 2.2, // Stronger pull effect
  DEPTH_Z_RANGE: 40, // Enhanced Z-index range for better depth perception
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
