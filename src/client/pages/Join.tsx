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
import { Textarea } from '@/client/components/ui/textarea';
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

const formSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(255),
  major: z.string().min(2).max(100),
  year: z.string().min(1),
  motivation: z.string().min(10).max(1000),
});

type FormValues = z.infer<typeof formSchema>;

export default function Join() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const benefits = t('join.benefits.items', { returnObjects: true }) as string[];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      major: '',
      year: '',
      motivation: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
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
              {t('join.title')}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              {t('join.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSubmitted ? (
                <Card className="bg-accent/5">
                  <CardContent className="flex flex-col items-center p-12 text-center">
                    <CheckCircle className="mb-4 h-16 w-16 text-accent" />
                    <h2 className="mb-2 text-2xl font-bold text-foreground">
                      {t('join.success.title')}
                    </h2>
                    <p className="text-muted-foreground">
                      {t('join.success.message')}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.fullName')}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t('join.form.fullNamePlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.email')}</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder={t('join.form.emailPlaceholder')}
                                  {...field}
                                />
                              </FormControl>
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
                              <FormControl>
                                <Input
                                  placeholder={t('join.form.majorPlaceholder')}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.year')}</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t('join.form.yearPlaceholder')}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-popover">
                                  <SelectItem value="first">
                                    {t('join.form.years.first')}
                                  </SelectItem>
                                  <SelectItem value="second">
                                    {t('join.form.years.second')}
                                  </SelectItem>
                                  <SelectItem value="third">
                                    {t('join.form.years.third')}
                                  </SelectItem>
                                  <SelectItem value="fourth">
                                    {t('join.form.years.fourth')}
                                  </SelectItem>
                                  <SelectItem value="graduate">
                                    {t('join.form.years.graduate')}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="motivation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('join.form.motivation')}</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={t('join.form.motivationPlaceholder')}
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting
                            ? t('join.form.submitting')
                            : t('join.form.submit')}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <Sparkles className="h-8 w-8 text-accent" />
                    <h2 className="text-2xl font-bold">
                      {t('join.benefits.title')}
                    </h2>
                  </div>
                  <p className="mb-8 text-primary-foreground/80">
                    {t('join.description')}
                  </p>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
