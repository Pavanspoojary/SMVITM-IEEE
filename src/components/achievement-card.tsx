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
    <Card className="flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl bg-card">
      {placeholder && (
        <div className="relative h-48 w-full">
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            fill
            className="object-cover"
            data-ai-hint={placeholder.imageHint}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-lg flex-grow">{title}</CardTitle>
        <Badge variant="secondary" className="w-fit mt-2">{year}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
