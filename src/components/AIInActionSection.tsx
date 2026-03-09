import React from 'react';
import { motion } from 'framer-motion';
import HeroAnimation from './hero-animation/HeroAnimation';

const stats = [
  { stat: '< 30s', label: 'Response time to every lead' },
  { stat: '24/7', label: 'Always-on AI follow-up' },
  { stat: '3.2x', label: 'Average conversion increase' },
];

const AIInActionSection = () => {
  return (
    <section className="section border-t border-white/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="section-label">
            <span>Live Demo</span>
          </div>
          <h2 className="mb-6">
            Your AI agent works<br className="hidden md:block" /> while you sleep
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every lead gets an immediate, personalized response — qualified, nurtured, and booked into your calendar automatically, around the clock.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="max-w-4xl mx-auto"
        >
          {/* Animation frame — hover to pause */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
            <HeroAnimation />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-5 md:mt-6">
            {stats.map(({ stat, label }, index) => (
              <motion.div
                key={stat}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.06 }}
                className="text-center bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 md:p-5"
              >
                <p
                  className="text-lg md:text-2xl font-semibold text-white mb-1"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIInActionSection;
