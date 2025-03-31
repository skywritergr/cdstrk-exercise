import { forwardRef } from "react";

interface CheckboxProps {
  checked?: boolean;
  onChange: () => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="custom-checkbox"
      />
    );
  }
);
