import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from '@/lib/placeholder-images';

type AchievementCardProps = {
  title: string;
  year: string;
  description: string;
  image: string;
};

export function AchievementCard({ title, year, description, image }: AchievementCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === image);

  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 p-6 h-full overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl bg-card border-border/50 hover:shadow-primary/20 group">
      {placeholder && (
        <div className="relative h-48 md:h-full md:w-1/3 w-full shrink-0 rounded-lg overflow-hidden">
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholder.imageHint}
          />
        </div>
      )}
      <div className="flex-grow">
        <CardHeader className="p-0">
          <Badge variant="secondary" className="w-fit mb-2 bg-secondary/50 text-secondary-foreground">{year}</Badge>
          <CardTitle className="font-bold text-xl flex-grow">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <p className="text-muted-foreground text-base">{description}</p>
        </CardContent>
      </div>
    </Card>
  );
}
