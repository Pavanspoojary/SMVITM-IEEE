import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, Calendar, ChevronRight, CircuitBoard, Cpu, Goal, Megaphone, Newspaper, Trophy, Users } from 'lucide-react';
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
  { href: '#about', label: 'About', icon: Goal },
  { href: '#events', label: 'Events', icon: Calendar },
  { href: '#societies', label: 'Societies', icon: Users },
  { href: '#achievements', label: 'Achievements', icon: Trophy },
  { href: '#publications', label: 'Publications', icon: Book },
  { href: '#news', label: 'News', icon: Newspaper },
  { href: '#office-bearers', label: 'Office Bearers', icon: CircuitBoard },
];


export default function Home() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
                <div 
                    className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(0,255,255,0.15)_0%,_rgba(0,0,0,0)_60%)]"
                />
            </div>
          <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col h-full justify-center">
            <div className='flex flex-col items-center justify-center flex-grow'>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-down bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
                    Smarter Investing,
                    <br />
                    <span className="text-primary">Faster Updates</span>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/70 mb-10 animate-fade-in-up">
                  Instant market updates and core features for smarter trading. Your journey to financial freedom starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 animate-fade-in rounded-full px-8 text-lg shadow-[0_0_20px_theme(colors.primary)]">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent text-foreground hover:bg-white/10 hover:text-white border-white/20 animate-fade-in rounded-full px-8 text-lg">
                        Learn More
                    </Button>
                </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">About SMVITM-IEEE</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    The IEEE student branch of SMVITM (STB10147), under the Bangalore Section and Mangalore Sub-Section in Region 10, is a hub of technical and professional growth. We organize workshops, seminars, and competitions to keep students at the forefront of technology and engineering.
                  </p>
                  <p>
                    Our mission is to inspire innovation, foster collaboration, and build a vibrant community of passionate learners and future leaders in technology.
                  </p>
                </div>
                 <Button variant="link" className="text-primary p-0 h-auto font-semibold mt-8 text-lg">
                  Learn more about IEEE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="glass-card p-2">
                {aboutImage && (
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full rounded-lg"
                    data-ai-hint={aboutImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-foreground">
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
        <section id="societies" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-foreground">
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
        <section id="achievements" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-foreground">
              Our Achievements
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} {...achievement} />
              ))}
            </div>
          </div>
        </section>

        {/* Office Bearers Section */}
        <section id="office-bearers" className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <OfficeBearersTable />
            </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-foreground">
              Recent Publications
            </h2>
            <div className="space-y-4">
              {publications.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-foreground">
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

      {/* Floating Nav Bar */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-card/50 backdrop-blur-lg rounded-full border border-border/50 shadow-lg">
          <nav className="flex items-center justify-center px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full"
              >
                <link.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
