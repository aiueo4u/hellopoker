import { useState, useEffect } from 'react';

const useGameStartCountdown = count => {
  const [remain, setRemain] = useState(count)

  useEffect(() => {
    let refId = null
    if (remain > 0) {
      refId = setTimeout(() => {
        setRemain(remain - 1)
      }, 1000)
    }
    return () => { clearTimeout(refId) }
  }, [remain])

  return remain;
};

export default useGameStartCountdown;
