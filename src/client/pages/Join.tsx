import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Sparkles } from 'lucide-react';
import PageLayout from '@/client/components/layout/PageLayout';
import { Button } from '@/client/components/ui/button';
import { Input } from '@/client/components/ui/input';
import { Card, CardContent } from '@/client/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/client/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/client/components/ui/select';
import { createJoinRequest } from '@/client/services/joinRequest';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';



type FormValues = z.infer<typeof formSchema>;

export default function Join() {
  const { t } = useTranslation();
  const benefits = t('join.benefits.items', { returnObjects: true }) as string[];

const formSchema = z.object({
  arabicName: z
    .string()
    .min(3, t("join.validation.arabicName.min"))
    .max(100, t("join.validation.arabicName.max")),

  englishName: z
    .string()
    .min(3, t("join.validation.englishName.min"))
    .max(100, t("join.validation.englishName.max")),

  phone: z
    .string()
    .regex(/^5\d{8}$/, t("join.validation.phone")),

  nationalId: z
    .string()
    .min(5, t("join.validation.nationalId.min"))
    .max(20, t("join.validation.nationalId.max")),

  universityId: z
    .string()
    .min(3, t("join.validation.universityId.min"))
    .max(20, t("join.validation.universityId.max")),

  universityEmail: z
    .string()
    .email(t("join.validation.universityEmail")),

  level: z
    .string()
    .min(1, t("join.validation.level")),

  major: z
    .string()
    .min(2, t("join.validation.major.min"))
    .max(100, t("join.validation.major.max")),

  committee: z
    .array(z.string())
    .min(1, t("join.validation.committee")),
});

  const [isSubmitted, setIsSubmitted] = useState(false);
const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    arabicName: '',
    englishName: '',
    phone: '',
    nationalId: '',
    universityId: '',
    universityEmail: '',
    level: '',
    major: '',
    committee: [],
  },
});


const onSubmit = async (data: FormValues) => {
  try {
    const formattedData = {
      ...data,
      phone: `+966${data.phone}`,
    };

    await createJoinRequest(formattedData);
    setIsSubmitted(true);
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
};


  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-primary-foreground md:text-5xl">
              {t('join.title')}
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              {t('join.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="py-16">
        
        <div className="container mx-auto px-4 space-y-16">
     {/* Benefits */}
      
          {/* Form */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {isSubmitted ? (
              <Card className="mx-auto max-w-2xl bg-accent/5">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-accent" />
                  <h2 className="text-2xl font-bold">
                    {t('join.success.title')}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {t('join.success.message')}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="mx-auto max-w-4xl">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid gap-6 md:grid-cols-2">

                        <FormField
                          control={form.control}
                          name="arabicName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.arabicName')}</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="englishName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.englishName')}</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t('join.form.phone')}</FormLabel>
      <FormControl>
        <div
          dir="ltr"
          className="flex w-full overflow-hidden rounded-md border focus-within:ring-2 focus-within:ring-accent"
        >
          {/* Country Code ثابت */}
          <div className="flex items-center px-3 bg-muted text-muted-foreground border-r">
            +966
          </div>

          {/* Input */}
          <Input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="5XXXXXXXX"
            className="border-0 focus-visible:ring-0 rounded-none text-left"
            value={field.value}
            onChange={(e) => {
              let value = e.target.value

              // إزالة أي شيء غير أرقام
              value = value.replace(/\D/g, "")

              // لو كتب 05 نحذف الصفر
              if (value.startsWith("05")) {
                value = value.slice(1)
              }

              // منع أكثر من 9 أرقام
              if (value.length > 9) {
                value = value.slice(0, 9)
              }

              field.onChange(value)
            }}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>



                        <FormField
                          control={form.control}
                          name="nationalId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.nationalId')}</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="universityId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.universityId')}</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="universityEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.universityEmail')}</FormLabel>
                              <FormControl><Input type="email" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.level')}</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t('join.form.selectLevel')} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">{t('join.levels.first')}</SelectItem>
                                  <SelectItem value="2">{t('join.levels.second')}</SelectItem>
                                  <SelectItem value="3">{t('join.levels.third')}</SelectItem>
                                  <SelectItem value="4">{t('join.levels.fourth')}</SelectItem>
                                  <SelectItem value="5">{t('join.levels.fifth')}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="major"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.major')}</FormLabel>
                              <FormControl><Input {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

 <FormField
  control={form.control}
  name="committee"
  render={({ field }) => (
    <FormItem>
      <FormLabel>{t("join.form.committee")}</FormLabel>

      <FormControl>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full min-h-[42px] justify-start flex-wrap gap-1"
            >
              {field.value?.length > 0 ? (
                field.value.map((c: string) => (
                  <Badge key={c} variant="secondary">
                    {t(`join.committees.${c}`)}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">
                  {t("join.form.selectCommittee")}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            {[
              "management",
              "content",
              "design",
              "media",
              "pr",
              "documentation",
            ].map((committee) => (
              <DropdownMenuCheckboxItem
                key={committee}
                checked={field.value?.includes(committee)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...(field.value || []), committee]
                    : field.value?.filter((v: string) => v !== committee)

                  field.onChange(newValue)
                }}
              >
                {t(`join.committees.${committee}`)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>



                      <Button type="submit" className="w-full bg-accent text-accent-foreground">
                        {t('join.form.submit')}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </motion.div>

     

        </div>
      </section>
    </PageLayout>
  );
}
