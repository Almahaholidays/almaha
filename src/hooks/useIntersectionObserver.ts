import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(options?: IntersectionOptions) {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options || {};
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const targetRef = useRef<Element>(null);

  useEffect(() => {
    const node = targetRef.current; // DOM Element
    const has = entry?.isIntersecting && freezeOnceVisible;

    if (!node || has) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, { threshold, root, rootMargin });

    observer.observe(node);

    return () => observer.disconnect();
  }, [targetRef, threshold, root, rootMargin, freezeOnceVisible, entry]);

  return [targetRef, entry] as const;
}
