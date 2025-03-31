import { forwardRef } from "react";
import { CheckboxProps } from "../types";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, id, label, name, ariaLabel }, ref) => {
    return (
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="custom-checkbox"
          id={id}
          name={name}
          aria-label={ariaLabel || label}
        />
        {label && (
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
        )}
      </div>
    );
  }
);
