'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { ChromeIcon, FacebookIcon, TwitterIcon } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  ieeeId: z.string().min(1, { message: 'IEEE ID is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  keepLoggedIn: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: 'Login Successful', description: "You're now logged in." });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 relative">
       <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" className="text-foreground/80 hover:text-primary">
          <Link href="/">&larr; Back to Home</Link>
        </Button>
      </div>
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Panel */}
            <div className="hidden md:flex flex-col justify-between p-12 bg-card text-card-foreground">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-8xl font-black">W.</span>
                         <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            className="h-24 w-24"
                            >
                            <circle cx="50" cy="50" r="48" fill="hsl(var(--muted))" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" />
                            <circle cx="35" cy="40" r="5" fill="hsl(var(--primary))" />
                            <circle cx="65" cy="40" r="5" fill="hsl(var(--primary))" />
                            <path
                                d="M 30 65 Q 50 80 70 65"
                                stroke="hsl(var(--primary))"
                                strokeWidth="4"
                                fill="none"
                            />
                        </svg>
                    </div>
                </div>
                 <p className="text-sm text-muted-foreground">
                    Not a member yet?{' '}
                    <Link href="#" className="font-semibold text-primary hover:underline">
                        Register now
                    </Link>
                </p>
            </div>

            {/* Right Panel - Form */}
            <div className="bg-background p-8 md:p-12">
                 <h2 className="text-3xl font-bold mb-8 text-foreground">Log in</h2>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                        <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register('email')}
                            disabled={isLoading}
                            className="bg-muted/50 border-0 focus:bg-card"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="ieeeId" className="text-muted-foreground">IEEE ID</Label>
                        <Input
                            id="ieeeId"
                            type="text"
                            placeholder="Enter your IEEE ID"
                            {...register('ieeeId')}
                            disabled={isLoading}
                            className="bg-muted/50 border-0 focus:bg-card"
                        />
                        {errors.ieeeId && <p className="text-sm text-destructive">{errors.ieeeId.message}</p>}
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            disabled={isLoading}
                             className="bg-muted/50 border-0 focus:bg-card"
                        />
                        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                        </div>

                         <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="keep-logged-in" {...register('keepLoggedIn')} />
                                <Label htmlFor="keep-logged-in" className="text-sm font-normal text-muted-foreground">Keep me logged in</Label>
                            </div>
                             <Link href="#" className="text-sm text-primary hover:underline">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    
                    <Button type="submit" className="w-full mt-8 h-12 text-base font-bold bg-primary hover:bg-primary/90" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Log in now'}
                    </Button>
                 </form>

                 <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                        Or sign in with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-12 border-border/80 text-muted-foreground"> <ChromeIcon className="mr-2"/> Google</Button>
                    <Button variant="outline" className="h-12 border-border/80 text-muted-foreground"> <FacebookIcon className="mr-2"/> Facebook</Button>
                    <Button variant="outline" className="h-12 border-border/80 text-muted-foreground"> <TwitterIcon className="mr-2"/> Twitter</Button>
                </div>
                 <p className="mt-8 text-center text-sm text-muted-foreground md:hidden">
                    Not a member yet?{' '}
                    <Link href="#" className="font-semibold text-primary hover:underline">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
      </Card>
    </div>
  );
}

    