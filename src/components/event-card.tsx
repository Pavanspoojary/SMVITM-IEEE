import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";

type EventCardProps = {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
};

export function EventCard({ title, date, time, venue, description }: EventCardProps) {
  return (
    <Card className="flex flex-col h-full transition-transform transform hover:-translate-y-1 hover:shadow-xl bg-background">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{venue}</span>
          </div>
        </div>
        <CardDescription className="flex-grow pt-2">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
