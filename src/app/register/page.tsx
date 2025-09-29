'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const registerSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  ieeeId: z.string().email({ message: 'Please enter a valid email for the IEEE ID.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      ieeeId: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.ieeeId, data.password);
      await updateProfile(userCredential.user, {
        displayName: data.name
      });
      toast({ title: 'Registration Successful', description: "You can now log in." });
      router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
      <div className="absolute inset-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(0,255,255,0.15)_0%,_rgba(0,0,0,0)_60%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background"></div>
      </div>
       <div className="absolute top-4 left-4 z-10">
        <Button asChild variant="ghost" className="text-foreground/80 hover:text-primary">
          <Link href="/">&larr; Back to Home</Link>
        </Button>
      </div>
      <Card className="w-full max-w-lg overflow-hidden shadow-2xl rounded-2xl z-10 glass-card">
            <div className="bg-background/50 p-8 md:p-12">
                 <h2 className="text-3xl font-bold mb-8 text-foreground">Create an Account</h2>
                 <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                   <FormField
                       control={form.control}
                       name="name"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-muted-foreground">Full Name</FormLabel>
                           <FormControl>
                             <Input
                               type="text"
                               placeholder="John Doe"
                               {...field}
                               disabled={isLoading}
                               className="bg-muted/50 border-0 focus:bg-card"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="ieeeId"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-muted-foreground">IEEE ID (Email)</FormLabel>
                           <FormControl>
                             <Input
                               type="email"
                               placeholder="m@example.com"
                               {...field}
                               disabled={isLoading}
                               className="bg-muted/50 border-0 focus:bg-card"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="password"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-muted-foreground">Password</FormLabel>
                           <FormControl>
                             <Input
                               type="password"
                               placeholder="******"
                               {...field}
                               disabled={isLoading}
                               className="bg-muted/50 border-0 focus:bg-card"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     
                     <Button type="submit" className="w-full mt-8 h-12 text-base font-bold bg-primary hover:bg-primary/90" disabled={isLoading}>
                         {isLoading ? 'Creating Account...' : 'Register'}
                     </Button>
                   </form>
                 </Form>

                 <p className="mt-8 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
      </Card>
    </div>
  );
}
