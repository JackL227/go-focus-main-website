import React, { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
interface TimelineItem {
  name: string;
  action: string;
  time: string;
}
interface NameCardTimelineProps {
  items?: TimelineItem[];
}
const defaultItems: TimelineItem[] = [{
  name: "Alex M.",
  action: "Booked a call",
  time: "2 minutes ago"
}, {
  name: "Sarah L.",
  action: "Booked a call",
  time: "5 minutes ago"
}, {
  name: "John D.",
  action: "Booked a call",
  time: "12 minutes ago"
}, {
  name: "Emma W.",
  action: "Booked a call",
  time: "18 minutes ago"
}, {
  name: "Robert K.",
  action: "Booked a call",
  time: "24 minutes ago"
}];
const NameCardTimeline: React.FC<NameCardTimelineProps> = ({
  items = defaultItems
}) => {
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
          newVisibleItems = [...items.slice(nextIndex), ...items.slice(0, endIndex - items.length)];
        }
        setVisibleItems(newVisibleItems);
        return nextIndex;
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [items]);
  return <div className="py-4 bg-background relative overflow-hidden">
      <div className="container-custom">
        
      </div>
    </div>;
};
export default NameCardTimeline;