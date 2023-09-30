import { useState, useEffect } from 'react';

type Props = { count: number };

export const useGameStartCountdown = ({ count }: Props) => {
  const [remain, setRemain] = useState(count);

  useEffect(() => {
    let refId: number | null = null;
    if (remain > 0) {
      refId = setTimeout(() => {
        setRemain(remain - 1);
      }, 1000);
    }
    return () => {
      if (refId) clearTimeout(refId);
    };
  }, [remain]);

  return remain;
};
