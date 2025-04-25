
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 5,
  LEAD_GENERATION_INTERVAL: 4000,
  PROCESSING_DELAY_BASE: 2000,
  CONVERSION_DISPLAY_DURATION: 6000,
  STAGGER_DELAY: 0.8,
  MOBILE_LEAD_COUNT: 3
} as const;

export const generateLeadPositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const xPos = -350;
    const yOffset = Math.sin((i / count) * Math.PI) * 120 - 60;
    positions.push({ x: xPos, y: yOffset });
  }
  return positions;
};
