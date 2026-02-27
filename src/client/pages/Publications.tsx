import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, Eye } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PageLayout from '@/client/components/layout/PageLayout';
import { Card, CardContent } from '@/client/components/ui/card';
import { Button } from '@/client/components/ui/button';

// دالة جلب البيانات من الـ API
const fetchPublications = async () => {
  const res = await axios.get("/api/v1/publications"); // تأكد من المسار الصحيح للـ API الخاص بك
  return res.data;
};

export default function Publications() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // 'ar' أو 'en'

  // جلب البيانات باستخدام React Query
  const { data: publications = [], isLoading, isError } = useQuery({
    queryKey: ["publications"],
    queryFn: fetchPublications,
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
              {t('publications.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('publications.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* حالة التحميل */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          {/* حالة الخطأ أو مصفوفة فارغة */}
          {!isLoading && publications.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              {t('common.noData')} {/* أضف مفتاح ترجمة للبيانات الفارغة */}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publications.map((pub, index) => {
              // استخراج النصوص بناءً على اللغة الحالية
              // نفترض أن هيكلة البيانات هي: title: { en: "...", ar: "..." }
              const title = pub.title?.[currentLang] || pub.title?.en || "";
              const description = pub.description?.[currentLang] || pub.description?.en || "";
              const type = pub.type?.[currentLang] || pub.type?.en || "";

              return (
                <motion.div
                  key={pub._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all hover:shadow-xl hover:-translate-y-1">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <FileText className="h-7 w-7 text-primary" />
                      </div>
                      
                      <span className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                        {type}
                      </span>

                      <h3 className="mb-2 text-lg font-bold text-foreground line-clamp-2">
                        {title}
                      </h3>
                      
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {description}
                      </p>

                      <div className="grid gap-2 mt-auto w-full">
  {/* زر العرض */}
  <Button
    variant="outline"
    className="flex-1 group"
    onClick={() => {
      if (pub.pdfUrl) window.open(pub.pdfUrl, "_blank"); // يفتح الملف في تبويب جديد
    }}
  >
    <Eye className="me-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
    {t("publications.viewBtn")}
  </Button>

  {/* زر التحميل */}
  <Button
    variant="outline"
    className="flex-1 group"
    onClick={() => {
      if (pub.pdfUrl) {
        // نجعل الملف يُحمّل مباشرة باستخدام fl_attachment
        const downloadUrl = pub.pdfUrl.replace(
          "/upload/",
          "/upload/fl_attachment/"
        );
        window.open(downloadUrl, "_blank");
      }
    }}
  >
    <Download className="me-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
    {t("publications.downloadBtn")}
  </Button>
</div>
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