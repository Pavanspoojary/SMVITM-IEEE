import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Book } from "lucide-react";
import { Button } from "./ui/button";

type PublicationCardProps = {
  title: string;
  authors: string;
  conference: string;
  link: string;
};

export function PublicationCard({ title, authors, conference, link }: PublicationCardProps) {
  return (
    <Card className="group transition-all duration-300 ease-in-out hover:bg-muted/50 hover:shadow-md">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <CardContent className="p-4 md:p-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <div className="text-primary pr-4 hidden md:block">
            <Book className="h-6 w-6" />
          </div>
          <div className="w-full">
            <h3 className="font-semibold font-headline text-base md:text-lg text-foreground group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{authors}</p>
            <p className="text-xs text-muted-foreground mt-2">{conference}</p>
          </div>
          <div className="flex items-center justify-end">
             <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground group-hover:text-primary group-hover:bg-accent/50 transition-all duration-300 ease-in-out">
                <ArrowUpRight className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}
