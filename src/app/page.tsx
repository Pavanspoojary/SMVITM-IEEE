import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { events } from '@/app/data/events';
import { news } from '@/app/data/news';
import { achievements } from '@/app/data/achievements';
import { publications } from '@/app/data/publications';
import { EventCard } from '@/components/event-card';
import { NewsCard } from '@/components/news-card';
import { AchievementCard } from '@/components/achievement-card';
import { PublicationCard } from '@/components/publication-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OfficeBearersTable } from '@/components/office-bearers-table';
import { SocietyCard } from '@/components/society-card';
import { societies } from '@/app/data/societies';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Events' },
  { href: '#societies', label: 'Societies' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#publications', label: 'Publications' },
  { href: '#news', label: 'News' },
  { href: '#office-bearers', label: 'Office Bearers' },
  { href: '#contact', label: 'Contact' },
];


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
          <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col h-full justify-between pt-24 pb-12">
            <div className='flex flex-col items-center justify-center flex-grow'>
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
            <nav className="hidden md:flex justify-center items-center gap-6 text-sm font-medium">
                {navLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                    >
                    {link.label}
                    </Link>
                ))}
            </nav>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-primary">About SMVITM-IEEE</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    IEEE was founded in 1884 with Alexander Graham Bell and Thomas Edison among its charter members. Today, IEEE serves over 400,000 members worldwide. Over 100,000 Student and Graduate Student members worldwide make up 25% of the membership of IEEE and are essential to its continued growth and vitality. Not only is IEEE the world’s largest technical and professional society, it also publishes a significant amount of the electrical engineering and computer-science literature in the world.
                  </p>
                  <p>
                    IEEE worldwide membership is geographically divided into ten Regions. These Regions are further divided into Sections that serve as the centers of activity for professional engineers at the local level. IEEE student branch of SMVITM (Code:STB10147) falls under Bangalore Section and Mangalore Sub Section in region 10.
                  </p>
                   <p>
                    We organize a wide range of events, including workshops, seminars, competitions, and industrial visits, to help students stay updated with the latest trends in technology and engineering. Our mission is to inspire innovation, encourage collaboration, and build a community of passionate learners.
                  </p>
                </div>
                 <Button variant="link" className="text-accent p-0 h-auto font-semibold mt-6">
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

        {/* Societies Section */}
        <section id="societies" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
              IEEE Societies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {societies.map((society, index) => (
                <SocietyCard key={index} {...society} />
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-16 md:py-24 bg-card">
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

        {/* Office Bearers Section */}
        <section id="office-bearers" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <OfficeBearersTable />
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
      </main>
      <Footer />
    </div>
  );
}
