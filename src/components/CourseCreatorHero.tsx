import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Video, CheckCircle, ArrowRight } from 'lucide-react';
import BookingWidget from './BookingWidget';

const CourseCreatorHero = () => {
  const features = [
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      text: "24/7 Student Support"
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      text: "Lead Qualification"
    },
    {
      icon: <Video className="h-5 w-5 text-primary" />,
      text: "Completion Analytics"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
      text: "Sales Call Booking"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>For Course Creators</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your <span className="text-primary">Course Business</span> With AI
              </h1>
              
              <p className="text-xl text-foreground/80 max-w-lg">
                Our AI agent answers student questions 24/7, qualifies leads, and books sales calls 
                while you focus on creating great content.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-foreground/10 px-3 py-1.5 rounded-full"
                  >
                    {feature.icon}
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <BookingWidget 
                  className="bg-primary hover:bg-primary/90 text-background group"
                >
                  <span className="flex items-center">
                    Get My Personalised Demo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </BookingWidget>
                
                <BookingWidget 
                  variant="outline" 
                  className="border-primary/60 text-primary hover:bg-primary/10"
                >
                  Speak To An Expert
                </BookingWidget>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden md:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="bg-background/80 backdrop-blur-md border border-foreground/10 rounded-2xl p-6 shadow-xl">
                <div className="bg-primary/10 text-primary rounded-lg p-3 mb-4 inline-flex">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Course Completion Rate</h3>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-4xl font-bold">+72%</span>
                  <span className="text-green-500 text-sm">↑ 23% from last month</span>
                </div>
                
                <div className="h-2 bg-primary/20 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary rounded-full" style={{ width: '72%' }}></div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="bg-foreground/5 rounded-lg p-3">
                      <div className="text-sm text-foreground/70">{["Enrolled", "Active", "Completed"][idx]}</div>
                      <div className="text-xl font-bold">{[124, 96, 89][idx]}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Common Student Questions</h4>
                  {["How do I access module 3?", "When is the next live Q&A?", "Can I get feedback on my project?"].map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm bg-foreground/5 p-2 rounded">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span>{q}</span>
                      <div className="ml-auto text-xs text-foreground/50">{[12, 8, 5][idx]} times</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat bubble */}
              <div className="absolute top-1/3 right-[-80px] bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-lg p-3 shadow-xl max-w-[200px]">
                <div className="flex gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    AI
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">Course AI</div>
                    <div className="text-foreground/70">Just now</div>
                  </div>
                </div>
                <p className="text-sm">I've answered 47 student questions today and booked 3 sales calls with qualified prospects.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCreatorHero;
