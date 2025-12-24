import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  firstName: z.string().max(100, "First name must be less than 100 characters").optional().or(z.literal('')),
  lastName: z.string().max(100, "Last name must be less than 100 characters").optional().or(z.literal('')),
  phone: z.string().min(1, { message: "Phone number is required" }).max(20, "Phone must be less than 20 characters"),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, "Email must be less than 255 characters"),
  smsConsent: z.boolean().optional(),
  marketingConsent: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ProjectInquiry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      smsConsent: false,
      marketingConsent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Inquiry Submitted",
        description: "Thank you! We'll get back to you within 24 hours.",
      });
      
      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Project Inquiry | GoFocus AI</title>
        <meta name="description" content="Submit your AI project inquiry to GoFocus AI. Let us help you automate lead generation, client follow-up, and call booking processes." />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom max-w-xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
              Project Inquiry
            </h1>
            <p className="text-lg text-foreground/80">
              Share your information and we'll have our experts get back to you within 24 hours to discuss your project inquiry
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="First Name" 
                          {...field} 
                          className="bg-background border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Last Name" 
                          {...field} 
                          className="bg-background border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Phone <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Phone" 
                          type="tel"
                          {...field} 
                          className="bg-background border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email (Required) */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Email <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Email" 
                          type="email"
                          {...field} 
                          className="bg-background border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SMS Consent Checkbox */}
                <FormField
                  control={form.control}
                  name="smsConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label className="text-sm text-foreground/80 font-normal cursor-pointer leading-relaxed">
                          I Consent to Receive SMS Notifications, Alerts from IA GFOCUS INC.
                          <br />
                          Message frequency varies. Message & data rates may apply.
                          <br />
                          Text HELP to 514-566-7802 for assistance.
                          <br />
                          You can reply STOP to unsubscribe at any time.
                        </Label>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Marketing Consent Checkbox */}
                <FormField
                  control={form.control}
                  name="marketingConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label className="text-sm text-foreground/80 font-normal cursor-pointer leading-relaxed">
                          By checking this box I agree to receive occasional marketing messages from IA GFOCUS INC.
                          <br />
                          Message & data rates may apply.
                        </Label>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>

                {/* Footer Links */}
                <div className="text-center pt-4">
                  <Link 
                    to="/privacy-policy" 
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-foreground/40 mx-2">|</span>
                  <Link 
                    to="/terms-of-service" 
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProjectInquiry;
