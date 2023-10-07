import classNames from 'classnames';
import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import './index.css';

type CheckboxProps = {
  text?: string;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  gap?: number;
  style?: React.CSSProperties;
};

export const CheckBox: FC<CheckboxProps> = ({
  text,
  value,
  checked = false,
  disabled = false,
  indeterminate = false,
  gap,
  style,
  ...restProps
}) => {
  const checkboxRef = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    const checkboxEl = checkboxRef.current;
    if (checkboxEl) {
      checkboxEl.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const cls = classNames('fcr-pure-material-checkbox', {
    [`gap-${gap}`]: !!gap,
  });

  return (
    <label className={cls} style={style}>
      <input
        ref={checkboxRef}
        type="checkbox"
        value={value}
        checked={checked}
        disabled={disabled}
        {...restProps}
      />
      <span>
        <span className="fcr-flex-grow fcr-truncate">{text}</span>
      </span>
    </label>
  );
};
