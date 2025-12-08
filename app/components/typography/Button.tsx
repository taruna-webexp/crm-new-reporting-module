import React from 'react';
import type { ButtonProps } from '../../types/ui';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      buttonText,
      className = '',
      fullWidth = false,
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const fullWidthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`
          flex justify-center items-center relative rounded-4xl p-3 w-fit min-w-32 md:min-w-[150px] cursor-pointer overflow-hidden transition-all duration-500 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm ${variant == "primary" ? 'before:bg-neutral-950 text-white' : "before:bg-red-800 text-black"} before:duration-500 before:ease-out hover:text-white  hover:before:h-60 hover:before:w-full
          btn
          btn-${variant}
          btn-${size}
          ${fullWidthClass}
          ${className}
        `.trim()}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className='relative'>{buttonText}</span>
          </>
        ) : (
          <span className='relative'>{buttonText}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
