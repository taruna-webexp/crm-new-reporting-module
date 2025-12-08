/**
 * Overline component - uppercase small text for badges, tags, headers
 */

import React from 'react';
import type { OverlineProps, ColorVariant } from '../../types/ui';

const colorClasses: Record<ColorVariant, string> = {
  primary: 'text-black',
  secondary: 'text-slate-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  neutral: 'text-neutral-600',
  white: 'text-white',
};

export const Overline = React.forwardRef<HTMLSpanElement, OverlineProps>(
  (
    { children, className, color = 'neutral' },
    ref
  ) => {
    const colorClass = colorClasses[color];
    const combinedClassName = `text-overline ${colorClass} ${className || ''}`.trim();

    return (
      <span ref={ref} className={combinedClassName}>
        {children}
      </span>
    );
  }
);

Overline.displayName = 'Overline';

export default Overline;
