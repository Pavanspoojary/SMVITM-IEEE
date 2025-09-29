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
    <Card className="group transition-all duration-300 ease-in-out hover:bg-card hover:shadow-primary/20 border-border/50 shadow-md">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <CardContent className="p-4 md:p-6 grid grid-cols-[auto_1fr_auto] items-center gap-6">
          <div className="text-primary pr-4 hidden md:block">
            <Book className="h-8 w-8" />
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{authors}</p>
            <p className="text-xs text-muted-foreground mt-2">{conference}</p>
          </div>
          <div className="flex items-center justify-end">
             <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground group-hover:text-primary group-hover:bg-accent/10 transition-all duration-300 ease-in-out rounded-full">
                <ArrowUpRight className="h-6 w-6 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </a>
    </Card>
  );
}
