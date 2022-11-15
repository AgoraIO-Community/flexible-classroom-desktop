import { FC } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './index.css';

interface OverlayWrapProps {
  opened: boolean;
  centered?: boolean;
  onExited?: (() => void) | undefined;
  className?: string;
}

export const OverlayWrap: FC<OverlayWrapProps> = ({
  opened,
  onExited,
  className,
  children,
  centered = true,
}) => {
  const cls = classnames('overlay-wrap', {
    'overlay-wrap-content-ltr': !centered,
    [`${className}`]: !!className,
  });
  return (
    <CSSTransition in={opened} timeout={300} classNames={cls} unmountOnExit onExited={onExited}>
      <div className={cls}>{children}</div>
    </CSSTransition>
  );
};
