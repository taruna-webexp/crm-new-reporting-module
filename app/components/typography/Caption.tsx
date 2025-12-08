import React from 'react';
import type { CaptionProps, ColorVariant } from '../../types/ui';

const colorClasses: Record<ColorVariant, string> = {
  primary: 'text-black',
  secondary: 'text-slate-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  neutral: 'text-neutral-500',
  white: 'text-white',
};

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  (
    { children, className, color = 'neutral' },
    ref
  ) => {
    const colorClass = colorClasses[color];
    const combinedClassName = `text-caption ${colorClass} ${className || ''}`.trim();

    return (
      <span ref={ref} className={combinedClassName}>
        {children}
      </span>
    );
  }
);

Caption.displayName = 'Caption';

export default Caption;
