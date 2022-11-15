import { useEffect, useRef } from "react";

export const useMounted = () => {
  const mounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  return mounted.current;
};

export const useTimeout = (fn: CallableFunction, delay: number) => {
  const mounted = useMounted();

  const timer = useRef<any>(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      fn && mounted && fn();
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [timer]);
};
