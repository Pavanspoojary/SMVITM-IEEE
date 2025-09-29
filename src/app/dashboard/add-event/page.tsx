'use client';
import { AddEventForm } from '@/components/add-event-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AddEventPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold">Add New Event</h1>
          <Button asChild variant="outline">
            <Link href="/dashboard">&larr; Back to Dashboard</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <AddEventForm />
          </div>
        </div>
      </main>
    </div>
  );
}
