import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import { Card, CardContent } from '@/client/components/ui/card';
import { Button } from '@/client/components/ui/button';

export default function Publications() {
  const { t } = useTranslation();

  const publications = t('publications.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    type: string;
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
              {t('publications.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('publications.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <span className="mb-2 text-xs font-medium uppercase tracking-wide text-accent">
                      {publication.type}
                    </span>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {publication.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">
                      {publication.description}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto w-full"
                      onClick={() => {
                        // Placeholder - no actual download
                      }}
                    >
                      <Download className="me-2 h-4 w-4" />
                      {t('publications.downloadBtn')}
                    </Button>
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
