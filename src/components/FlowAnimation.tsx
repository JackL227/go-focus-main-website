
import React, { useEffect, useRef } from 'react';

const FlowAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full width
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Line properties
    const chaosLines = Array(4).fill(0).map(() => ({
      points: Array(5).fill(0).map(() => Math.random() * 0.5 + 0.25), // Y position variations (0.25-0.75)
      speed: (Math.random() * 0.5 + 1.0) / 100, // Different speeds
      phase: Math.random() * 2 * Math.PI, // Different starting phases
      opacity: 0.3 + Math.random() * 0.3, // Different opacities
    }));
    
    const orderedLines = Array(2).fill(0).map(() => ({
      baseY: 0.4 + Math.random() * 0.2, // Base Y position (0.4-0.6)
      speed: (Math.random() * 0.3 + 0.8) / 100, // Consistent speed
      amplitude: 0.03, // Small amplitude for slight movement
      phase: Math.random() * 2 * Math.PI, // Different phases
    }));
    
    // Center point (transformation point)
    const centerX = canvas.width * 0.5;
    const centerY = canvas.height * 0.5;
    const centerRadius = 8;
    
    // Animation loop
    let animationId: number;
    let progress = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      progress += 0.01;
      
      const drawChaosLines = () => {
        chaosLines.forEach((line, lineIndex) => {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height * 0.5); // Start at middle left
          
          // Draw chaotic lines (left side)
          for (let i = 0; i <= 100; i++) {
            const x = (i / 100) * centerX;
            
            // As we get closer to center, lines become more controlled
            const controlFactor = Math.min(1, (centerX - x) / centerX);
            
            // Calculate y position with perlin-like noise
            const y = canvas.height * (0.5 + (line.points[Math.floor(i/20) % line.points.length] - 0.5) * 
                     controlFactor * Math.sin(progress * 2 + lineIndex * 0.7 + i * 0.03 + line.phase));
            
            ctx.lineTo(x, y);
          }
          
          // Gradient from gray to blue
          const gradient = ctx.createLinearGradient(0, 0, centerX, 0);
          gradient.addColorStop(0, `rgba(160, 160, 160, ${line.opacity})`);
          gradient.addColorStop(1, `rgba(59, 130, 246, ${line.opacity + 0.1})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      };
      
      const drawOrderedLines = () => {
        orderedLines.forEach((line, lineIndex) => {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY); // Start at center point
          
          // Draw ordered lines with slight upward trend (right side)
          for (let i = 0; i <= 100; i++) {
            const x = centerX + (i / 100) * (canvas.width - centerX);
            const progressUp = i / 100; // Progress from left to right
            
            // Calculate trend (upward as we go right)
            const trendUp = progressUp * canvas.height * 0.15;
            
            // Calculate y with slight wave
            const y = canvas.height * line.baseY - trendUp + 
                     Math.sin(progress + lineIndex * 2 + i * 0.03 + line.phase) * 
                     canvas.height * line.amplitude;
            
            ctx.lineTo(x, y);
          }
          
          // Green gradient
          const gradient = ctx.createLinearGradient(centerX, 0, canvas.width, 0);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)");
          gradient.addColorStop(1, "rgba(16, 185, 129, 0.8)");
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.stroke();
        });
      };
      
      const drawCenterPoint = () => {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, centerRadius * 3
        );
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Center point
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 1)";
        ctx.fill();
      };
      
      drawChaosLines();
      drawOrderedLines();
      drawCenterPoint();
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default FlowAnimation;
