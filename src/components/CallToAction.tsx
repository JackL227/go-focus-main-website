
import React from 'react';
import { ArrowRight } from 'lucide-react';
import BookingWidget from './BookingWidget';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-24 md:py-32 border-t border-white/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12 lg:p-16"
        >
          <h2 className="mb-6">
            Ready to scale your AI agency?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Book a strategy call and we'll map out exactly how our systems and Meta ads management can help you hit your next revenue milestone.
          </p>
          <BookingWidget className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
            Book Your Strategy Call
            <ArrowRight className="h-4 w-4" />
          </BookingWidget>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
