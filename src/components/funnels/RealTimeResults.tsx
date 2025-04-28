
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Calendar } from 'lucide-react';

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

const RealTimeResults: React.FC<RealTimeResultsProps> = ({ stats = defaultStats }) => {
  const [countValues, setCountValues] = useState<number[]>(stats.map(() => 0));
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (!isInView) return;

    const timers = stats.map((stat, index) => {
      let startValue = 0;
      const endValue = stat.value;
      const duration = 2000; // 2 seconds for animation
      const frameRate = 30; // Update 30 times per second
      const totalFrames = duration / (1000 / frameRate);
      const incrementPerFrame = endValue / totalFrames;

      return setInterval(() => {
        if (startValue >= endValue) {
          setCountValues(prev => {
            const newValues = [...prev];
            newValues[index] = endValue;
            return newValues;
          });
          clearInterval(timers[index]);
          return;
        }

        startValue += incrementPerFrame;
        setCountValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.min(Math.floor(startValue), endValue);
          return newValues;
        });
      }, 1000 / frameRate);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [isInView, stats]);

  return (
    <section ref={containerRef} className="py-12 bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Real-Time Results</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 animate-entrance"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-primary/10">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{stat.title}</h3>
                <div className="flex items-center justify-center gap-1">
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
