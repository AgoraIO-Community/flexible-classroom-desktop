import { Avatar, AvatarProps } from 'antd';
import { FC } from 'react';
import './index.css';

export const AAvatar: FC<AvatarProps> = ({ className = '', ...props }) => {
  return <Avatar {...props} className={`fcr-theme ${className}`} />;
};
