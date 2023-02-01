import { forwardRef } from "react";
import cn from "clsx";
import type { ChangeEvent } from "react";

export type InputProps = {
  name: string;
  type?: string;
  value?: string;
  label?: string;
  noLabel?: boolean;
  noColon?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  labelClassName?: string;
  handleChange?: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type,
      value,
      label,
      noLabel,
      noColon,
      required,
      className,
      placeholder,
      labelClassName,
      handleChange,
    },
    ref
  ): JSX.Element => {
    return (
      <div className="flex flex-col gap-1">
        {!noLabel && (
          <label
            htmlFor={name}
            className={cn(
              "font-semibold uppercase tracking-wide",
              labelClassName
            )}
          >
            {label}
            {!noColon && ":"}
          </label>
        )}

        <input
          name={name}
          className={cn(
            "inter border px-2 text-sm font-medium outline-none",
            className
          )}
          value={value && value}
          type={type ? type : "text"}
          placeholder={placeholder}
          required={required ? required : true}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    );
  }
);
