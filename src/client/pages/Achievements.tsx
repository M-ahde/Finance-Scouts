import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Trophy, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import PageLayout from "@/client/components/layout/PageLayout";
import { Card, CardContent } from "@/client/components/ui/card";

type Achievement = {
  _id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  date: string;
};

export default function Achievements() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/achievements");
      return res.data;
    },
  });

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
              {t("achievements.title")}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t("achievements.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {achievements.map((achievement: Achievement, index: number) => (
                <motion.div
                  key={achievement._id}
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
                            {achievement.title[currentLang]}
                          </h3>

                          <p className="text-muted-foreground">
                            {achievement.description[currentLang]}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}