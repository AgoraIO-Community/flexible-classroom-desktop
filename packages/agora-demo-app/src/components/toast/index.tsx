/* eslint-disable react/prop-types */
import React, { CSSProperties, FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import Notification from 'rc-notification';
import './index.css';
import { SvgImg } from '../svg-img';
import { SvgIconEnum } from '../svg-img/type';
import { useTimeout } from '../utilities/hooks';

export type ToastCategory = 'success' | 'error' | 'warning';

const toastDict: Record<string, { iconType: SvgIconEnum; color: string }> = {
  success: {
    iconType: SvgIconEnum.TOAST_SUCCESS,
    color: '#fff',
  },
  error: {
    iconType: SvgIconEnum.TOAST_INFO,
    color: '#fff',
  },
  warning: {
    iconType: SvgIconEnum.TOAST_INFO,
    color: '#fff',
  },
};

export interface ToastProps {
  type?: 'success' | 'error' | 'warning';
  text?: string;
  duration?: number;
  closeToast?: CallableFunction;
  canStop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

type ToastType = FC<PropsWithChildren<ToastProps>> & {
  show: (params: ToastProps) => void;
};

export const Toast: ToastType = ({
  type = 'success',
  children,
  className,
  closeToast,
  canStop = false,
  ...restProps
}) => {
  const toastEl = useRef<HTMLDivElement | null>(null);
  const canStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cls = classnames({
    [`toast toast-${type}`]: 1,
    [`${className}`]: !!className,
  });
  const startClose = useCallback(() => {
    canStopTimer.current = setTimeout(() => {
      closeToast && closeToast();
      canStopTimer.current && clearTimeout(canStopTimer.current);
    }, 2500);
  }, [canStopTimer.current]);

  useEffect(() => {
    if (canStop) {
      startClose();
      if (!toastEl.current) return;
      toastEl.current.addEventListener('mouseover', function () {
        canStopTimer.current && clearTimeout(canStopTimer.current);
      });
      toastEl.current.addEventListener('mouseout', function () {
        startClose();
      });
    }
  }, [canStop, canStopTimer.current]);

  useTimeout(() => {
    if (!canStop) {
      closeToast && closeToast();
    }
  }, 2500);

  return (
    <div className={cls} {...restProps} ref={toastEl}>
      <SvgImg type={toastDict[type].iconType} colors={{ iconPrimary: '#fff' }} />
      <div>{children}</div>
    </div>
  );
};

Toast.show = function ({
  type = 'success',
  text = 'toast text',
  duration = 1.5,
  style = {
    top: 0,
    right: 0,
  },
}) {
  Notification.newInstance({}, (notification) => {
    notification.notice({
      content: (
        <Toast type={type as 'success' | 'error' | 'warning'} closeToast={() => {}}>
          {text}
        </Toast>
      ),
      duration,
      style: Object.assign({ position: 'fixed' }, style) as CSSProperties,
    });
  });
};
