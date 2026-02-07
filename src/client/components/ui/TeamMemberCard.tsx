import { User } from 'lucide-react';
import { Card, CardContent } from '@/client/components/ui/card';
import { cn } from '@/client/lib/utils';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image?: string;
  className?: string;
}

export default function TeamMemberCard({
  name,
  role,
  image,
  className,
}: TeamMemberCardProps) {
  return (
    <Card className={cn('overflow-hidden transition-shadow hover:shadow-lg', className)}>
      <CardContent className="p-6 text-center">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-full object-cover"
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
