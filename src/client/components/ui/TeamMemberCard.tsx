import { User } from 'lucide-react';
import { Card, CardContent } from '@/client/components/ui/card';
import { cn } from '@/client/lib/utils';

interface TeamMemberCardProps {
  name: string | { en: string; ar: string };
  role: string | { en: string; ar: string };
  image?: string;
  className?: string;
}

export default function TeamMemberCard({
  name,
  role,
  image,
  className,
}: TeamMemberCardProps) {
  const getLocalizedValue = (value: string | { en: string; ar: string }, lang: string): string => {
    if (typeof value === 'string') return value;
    return value?.[lang] || value?.en || '';
  };

  return (
    <Card className={cn('overflow-hidden transition-shadow hover:shadow-lg', className)}>
      <CardContent className="p-6 text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          {image ? (
            <img
              src={image}
              alt={typeof name === 'string' ? name : name.en}
              className="h-full w-full rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement?.querySelector('div')?.classList.remove('hidden');
              }}
            />
          ) : (
            <User className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-accent">{role}</p>
      </CardContent>
    </Card>
  );
}
