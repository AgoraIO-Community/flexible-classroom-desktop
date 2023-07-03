import Button, { ButtonProps } from 'antd/lib/button';
import { FC, PropsWithChildren } from 'react';
import './abutton.css';
type AButtonProps = Pick<ButtonProps, 'className' | 'onClick' | 'icon' | 'type'>;

export const AButton: FC<PropsWithChildren<AButtonProps>> = ({ className = '', ...props }) => {
  return <Button {...props} className={`fcr-theme ${className}`} />;
};
