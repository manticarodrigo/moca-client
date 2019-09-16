import { useMemo } from 'react';
import { SectionListData } from 'react-native';
import { format, distanceInWordsToNow } from 'date-fns';

type SectionMap = {
  [key: string]: SectionListData<{ date?: Date; title?: string; data: any[] }>;
}

const useSections = (items: any[], getItemDate: (item: any) => string) => useMemo(() => {
  const sectionsMap = items.reduce<SectionMap>((map, item) => {
    // get current item timestamp
    const createdAt = getItemDate(item);
    // get current section key
    const key = format(createdAt, 'MM-DD-YYYY');
    // get current section props
    const {
      date = null,
      title = null,
      data = null,
    } = map[key] || {};

    // assign new values to current section
    map[key] = {
      date: date || new Date(createdAt),
      title: title || distanceInWordsToNow(createdAt, { addSuffix: true }),
      data: Array.isArray(data) ? data.concat([item]) : [item],
    };

    return map;
  }, {});

  // return list of sections sorted by descending date
  return Object.values(sectionsMap).sort((a, b) => b.date - a.date);
}, [items, getItemDate]);

export default useSections;
