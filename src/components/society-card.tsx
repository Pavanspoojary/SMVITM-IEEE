import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from '@/lib/placeholder-images';

type SocietyCardProps = {
  name: string;
  description: string;
  image: string;
};

export function SocietyCard({ name, description, image }: SocietyCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === image);

  return (
    <Card className="glass-card flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 group">
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
        <CardTitle className="font-bold text-lg flex-grow">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
