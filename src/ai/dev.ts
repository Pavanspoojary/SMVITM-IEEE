import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-event-details.ts';
import '@/ai/flows/send-event-notification-email.ts';
