import React from 'react';
import { FileText, Megaphone, Users, BarChart2, Zap, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const systems = [
  { icon: FileText, label: 'SOPs & Playbooks' },
  { icon: Megaphone, label: 'Meta Ads' },
  { icon: Users, label: 'Client Acquisition' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: Zap, label: 'Automations' },
  { icon: Headphones, label: '1-on-1 Support' },
];

const ChannelsBar = () => {
  return (
    <section className="border-t border-white/5 py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground mb-10 tracking-wide">
            Everything you get when you partner with GoFocus AI
          </p>

          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {systems.map((system) => (
              <div
                key={system.label}
                className="flex flex-col items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <system.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{system.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChannelsBar;
