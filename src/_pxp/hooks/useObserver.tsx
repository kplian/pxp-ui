import { useEffect, useRef, useState } from 'react';

const useObserver = (options) => {
  const [element, setElement] = useState(null);
  const [entry, setEntry] = useState(null);

  const observer = useRef(
    new IntersectionObserver((observedEntries) => {
      setEntry(observedEntries[0]);
    }, options),
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();
    if (element) {
      currentObserver.observe(element);
    }
    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [element]);

  return [observer.current, setElement, entry];
};

export default useObserver;
