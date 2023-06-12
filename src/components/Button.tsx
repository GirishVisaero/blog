import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "danger" | "warning" | 'ghost';
  fullWidth?: boolean;
  leftIcon?: JSX.Element | undefined;
  rightIcon?: JSX.Element | undefined;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  disabled,
  fullWidth,
  leftIcon,
  rightIcon,
  ...buttonProps
}) => {
  return (
    <button
      className={`rounded justify-center px-5 flex gap-1 transition-all duration-150 ease-in-out py-1 shadow-sm hover:shadow focus:shadow-md text-white
       ${className}  
       ${
         variant === "primary"
           ? "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-600/90 disabled:bg-indigo-600/70 disabled:text-slate-300"
           : variant === "danger"
           ? "bg-red-500 hover:bg-red-600 active:bg-red-600/90 disabled:bg-red-600/70 disabled:text-slate-300"
           : variant === "warning"
           ? "bg-orange-500 hover:bg-orange-600 active:bg-orange-600/90 disabled:bg-orange-600/70 disabled:text-slate-300"
           : variant === "ghost"
           ? "bg-slate-300/30 text-black border hover:bg-slate-200 active:bg-slate-200/80 disabled:bg-slate-200/50 disabled:text-slate-400"
           : ""
       }
       ${fullWidth && 'w-full'}
       `}
       disabled={disabled}
       {...buttonProps}
    >
      {leftIcon && leftIcon} {children} {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
