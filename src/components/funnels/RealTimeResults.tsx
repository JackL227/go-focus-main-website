
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Calendar, Clock } from 'lucide-react';

interface StatItem {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  description?: string;
}

interface RealTimeResultsProps {
  stats: StatItem[];
  niche?: string;
}

const defaultStats: StatItem[] = [
  {
    title: "Leads Generated",
    value: 364,
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    description: "This month"
  },
  {
    title: "Appointments Booked",
    value: 87,
    icon: <Calendar className="h-6 w-6 text-primary" />,
    description: "Last 30 days"
  },
  {
    title: "Clients Closed",
    value: 42,
    icon: <Users className="h-6 w-6 text-primary" />,
    description: "Since launch"
  }
];

const courseCreatorStats: StatItem[] = [
  {
    title: "Leads Captured",
    value: 4016,
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    description: "This month"
  },
  {
    title: "Calls Booked",
    value: 1121,
    icon: <Calendar className="h-6 w-6 text-primary" />,
    description: "Last 30 days"
  },
  {
    title: "Avg. Response Time",
    value: 46,
    suffix: " sec",
    icon: <Clock className="h-6 w-6 text-primary" />,
    description: "All inquiries"
  },
  {
    title: "Conversion Rate",
    value: 64.9,
    suffix: "%",
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    description: "Leads to calls"
  }
];

const realEstateStats: StatItem[] = [
  {
    title: "Leads Captured",
    value: 472,
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    description: "This month"
  },
  {
    title: "Calls Booked",
    value: 126,
    icon: <Calendar className="h-6 w-6 text-primary" />,
    description: "Property viewings arranged"
  },
  {
    title: "Avg. Response Time",
    value: 1.6,
    suffix: " min",
    icon: <Clock className="h-6 w-6 text-primary" />,
    description: "All inquiries"
  },
  {
    title: "Conversion Rate",
    value: 27.3,
    suffix: "%",
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    description: "Lead to viewing rate"
  }
];

const RealTimeResults: React.FC<RealTimeResultsProps> = ({ stats = defaultStats, niche }) => {
  // Use specific stats based on niche
  const finalStats = niche === "course" 
    ? courseCreatorStats 
    : niche === "realestate" 
      ? realEstateStats 
      : stats;
  
  const [countValues, setCountValues] = useState<number[]>(finalStats.map(() => 0));
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameIds = useRef<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Clear any existing animation frames if component re-renders
    animationFrameIds.current.forEach((id) => cancelAnimationFrame(id));
    animationFrameIds.current = [];
    
    if (!isInView) return;

    // Slot machine style counter animation for each stat
    finalStats.forEach((stat, index) => {
      // Start higher than target for slot machine effect
      let startValue = Math.min(stat.value * 5, 9999);
      const endValue = stat.value;
      
      // Increased duration by 50% (from 1500ms to 3000ms)
      const totalDuration = 3000; // 3 seconds instead of 1.5 seconds
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        
        // Easing function for smooth slowing down (ease-out)
        let easedProgress = 1 - Math.pow(1 - progress, 3);
        
        // Adjust speed - faster at first, then gradually slow down
        const currentValue = 
          // Handle decimal values
          typeof endValue === 'number' && endValue % 1 !== 0
            ? Number((startValue - (startValue - endValue) * easedProgress).toFixed(1))
            : Math.floor(startValue - (startValue - endValue) * easedProgress);
        
        setCountValues(prev => {
          const newValues = [...prev];
          newValues[index] = currentValue;
          return newValues;
        });
        
        if (progress < 1) {
          const animId = requestAnimationFrame(animate);
          animationFrameIds.current.push(animId);
        } else {
          // Ensure we land exactly on the target value
          setCountValues(prev => {
            const newValues = [...prev];
            newValues[index] = endValue;
            return newValues;
          });
        }
      };
      
      const animId = requestAnimationFrame(animate);
      animationFrameIds.current.push(animId);
    });

    // Cleanup function to cancel all animation frames on unmount
    return () => {
      animationFrameIds.current.forEach((id) => cancelAnimationFrame(id));
    };
  }, [isInView, finalStats]);

  return (
    <section ref={containerRef} className="py-8 md:py-10 bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Real-Time Results</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {finalStats.map((stat, index) => (
              <div 
                key={index} 
                className="glass-card p-4 md:p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 animate-entrance"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-primary/10">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{stat.title}</h3>
                <div className="flex items-center justify-center gap-1 h-12"> {/* Fixed height to prevent layout shift */}
                  {stat.prefix && <span className="text-3xl font-bold">{stat.prefix}</span>}
                  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {countValues[index].toLocaleString()}
                  </span>
                  {stat.suffix && <span className="text-3xl font-bold">{stat.suffix}</span>}
                </div>
                {stat.description && <p className="text-sm text-foreground/70 mt-1">{stat.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeResults;
