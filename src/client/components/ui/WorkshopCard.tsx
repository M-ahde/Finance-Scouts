import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/client/components/ui/card';
import { Button } from '@/client/components/ui/button';
import { cn } from '@/client/lib/utils';

interface WorkshopCardProps {
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function WorkshopCard({
  title,
  description,
  date,
  time,
  location,
  buttonText,
  onButtonClick,
  className,
}: WorkshopCardProps) {
  return (
    <Card className={cn('overflow-hidden transition-shadow hover:shadow-lg', className)}>
      <CardHeader className="border-b border-border bg-muted/50 pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="h-4 w-4 text-accent" />
            <span>{date}</span>
          </div>
          {time && (
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {buttonText && (
          <Button
            onClick={onButtonClick}
            className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
