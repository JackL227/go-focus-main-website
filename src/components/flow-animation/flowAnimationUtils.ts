
// Define the colors for the animation
export const animationColors = {
  primary: '#006eda', // blue
  secondary: '#006eda', // blue
  accent: '#00c4a7', // teal accent
  highlight: '#ffc107', // gold/amber
  faded: 'rgba(206, 206, 206, 0.5)', // grey with opacity
  analytics: '#006eda', // blue
  qualified: '#4caf50', // green for qualified
  booked: '#ff9800', // orange for booked
  confirmed: '#ffc107', // gold for confirmed
};

// Canvas sizing helper function
export const setCanvasSize = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

// Create initial particles
export const createInitialMessageParticles = (count: number, MessageParticle: any, canvasHeight: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const x = -50 - Math.random() * 100;
    const y = Math.random() * canvasHeight;
    particles.push(new MessageParticle(x, y, canvasHeight));
  }
  return particles;
};

// Create outcome panels
export const createOutcomePanels = (
  canvasWidth: number, 
  canvasHeight: number, 
  OutcomePanel: any
) => {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const radius = Math.min(canvasWidth, canvasHeight) * 0.3;
  
  return [
    new OutcomePanel(
      centerX + radius * Math.cos(Math.PI * 0.2),
      centerY + radius * Math.sin(Math.PI * 0.2),
      'Qualified', 
      'qualified'
    ),
    new OutcomePanel(
      centerX + radius * Math.cos(Math.PI * 0.5),
      centerY + radius * Math.sin(Math.PI * 0.5),
      'Booked Call', 
      'booked'
    ),
    new OutcomePanel(
      centerX + radius * Math.cos(Math.PI * 0.8),
      centerY + radius * Math.sin(Math.PI * 0.8),
      'Confirmed Treatment', 
      'confirmed'
    ),
  ];
};

