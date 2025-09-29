import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from '@/lib/placeholder-images';

type TeamMemberCardProps = {
  name: string;
  role: string;
  image: string;
};

export function TeamMemberCard({ name, role, image }: TeamMemberCardProps) {
    const placeholder = PlaceHolderImages.find(p => p.id === image);

  return (
    <Card className="text-center overflow-hidden group shadow-md transition-shadow hover:shadow-xl">
      <div className="relative h-48 w-full">
         {placeholder && (
            <Image
                src={placeholder.imageUrl}
                alt={`Photo of ${name}`}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={placeholder.imageHint}
            />
         )}
      </div>
      <CardContent className="p-4 bg-background">
        <h3 className="text-lg font-semibold font-headline">{name}</h3>
        <p className="text-sm text-accent font-medium">{role}</p>
      </CardContent>
    </Card>
  );
}
