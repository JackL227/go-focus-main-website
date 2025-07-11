
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeText, sanitizeEmail, validateBusinessType } from '@/utils/sanitization';

const Settings = () => {
  const { user, userProfile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessType: ''
  });

  useEffect(() => {
    if (user && userProfile) {
      setFormData({
        fullName: userProfile.full_name || '',
        email: user.email || '',
        businessType: userProfile.business_type || ''
      });
    }
  }, [user, userProfile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      // Sanitize inputs
      const sanitizedFullName = sanitizeText(formData.fullName);
      const sanitizedBusinessType = sanitizeText(formData.businessType);
      
      // Validation
      if (!sanitizedFullName || sanitizedFullName.length < 2) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Full name must be at least 2 characters long."
        });
        return;
      }
      
      if (sanitizedBusinessType && !validateBusinessType(sanitizedBusinessType) && sanitizedBusinessType !== 'other') {
        // Allow 'other' or custom business types for flexibility
        console.log('Custom business type:', sanitizedBusinessType);
      }
      
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: sanitizedFullName,
          business_type: sanitizedBusinessType
        })
        .eq('id', user.id);

      if (error) throw error;
      
      // Refresh the profile data
      await refreshProfile();
      
      toast({
        title: "Success",
        description: "Your profile has been updated."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Update your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                disabled 
              />
              <p className="text-sm text-muted-foreground">
                Email cannot be changed directly. Please contact support.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={isSaving}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Input 
                id="businessType" 
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                disabled={isSaving}
                maxLength={50}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              To reset your password, please use the "Forgot password" option on the login screen.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Password reset",
                  description: "Password reset functionality will be implemented soon."
                });
              }}
              disabled
            >
              Reset Password (Coming Soon)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
