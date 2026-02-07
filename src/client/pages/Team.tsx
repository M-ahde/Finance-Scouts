import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, CalendarDays, Megaphone, Monitor, Users2 } from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import TeamMemberCard from '@/client/components/ui/TeamMemberCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/client/components/ui/card';

const departments = [
  { key: 'research', icon: Search },
  { key: 'events', icon: CalendarDays },
  { key: 'marketing', icon: Megaphone },
  { key: 'hr', icon: Users2 },
  { key: 'tech', icon: Monitor },
];

const leadershipRoles = ['president', 'vicePresident', 'secretary', 'treasurer'];

export default function Team() {
  const { t } = useTranslation();

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
              {t('team.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('team.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title={t('team.leadership.title')} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadershipRoles.map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamMemberCard
                  name={`${t(`team.leadership.${role}`)} Name`}
                  role={t(`team.leadership.${role}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title={t('team.departments.title')} />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        <dept.icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-lg">
                        {t(`team.departments.${dept.key}.name`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t(`team.departments.${dept.key}.description`)}
                    </p>
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
