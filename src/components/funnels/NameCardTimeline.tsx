import React, { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

interface TimelineItem {
  name: string;
  action: string;
  time: string;
  avatar?: string;
}

interface NameCardTimelineProps {
  items?: TimelineItem[];
}

const defaultItems: TimelineItem[] = [
  { name: "Alex M.", action: "Watched 3 minutes", time: "2 minutes ago" },
  { name: "Sarah L.", action: "Booked a call", time: "5 minutes ago" },
  { name: "John D.", action: "Watched 4 minutes", time: "12 minutes ago" },
  { name: "Emma W.", action: "Booked a call", time: "18 minutes ago" },
  { name: "Robert K.", action: "Watched 2 minutes", time: "24 minutes ago" }
];

const NameCardTimeline: React.FC<NameCardTimelineProps> = ({ items = defaultItems }) => {
  const [visibleItems, setVisibleItems] = useState<TimelineItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Show first 3 items initially
    setVisibleItems(items.slice(0, Math.min(3, items.length)));
    
    // Rotate through items
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % items.length;
        
        // Keep showing 3 items at a time, rotating through the list
        const endIndex = nextIndex + 3;
        let newVisibleItems: TimelineItem[];
        
        if (endIndex <= items.length) {
          newVisibleItems = items.slice(nextIndex, endIndex);
        } else {
          // Wrap around to the beginning of the array
          newVisibleItems = [
            ...items.slice(nextIndex),
            ...items.slice(0, endIndex - items.length)
          ];
        }
        
        setVisibleItems(newVisibleItems);
        return nextIndex;
      });
    }, 5000); // Rotate every 5 seconds
    
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="py-4 bg-background relative overflow-hidden">
      <div className="container-custom">
        <div className="flex justify-center items-center overflow-hidden">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {visibleItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="animate-entrance bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-lg p-3 shadow-sm flex items-center max-w-[200px] transform transition-all duration-500 hover:shadow-md"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  {item.action.includes("Booked") ? (
                    <Calendar className="h-4 w-4 text-primary" />
                  ) : (
                    <Clock className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-foreground/70">{item.action}</p>
                  <p className="text-xs text-foreground/50">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameCardTimeline;
