import { useRef, useCallback } from 'react';
import { SectionList } from 'react-native';

const useScrollToStart = <Item extends object>({ offset }: { offset?: number }) => {
  const scrollRef = useRef<SectionList<Item>>();

  const setRef = (ref) => {
    scrollRef.current = ref;
  };

  const scrollToStart = useCallback(() => {
    const { current } = scrollRef;

    if (current) {
      current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: offset,
      });
    }
  }, [scrollRef, offset]);

  return { setRef, scrollToStart };
};

export default useScrollToStart;
