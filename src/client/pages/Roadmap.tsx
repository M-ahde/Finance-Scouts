import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import Timeline from '@/client/components/ui/Timeline';

export default function Roadmap() {
  const { t } = useTranslation();

  const phases = t('roadmap.phases', { returnObjects: true }) as Array<{
    title: string;
    period: string;
    items: string[];
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
              {t('roadmap.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('roadmap.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Timeline items={phases} />
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
