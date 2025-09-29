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


const eventFormSchema = z.object({
  title: z.string().min(1, { message: 'Event title is required' }),
  date: z.date({
    required_error: "A date for the event is required.",
  }),
  venue: z.string().min(1, { message: 'Event venue is required' }),
  description: z.string().min(1, { message: 'Event description is required' }),
  photos: z.custom<FileList>().refine((files) => files.length > 0, 'At least one photo is required.'),
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
      // Here you would handle the file upload to a service like Firebase Storage
      // and then save the event data (including image URLs) to your database.
      console.log('Event data:', data);

      // Simulate API call and upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Event Created Successfully',
        description: `The event "${data.title}" has been added.`,
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
            <Input id="photos" type="file" {...register('photos')} multiple disabled={isLoading} accept="image/*" />
            {errors.photos && <p className="text-sm text-destructive">{errors.photos.message as string}</p>}
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
