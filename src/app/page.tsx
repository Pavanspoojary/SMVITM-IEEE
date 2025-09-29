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
        <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center text-center text-white bg-black">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",}}
                data-ai-hint="engineering circuit board"
            ></div>
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col h-full justify-center pt-24 pb-12">
            <div className='flex flex-col items-center justify-center flex-grow'>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 animate-fade-in-down">
                SMVITM-IEEE <span className="text-primary">Student Branch</span>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80 mb-10 animate-fade-in-up">
                Fostering Technological Innovation and Excellence for the next generation of engineers.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 animate-fade-in rounded-full px-8 text-lg">
                Join Us <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
            
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-foreground">About SMVITM-IEEE</h2>
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
              <div className="rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
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
        <section id="events" className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16 text-foreground">
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
        <section id="societies" className="py-20 md:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16 text-foreground">
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
        <section id="achievements" className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16 text-foreground">
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
        <section id="office-bearers" className="py-20 md:py-32 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <OfficeBearersTable />
            </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16 text-foreground">
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
        <section id="news" className="py-20 md:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16 text-foreground">
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
