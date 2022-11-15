import Input, { InputProps } from 'antd/lib/input';
import { FC } from 'react';
import './style.css';
type AInputProps = Pick<
  InputProps,
  | 'value'
  | 'className'
  | 'onChange'
  | 'placeholder'
  | 'allowClear'
  | 'maxLength'
  | 'showCount'
  | 'suffix'
  | 'prefix'
  | 'disabled'
>;
export const AInput: FC<AInputProps> = ({ className = '', ...props }) => {
  return <Input {...props} className={`fcr-theme ${className}`} />;
};
