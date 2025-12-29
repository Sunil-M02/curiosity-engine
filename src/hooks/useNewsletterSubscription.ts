import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UseNewsletterSubscriptionOptions {
  sourcePage: string;
}

interface UseNewsletterSubscriptionReturn {
  email: string;
  setEmail: (email: string) => void;
  error: string;
  clearError: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export function useNewsletterSubscription({ 
  sourcePage 
}: UseNewsletterSubscriptionOptions): UseNewsletterSubscriptionReturn {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const clearError = () => setError('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }
    
    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: trimmedEmail,
          source_page: sourcePage,
        });
      
      if (insertError) {
        if (insertError.code === '23505') {
          // Duplicate email - treat as success
          setIsSuccess(true);
        } else {
          throw insertError;
        }
      } else {
        setIsSuccess(true);
      }
      
      setEmail('');
    } catch (err: any) {
      console.error('Newsletter subscription error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    error,
    clearError,
    isSubmitting,
    isSuccess,
    handleSubmit,
  };
}
