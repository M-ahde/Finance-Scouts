import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import WorkshopCard from '@/client/components/ui/WorkshopCard';
import { Card, CardContent } from '@/client/components/ui/card';

export default function Workshops() {
  const { t } = useTranslation();

  const events = t('workshops.events', { returnObjects: true }) as Array<{
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
  }>;

  const announcements = t('workshops.news', { returnObjects: true }) as Array<{
    title: string;
    date: string;
    description: string;
  }>;

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
              {t('workshops.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('workshops.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title={t('workshops.upcoming')} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <WorkshopCard
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  buttonText={t('workshops.registerBtn')}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title={t('workshops.announcements')} />

          <div className="grid gap-6 md:grid-cols-2">
            {announcements.map((announcement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Bell className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="mb-1 text-sm text-accent">
                        {announcement.date}
                      </p>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {announcement.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {announcement.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
