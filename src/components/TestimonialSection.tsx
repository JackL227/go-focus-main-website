
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-trader-blue mb-4">Trader Success Stories</h2>
          <p className="text-trader-gray max-w-2xl mx-auto">
            Don't just take my word for it. Here's what traders who've completed the mentorship program have to say.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md relative">
            <div className="absolute top-4 right-4 text-trader-accent opacity-30">
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
              <div className="w-12 h-12 bg-trader-blue/20 rounded-full flex items-center justify-center text-trader-blue font-bold">
                MK
              </div>
              <div>
                <h4 className="font-medium text-trader-blue">Michael K.</h4>
                <p className="text-sm text-trader-gray">Forex Trader, 8 months in program</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md relative">
            <div className="absolute top-4 right-4 text-trader-accent opacity-30">
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
              <div className="w-12 h-12 bg-trader-blue/20 rounded-full flex items-center justify-center text-trader-blue font-bold">
                SJ
              </div>
              <div>
                <h4 className="font-medium text-trader-blue">Sarah J.</h4>
                <p className="text-sm text-trader-gray">Stock Trader, 12 months in program</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md relative">
            <div className="absolute top-4 right-4 text-trader-accent opacity-30">
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
              <div className="w-12 h-12 bg-trader-blue/20 rounded-full flex items-center justify-center text-trader-blue font-bold">
                RL
              </div>
              <div>
                <h4 className="font-medium text-trader-blue">Robert L.</h4>
                <p className="text-sm text-trader-gray">Crypto Trader, 6 months in program</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Overview */}
        <div className="mt-16 bg-trader-blue rounded-lg p-8 shadow-lg text-white">
          <h3 className="text-2xl mb-8 text-center">Program Results</h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">80%</div>
              <p className="text-sm opacity-80">of mentees report improved trading consistency within 3 months</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">65%</div>
              <p className="text-sm opacity-80">average reduction in psychological trading errors</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">94%</div>
              <p className="text-sm opacity-80">mentee satisfaction rating</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <p className="text-sm opacity-80">successful traders mentored to date</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
