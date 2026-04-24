import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageLayout from '@/client/components/layout/PageLayout';
import SectionHeader from '@/client/components/ui/SectionHeader';
import TeamMemberCard from '@/client/components/ui/TeamMemberCard';
import { BookOpen, Briefcase, Camera, FileText, Handshake, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
const departments = [
  { key: 'media', icon: Camera },
  { key: 'pr', icon: Handshake },
  { key: 'content', icon: FileText },
  { key: 'design', icon: Palette },
  { key: 'management', icon: Briefcase },
  { key: 'documentation', icon: BookOpen },
];
export default function Team() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('/api/v1/team')
      .then(res => res.json())
      .then(data => setTeamMembers(data))
      .catch(err => console.error('Error fetching team:', err));
  }, []);

  const getLocalizedValue = (value: string | { en: string; ar: string }): string => {
    if (typeof value === 'string') return value;
    return value?.[currentLang] || value?.en || '';
  };

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

      {/* Team Members Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title={t('team.members.title')} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamMemberCard
                  name={getLocalizedValue(member.name)}
                  role={getLocalizedValue(member.role)}
                  image={member.avatar}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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