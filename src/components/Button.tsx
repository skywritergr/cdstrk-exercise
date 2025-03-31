import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button: FC<ButtonProps> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`px-4 py-2 border rounded ${className}`}>
    {children}
  </button>
);
