'use client';
import { AddEventForm } from '@/components/add-event-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AddEventPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <div className="absolute inset-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(0,255,255,0.15)_0%,_rgba(0,0,0,0)_60%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background"></div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-transparent">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold">Add New Event</h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">&larr; Back to Dashboard</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8 z-10">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <AddEventForm />
          </div>
        </div>
      </main>
    </div>
  );
}
