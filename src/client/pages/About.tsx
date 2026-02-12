import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, Users, BookOpen, Handshake } from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import { Card, CardContent } from '@/client/components/ui/card';

const features = [
  { icon: BookOpen, key: 0 },
  { icon: Users, key: 1 },
  { icon: Handshake, key: 2 },
  { icon: Building2, key: 3 },
];

export default function About() {
  const { t } = useTranslation();

  const whatWeDoItems = t('about.whatWeDo.items', { returnObjects: true }) as string[];

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
              {t('about.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="mb-12 text-center text-lg text-muted-foreground">
                {t('about.description')}
              </p>
            </motion.div>

   
            {/* What We Do */}
            <SectionHeader title={t('about.whatWeDo.title')} />

            <div className="grid gap-6 sm:grid-cols-2">
              {whatWeDoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        {features[index] && (() => {
                          const Icon = features[index].icon;
                          return <Icon className="h-6 w-6 text-accent" />;
                        })()}
                      </div>
                      <p className="text-foreground">{item}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
