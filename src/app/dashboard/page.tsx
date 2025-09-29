'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // or a message telling to login. The hook handles redirection.
  }

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <div className="absolute inset-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(0,255,255,0.15)_0%,_rgba(0,0,0,0)_60%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background"></div>
      </div>
       <header className="sticky top-0 z-40 border-b bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold">Member Dashboard</h1>
            <Button onClick={signOut} variant="outline">Logout</Button>
        </div>
       </header>

      <main className="flex-1 p-4 md:p-8 z-10">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Space</h2>
            <Button asChild>
              <Link href="/dashboard/add-event">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Event
              </Link>
            </Button>
          </div>
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Welcome, {user.displayName || user.email}</CardTitle>
                    <CardDescription>This is your member dashboard. More features coming soon!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Here you will be able to manage events and other branch activities.</p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
