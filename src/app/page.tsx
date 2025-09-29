import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { events } from '@/app/data/events';
import { news } from '@/app/data/news';
import { teamMembers } from '@/app/data/team';
import { achievements } from '@/app/data/achievements';
import { publications } from '@/app/data/publications';
import { EventCard } from '@/components/event-card';
import { NewsCard } from '@/components/news-card';
import { TeamMemberCard } from '@/components/team-member-card';
import { AchievementCard } from '@/components/achievement-card';
import { PublicationCard } from '@/components/publication-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white bg-primary">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",}}
                data-ai-hint="engineering circuit board"
            ></div>
             <div className="absolute inset-0 bg-primary/50 "></div>
          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight mb-4 animate-fade-in-down">
              SMVITM-IEEE Student Branch
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80 mb-8 animate-fade-in-up">
              Fostering Technological Innovation and Excellence
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-in">
              Join Us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-primary">About SMVITM-IEEE</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The IEEE Student Branch at SMVITM is one of the most active student branches in the Mangalore Subsection. We are dedicated to providing students with opportunities for technical and professional development.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We organize a wide range of events, including workshops, seminars, competitions, and industrial visits, to help students stay updated with the latest trends in technology and engineering. Our mission is to inspire innovation, encourage collaboration, and build a community of passionate learners.
                </p>
                <Button variant="link" className="text-accent p-0 h-auto font-semibold">
                  Learn more about IEEE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                {aboutImage && (
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={aboutImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
              Upcoming Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
              Our Achievements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
              Recent Publications
            </h2>
            <div className="space-y-8">
              {publications.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
              News & Announcements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <NewsCard key={index} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
