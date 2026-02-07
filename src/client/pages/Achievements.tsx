import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import { Card, CardContent } from '@/client/components/ui/card';

export default function Achievements() {
  const { t } = useTranslation();

  const achievements = t('achievements.items', { returnObjects: true }) as Array<{
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
              {t('achievements.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('achievements.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="flex w-20 flex-shrink-0 items-center justify-center bg-accent">
                        <Trophy className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div className="p-6">
                        <div className="mb-2 flex items-center gap-2 text-sm text-accent">
                          <Calendar className="h-4 w-4" />
                          <span>{achievement.date}</span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-foreground">
                          {achievement.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
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
