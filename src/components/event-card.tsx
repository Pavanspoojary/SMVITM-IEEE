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
    <Card className="glass-card flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-foreground">{title}</CardTitle>
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
        <CardDescription className="flex-grow pt-4 text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
