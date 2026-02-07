import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Compass, Star, Shield, Users, Zap } from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import { Card, CardContent } from '@/client/components/ui/card';

const valueIcons = [Star, Shield, Users, Zap];

export default function Vision() {
  const { t } = useTranslation();

  const values = t('vision.values.items', { returnObjects: true }) as Array<{
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
              {t('vision.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('vision.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center justify-center bg-primary p-8 md:w-1/4">
                    <Target className="h-16 w-16 text-accent" />
                  </div>
                  <div className="p-8 md:w-3/4">
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      {t('vision.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {t('vision.statement')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-4xl"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row-reverse">
                  <div className="flex items-center justify-center bg-accent p-8 md:w-1/4">
                    <Compass className="h-16 w-16 text-accent-foreground" />
                  </div>
                  <div className="p-8 md:w-3/4">
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      {t('vision.missionTitle')}
                    </h2>
                    <p className="mb-2 text-sm text-accent">
                      {t('vision.missionSubtitle')}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {t('vision.mission')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            title={t('vision.values.title')}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = valueIcons[index] || Star;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full text-center transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
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
