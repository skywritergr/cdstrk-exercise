import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export const Button: FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className,
  disabled = false,
  ariaLabel
}) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-2 border rounded ${className}`}
    disabled={disabled}
    aria-label={ariaLabel}
    type="button"
  >
    {children}
  </button>
);
