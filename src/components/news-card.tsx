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
    <Card className="overflow-hidden transition-shadow hover:shadow-xl bg-card">
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
        <CardTitle className="font-headline text-lg">{title}</CardTitle>
        <Badge variant="secondary" className="w-fit mt-2">{date}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{summary}</p>
      </CardContent>
    </Card>
  );
}
