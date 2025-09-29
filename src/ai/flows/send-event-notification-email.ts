'use server';

/**
 * @fileOverview A flow to notify all members about a new event.
 * 
 * - sendEventNotificationEmail - A function that gets all users and logs the email content.
 * - EventNotificationInput - The input type for the sendEventNotificationEmail function.
 */

import { ai } from '@/ai/genkit';
import { getAllUsers } from '@/services/user-service';
import { z } from 'genkit';

export const EventNotificationInputSchema = z.object({
  title: z.string().describe('The title of the event.'),
  date: z.string().describe('The date of the event.'),
  venue: z.string().describe('The venue of the event.'),
  summary: z.string().describe('A summary of the event.'),
});

export type EventNotificationInput = z.infer<typeof EventNotificationInputSchema>;

export async function sendEventNotificationEmail(input: EventNotificationInput): Promise<void> {
    await sendEventNotificationEmailFlow(input);
}

const emailPrompt = ai.definePrompt({
    name: 'eventEmailPrompt',
    input: { schema: EventNotificationInputSchema },
    prompt: `
      Generate a friendly and exciting email to notify members about an upcoming IEEE event.

      Event Details:
      - Title: {{{title}}}
      - Date: {{{date}}}
      - Venue: {{{venue}}}
      - Summary: {{{summary}}}

      The email should be enthusiastic and encourage members to attend.
    `,
});


const sendEventNotificationEmailFlow = ai.defineFlow(
  {
    name: 'sendEventNotificationEmailFlow',
    inputSchema: EventNotificationInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const users = await getAllUsers();
    const { text } = await emailPrompt(input);
    const emailContent = text;

    console.log(`Generated Email Content:\n${emailContent}`);

    // In a real application, you would integrate an email service here.
    // For now, we will just log the intended recipients and the email content.
    for (const user of users) {
      console.log(`[Notification] Staging email for ${user.email} about event: "${input.title}"`);
      // Example of what you might do with an email service:
      // await emailService.send({
      //   to: user.email,
      //   subject: `Upcoming IEEE Event: ${input.title}`,
      //   body: emailContent,
      // });
    }
  }
);
