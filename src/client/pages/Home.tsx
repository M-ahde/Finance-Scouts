import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BookOpen, Award, Calendar } from 'lucide-react';
import { Button } from '@/client/components/ui/button';
import { Card, CardContent } from '@/client/components/ui/card';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import WorkshopCard from '@/client/components/ui/WorkshopCard';
import { useLanguage } from '@/client/hooks/useLanguage';

const stats = [
  { key: 'members', value: '100+', icon: Users },
  { key: 'workshops', value: '30+', icon: Calendar },
  { key: 'years', value: '2+', icon: Award },
];

export default function Home() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const workshops = t('workshops.events', { returnObjects: true }) as Array<{
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
  }>;

  return (
    <PageLayout>
      {/* Hero Section */}
<section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--finance-navy))] to-[hsl(var(--finance-blue))] py-24 md:py-36">  {/* Dynamic Financial Background */}
  <div className="absolute inset-0 pointer-events-none">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Grid Lines */}
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Faint Graph Lines */}
      <path
        d="M0,200 C200,50 400,300 600,100 800,350 1000,150 1200,250"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
        fill="transparent"
      />
      <path
        d="M0,250 C200,100 400,350 600,150 800,400 1000,200 1200,300"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="2"
        fill="transparent"
      />
      {/* Floating Data Points */}
      <circle cx="200" cy="100" r="4" fill="rgba(255,255,255,0.3)" />
      <circle cx="500" cy="180" r="6" fill="rgba(255,255,255,0.3)" />
      <circle cx="800" cy="120" r="5" fill="rgba(255,255,255,0.3)" />
      <circle cx="1100" cy="220" r="7" fill="rgba(255,255,255,0.3)" />
    </svg>
  </div>

  <div className="container relative mx-auto px-4 md:px-6 z-10 text-center">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-3xl"
    >
      {/* Subtitle */}
      <span className="mb-4 inline-block rounded-full bg-accent/30 px-4 py-2 text-sm font-semibold text-accent uppercase tracking-wide">
        {t('home.hero.subtitle')}
      </span>

      {/* Main Title */}
      <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg">
        {t('home.hero.title')}
      </h1>

      {/* Description */}
      <p className="mb-10 text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-sm">
        {t('home.hero.description')}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link to="/join">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-2"
          >
            {t('home.hero.joinBtn')}
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </Link>
        <Link to="/about">
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 hover:bg-white/10 flex items-center gap-2"
          >
            {t('home.hero.exploreBtn')}
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </Link>
      </div>
    </motion.div>
  </div>

  {/* Floating Decorative Elements */}
  <motion.div
    animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    className="absolute -bottom-12 start-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl"
  />
  <motion.div
    animate={{ x: [0, -40, 0], y: [0, -25, 0] }}
    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    className="absolute -top-12 end-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
  />
</section>


      {/* Stats Section */}
      <section className="border-b border-border bg-background py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none bg-transparent shadow-none">
                  <CardContent className="flex flex-col items-center p-4 text-center">
                    <stat.icon className="mb-2 h-8 w-8 text-accent" />
                    <span className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {t(`home.stats.${stat.key}`)}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title={t('home.workshops.title')}
            subtitle={t('home.workshops.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops.slice(0, 3).map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <WorkshopCard
                  title={workshop.title}
                  description={workshop.description}
                  date={workshop.date}
                  time={workshop.time}
                  location={workshop.location}
                  buttonText={t('workshops.registerBtn')}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/workshops">
              <Button variant="outline" size="lg">
                {t('home.workshops.viewAll')}
                <ArrowRight className={`ms-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              {t('join.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
              {t('join.subtitle')}
            </p>
            <Link to="/join">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {t('home.hero.joinBtn')}
                <ArrowRight className={`ms-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
