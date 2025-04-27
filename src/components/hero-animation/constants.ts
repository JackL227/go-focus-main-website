
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 3,
  LEAD_GENERATION_INTERVAL: 6000, // Increased for slower, more premium feel
  PROCESSING_DELAY_BASE: 3000,
  CONVERSION_DISPLAY_DURATION: 4000, // Increased to allow for smoother transitions
  STAGGER_DELAY: 3, // Increased for more spacing between leads
  MOBILE_LEAD_COUNT: 2,
  NAME_CARD_START_X: 100,
  NAME_CARD_END_X: 350,
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  START_X: -350,
  NAME_CARD_DISPLAY_COUNT: 1,
  LEAD_SCALE_START: 1.2, // Starting scale for leads
  LEAD_SCALE_END: 0.8,  // Ending scale before absorption
  ABSORPTION_DURATION: 0.8, // Duration for absorption animation
  RESULT_EMERGENCE_DELAY: 500, // Delay before showing result
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
    const yPos = baseYPos + (Math.random() * 20 - 10);
    
    positions.push({ 
      x: START_X,
      y: yPos
    });
  }
  
  return positions;
};
