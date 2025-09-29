'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // or a message telling to login. The hook handles redirection.
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
       <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold">Member Dashboard</h1>
            <Button onClick={signOut} variant="outline">Logout</Button>
        </div>
       </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user.email}</CardTitle>
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
