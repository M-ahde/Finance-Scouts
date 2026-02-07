import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Users,
  Award,
  Globe,
  Lightbulb,
} from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import { Card, CardContent } from '@/client/components/ui/card';

const goalIcons = [BookOpen, Briefcase, Users, Award, Globe, Lightbulb];

export default function Goals() {
  const { t } = useTranslation();

  const goals = t('goals.items', { returnObjects: true }) as Array<{
    title: string;
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
              {t('goals.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('goals.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => {
              const Icon = goalIcons[index] || Lightbulb;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground">
                          {goal.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">{goal.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
