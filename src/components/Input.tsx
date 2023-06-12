import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = React.forwardRef(
  ({ className, ...props }, ref: any) => {
    return (
      <input
        ref={ref}
        className={`bg-gray-50 border border-gray-300 text-gray-900 ring-inset sm:text-sm rounded-lg focus:rign-2 ring-offset-2 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        {...props}
      />
    );
  }
);

export default Input
