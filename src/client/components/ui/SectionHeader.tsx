import { ReactNode } from 'react';
import { cn } from '@/client/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
      )}
      {children}
      <div
        className={cn(
          'mt-6 h-1 w-20 rounded-full bg-accent',
          centered && 'mx-auto'
        )}
      />
    </div>
  );
}
