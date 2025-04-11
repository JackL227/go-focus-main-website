
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="section bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-trader-accent text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-gradient-blue mb-4">Trader Success Stories</h2>
          <p className="text-trader-gray max-w-2xl mx-auto">
            Don't just take my word for it. Here's what traders who've completed the mentorship program have to say.
          </p>
        </div>
        
        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Testimonial 1 */}
          <div className="glass-card p-8 shadow-md relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
            
            <div className="absolute top-4 right-4 text-trader-accent opacity-30 group-hover:scale-110 transition-transform">
              <Quote size={40} />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-trader-accent text-trader-accent" />
              ))}
            </div>
            
            <p className="text-trader-gray-dark mb-6 relative z-10">
              "Before this mentorship, I was constantly second-guessing my trades and making emotional decisions. 
              Now I have a clear strategy and the confidence to execute it consistently. My win rate has increased 
              from 40% to 68% in just three months."
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trader-blue/30 to-trader-blue-light/30 rounded-full flex items-center justify-center text-trader-blue font-bold">
                MK
              </div>
              <div>
                <h4 className="font-medium text-trader-blue">Michael K.</h4>
                <p className="text-sm text-trader-gray">Forex Trader, 8 months in program</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="glass-card p-8 shadow-md relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-green-100 rounded-full opacity-70"></div>
            
            <div className="absolute top-4 right-4 text-trader-accent opacity-30 group-hover:scale-110 transition-transform">
              <Quote size={40} />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-trader-accent text-trader-accent" />
              ))}
            </div>
            
            <p className="text-trader-gray-dark mb-6 relative z-10">
              "The risk management strategies alone were worth the investment. I was blowing accounts before, 
              but John taught me how to properly size positions and manage risk. I'm finally seeing consistent 
              growth in my trading account instead of the rollercoaster I was on before."
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trader-green/30 to-trader-green-light/30 rounded-full flex items-center justify-center text-trader-green font-bold">
                SJ
              </div>
              <div>
                <h4 className="font-medium text-trader-green">Sarah J.</h4>
                <p className="text-sm text-trader-gray">Stock Trader, 12 months in program</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="glass-card p-8 shadow-md relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-amber-100 rounded-full opacity-70"></div>
            
            <div className="absolute top-4 right-4 text-trader-accent opacity-30 group-hover:scale-110 transition-transform">
              <Quote size={40} />
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-trader-accent text-trader-accent" />
              ))}
            </div>
            
            <p className="text-trader-gray-dark mb-6 relative z-10">
              "I've taken countless trading courses, but nothing compares to the personalized guidance from this 
              mentorship. The psychological aspects were eye-opening - I didn't realize how much my mindset was 
              affecting my results. Now I trade with clarity and discipline."
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trader-accent/30 to-yellow-400/30 rounded-full flex items-center justify-center text-trader-accent font-bold">
                RL
              </div>
              <div>
                <h4 className="font-medium text-trader-accent">Robert L.</h4>
                <p className="text-sm text-trader-gray">Crypto Trader, 6 months in program</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Overview */}
        <div className="bg-gradient-to-r from-trader-blue to-trader-blue-light rounded-2xl p-10 shadow-lg text-white overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-white rounded-full"></div>
          </div>
          
          <h3 className="text-2xl mb-8 text-center font-bold">Program Results</h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '100ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">80%</div>
              <p className="text-sm opacity-90">of mentees report improved trading consistency within 3 months</p>
            </div>
            
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '200ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">65%</div>
              <p className="text-sm opacity-90">average reduction in psychological trading errors</p>
            </div>
            
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '300ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">94%</div>
              <p className="text-sm opacity-90">mentee satisfaction rating</p>
            </div>
            
            <div className="text-center relative z-10 animate-slide-in-bottom opacity-0" style={{animationFillMode: 'forwards', animationDelay: '400ms'}}>
              <div className="text-4xl font-bold mb-2 text-white">200+</div>
              <p className="text-sm opacity-90">successful traders mentored to date</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
