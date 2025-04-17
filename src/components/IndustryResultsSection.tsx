
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, TrendingUp, Clock, MessageCircle } from 'lucide-react';

const IndustryResultsSection = () => {
  return (
    <section id="results" className="py-20 container mx-auto px-4 md:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry-Specific Results</h2>
        <p className="text-muted-foreground text-lg">
          Our AI agents are tailored to your industry, delivering results that matter for your specific business.
        </p>
      </div>
      
      <Tabs defaultValue="trading" className="w-full max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="trading">Trading Mentors</TabsTrigger>
            <TabsTrigger value="medspa">Med Spas</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle Aesthetics</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Trading Mentors Tab */}
        <TabsContent value="trading" className="mt-0">
          <Card className="glass-card border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">For Trading Mentors</h3>
                  <p className="text-muted-foreground mb-6">
                    AI agents that qualify serious students and handle the repetitive questions that drain your time.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">+30 Booked Consults/Month</h4>
                        <p className="text-muted-foreground text-sm">More qualified calls with serious prospects</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">24/7 DM Handling</h4>
                        <p className="text-muted-foreground text-sm">Never miss an opportunity, even while you sleep</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">No More Wasted DMs</h4>
                        <p className="text-muted-foreground text-sm">Filter out time-wasters and focus on serious students</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4 text-gradient-blue">150%</div>
                    <p className="text-xl">Increase in Qualified Leads</p>
                    <div className="mt-6 pt-6 border-t border-border/30">
                      <p className="text-sm text-muted-foreground italic">
                        "Go Focus AI has transformed my business. I'm now booking 3x more consults while spending less time on qualification calls."
                      </p>
                      <p className="text-sm mt-2">— Alex T., Forex Trading Coach</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Med Spa Tab */}
        <TabsContent value="medspa" className="mt-0">
          <Card className="glass-card border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">For Med Spas</h3>
                  <p className="text-muted-foreground mb-6">
                    AI agents that answer common treatment questions and book consultations without interrupting your practice.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">45% Increase in Lead-to-Appointment</h4>
                        <p className="text-muted-foreground text-sm">More bookings from your existing lead flow</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Automated Follow-ups</h4>
                        <p className="text-muted-foreground text-sm">Keep leads warm with perfectly timed messages</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">No Missed Calls</h4>
                        <p className="text-muted-foreground text-sm">Capture every opportunity, even after hours</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4 text-gradient-blue">3.2x</div>
                    <p className="text-xl">Return on Investment</p>
                    <div className="mt-6 pt-6 border-t border-border/30">
                      <p className="text-sm text-muted-foreground italic">
                        "Our AI assistant answers pricing questions instantly and has helped us increase our conversion rate dramatically."
                      </p>
                      <p className="text-sm mt-2">— Sarah L., Med Spa Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Vehicle Aesthetics Tab */}
        <TabsContent value="vehicle" className="mt-0">
          <Card className="glass-card border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">For Vehicle Aesthetics</h3>
                  <p className="text-muted-foreground mb-6">
                    AI agents that provide instant quotes and answer technical questions while you focus on craftsmanship.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">5x Faster Quote Replies</h4>
                        <p className="text-muted-foreground text-sm">Instant responses to customer inquiries</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Visual AI Estimates</h4>
                        <p className="text-muted-foreground text-sm">Preliminary quotes based on customer photos</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 feature-icon-wrapper">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Higher Appointment Conversion</h4>
                        <p className="text-muted-foreground text-sm">Convert more inquiries to in-shop visits</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4 text-gradient-blue">67%</div>
                    <p className="text-xl">More Scheduled Appointments</p>
                    <div className="mt-6 pt-6 border-t border-border/30">
                      <p className="text-sm text-muted-foreground italic">
                        "We were losing business by not responding fast enough. Now our AI handles all inquiries instantly."
                      </p>
                      <p className="text-sm mt-2">— Mike R., Vehicle Wrap Shop Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default IndustryResultsSection;
