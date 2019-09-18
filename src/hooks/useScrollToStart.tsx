import { useRef, useCallback } from 'react';
import { SectionList } from 'react-native';

const useScrollToStart = ({ offset }: { offset?: number }) => {
  const scrollRef = useRef<SectionList<any>>();

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

  return { scrollRef, scrollToStart };
};

export default useScrollToStart;
