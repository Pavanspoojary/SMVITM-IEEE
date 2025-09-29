'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { useRouter }from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { summarizeEventDetails } from '@/ai/flows/summarize-event-details';
import { sendEventNotificationEmail } from '@/ai/flows/send-event-notification-email';


const eventFormSchema = z.object({
  title: z.string().min(1, { message: 'Event title is required' }),
  date: z.date({
    required_error: "A date for the event is required.",
  }),
  venue: z.string().min(1, { message: 'Event venue is required' }),
  description: z.string().min(1, { message: 'Event description is required' }),
  // Photos are not handled yet.
  // photos: z.custom<FileList>().refine((files) => files.length > 0, 'At least one photo is required.'),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export function AddEventForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
  });

  const selectedDate = watch('date');

  const onSubmit = async (data: EventFormValues) => {
    setIsLoading(true);
    try {
      // 1. Generate AI summary
      const summaryResult = await summarizeEventDetails({ eventDetails: data.description });

      // 2. Save the event data to Firestore
      await addDoc(collection(db, 'events'), {
        title: data.title,
        date: data.date,
        venue: data.venue,
        description: data.description,
        summary: summaryResult.summary,
        createdAt: new Date(),
      });
      
      // 3. Trigger notification flow
      await sendEventNotificationEmail({
        title: data.title,
        date: format(data.date, "PPP"),
        venue: data.venue,
        summary: summaryResult.summary,
      });

      console.log('Event data:', data);


      toast({
        title: 'Event Created Successfully',
        description: `The event "${data.title}" has been added and members have been notified.`,
      });

      router.push('/dashboard');
      
    } catch (error: any) {
      console.error('Error creating event:', error);
      toast({
        variant: 'destructive',
        title: 'Error Creating Event',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Event</CardTitle>
        <CardDescription>Fill in the details below to add a new event to the website.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" {...register('title')} disabled={isLoading} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
             <Label htmlFor="date">Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(day) => day && setValue('date', day)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input id="venue" {...register('venue')} disabled={isLoading} />
            {errors.venue && <p className="text-sm text-destructive">{errors.venue.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} disabled={isLoading} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="photos">Event Photographs</Label>
            <Input id="photos" type="file" multiple disabled={isLoading} accept="image/*" />
            {/* {errors.photos && <p className="text-sm text-destructive">{errors.photos.message as string}</p>} */}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating Event...' : 'Create Event'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
