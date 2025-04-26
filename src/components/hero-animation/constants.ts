
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 5, // Increased for more continuous flow
  LEAD_GENERATION_INTERVAL: 3000, // Faster generation for smoother appearance
  PROCESSING_DELAY_BASE: 2000, // Smooth, unhurried processing
  CONVERSION_DISPLAY_DURATION: 5000, // Longer display time
  STAGGER_DELAY: 1.5, // Better spacing between leads
  MOBILE_LEAD_COUNT: 3, // More leads visible on mobile
  NAME_CARD_START_X: 80, // Start closer to the center
  NAME_CARD_END_X: 350,
  CARD_HEIGHT: 50,
  VERTICAL_SPACING: 70,
  START_X: -350, // Start position off-screen
  NAME_CARD_DISPLAY_COUNT: 1, // Show only one conversion at a time
  LEAD_SCALE_START: 1.4, // Larger starting scale for leads
  LEAD_SCALE_END: 0.7,  // Smaller ending scale before absorption
  ABSORPTION_DURATION: 0.9, // Slightly longer absorption for smoother effect
  RESULT_EMERGENCE_DELAY: 600, // Small delay before showing result
  LEAD_FLOW_DURATION_BASE: 6, // Base duration for lead flow animation
  LEAD_FLOW_DURATION_VARIATION: 1.5, // Variation in lead flow duration
  NAME_CARD_DURATION: 4, // Duration for name card display
  CENTRAL_PULSE_INTENSITY: [0.75, 1.1], // Pulse intensity range for center logo
  EXIT_DURATION: 3.5, // Duration for exit animation
} as const;

export const CONVERSION_TYPES = [
  'booked a strategy call',
  'enrolled in mentorship',
  'joined program',
  'scheduled consultation',
  'started free trial',
  'joined webinar',
  'purchased course',
  'booked a demo'
] as const;

export const generateLeadPositions = (count: number) => {
  const positions = [];
  const { CARD_HEIGHT, VERTICAL_SPACING, START_X } = ANIMATION_SETTINGS;
  
  const totalHeight = count * VERTICAL_SPACING;
  const startY = -totalHeight / 2;
  
  for (let i = 0; i < count; i++) {
    const baseYPos = startY + (i * VERTICAL_SPACING);
    // Reduced randomness for a more organized flow
    const yPos = baseYPos + (Math.random() * 15 - 7.5);
    
    positions.push({ 
      x: START_X + (Math.random() * 40 - 20), // Add slight horizontal variation
      y: yPos
    });
  }
  
  return positions;
};
