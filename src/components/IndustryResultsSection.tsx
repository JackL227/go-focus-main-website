import React from 'react';
import { motion } from 'framer-motion';

const results = [
  { id: "clients", industry: "Client Acquisition", stat: "12+", label: "new clients per month (avg)" },
  { id: "mrr", industry: "Revenue Growth", stat: "3.2x", label: "average MRR increase" },
  { id: "cpl", industry: "Cost Per Lead", stat: "$18", label: "average CPL on Meta" },
  { id: "roas", industry: "Ad Performance", stat: "5.7x", label: "average ROAS" },
  { id: "retention", industry: "Client Retention", stat: "94%", label: "client retention rate" },
  { id: "time-saved", industry: "Operations", stat: "20+ hrs", label: "saved weekly with our systems" },
];

const IndustryResultsSection = () => {
  return (
    <section id="results" className="section border-t border-white/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-label">
            <span>Results</span>
          </div>
          <h2 className="mb-6">
            Real numbers from real AI agencies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our clients consistently hit these benchmarks using our systems and ad management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05]"
            >
              <p className="text-sm font-medium text-muted-foreground mb-3">
                {result.industry}
              </p>
              <p className="text-4xl font-semibold text-white mb-1 tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {result.stat}
              </p>
              <p className="text-sm text-muted-foreground">
                {result.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryResultsSection;
