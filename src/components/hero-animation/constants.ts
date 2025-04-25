
export const ANIMATION_SETTINGS = {
  LEAD_COUNT: 4,
  LEAD_GENERATION_INTERVAL: 3500,
  PROCESSING_DELAY_BASE: 1500,
  CONVERSION_DISPLAY_DURATION: 4000,
  STAGGER_DELAY: 0.8,
  MOBILE_LEAD_COUNT: 2
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
