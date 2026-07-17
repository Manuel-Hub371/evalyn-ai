import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          {...props}
        />
        <div className={cn(
          "relative w-11 h-6 bg-gray-200 dark:bg-dark-700 rounded-full peer",
          "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
          "peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500",
          "after:content-[''] after:absolute after:top-0.5 after:start-[2px]",
          "after:bg-white after:rounded-full after:h-5 after:w-5",
          "after:transition-all after:shadow-md",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
          "transition-colors",
          className
        )}></div>
        {label && (
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
