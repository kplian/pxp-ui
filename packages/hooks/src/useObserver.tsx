import { useEffect, useRef, useState } from 'react';

export declare interface IObserver {
  entry: any;
  setElement: any;
  observer: any;
}

const useObserver: any = (options) => {
  const [element, setElement] = useState<any>();
  const [entry, setEntry] = useState(null);

  const observer: any = useRef(
    new IntersectionObserver((observedEntries: any) => {
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
