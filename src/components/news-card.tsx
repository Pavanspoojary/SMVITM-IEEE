import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from '@/lib/placeholder-images';

type NewsCardProps = {
  title: string;
  date: string;
  summary: string;
  image: string;
};

export function NewsCard({ title, date, summary, image }: NewsCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === image);

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-xl bg-card border-border/50 hover:shadow-primary/20 group">
      {placeholder && (
        <div className="relative h-48 w-full">
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholder.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-bold text-lg">{title}</CardTitle>
        <Badge variant="secondary" className="w-fit mt-2 bg-secondary/50 text-secondary-foreground">{date}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{summary}</p>
      </CardContent>
    </Card>
  );
}
