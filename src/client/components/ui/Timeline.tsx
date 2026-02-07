import { cn } from '@/client/lib/utils';

interface TimelineItem {
  title: string;
  period: string;
  items: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical Line */}
      <div className="absolute start-4 top-0 h-full w-0.5 bg-border md:start-1/2 md:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'relative flex items-start gap-6 md:gap-0',
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            )}
          >
            {/* Dot */}
            <div className="absolute start-4 top-1 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-accent bg-background md:start-1/2" />

            {/* Content */}
            <div
              className={cn(
                'ms-12 w-full rounded-lg border border-border bg-card p-6 shadow-sm md:ms-0 md:w-[calc(50%-2rem)]',
                index % 2 === 0 ? 'md:me-auto' : 'md:ms-auto'
              )}
            >
              <div className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                {item.period}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.items.map((listItem, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
