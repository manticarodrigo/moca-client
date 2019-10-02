import { useMemo } from 'react';
import { SectionListData } from 'react-native';
import { format, distanceInWordsToNow } from 'date-fns';

type SectionMap<Item> = { [key: string]: SectionListData<Item> }

const useDateSections = <Item extends object>
  (items: Item[], getItemDate: (item: Item) => string) => useMemo(() => {
    const sectionsMap: SectionMap<Item> = items.reduce((map, item) => {
      // get current item timestamp
      const createdAt = getItemDate(item);
      // get current section key
      const key = format(createdAt, 'MMDDYYYY');
      // get current section props
      const { title = null, data = null } = map[key] || {};

      // assign new values to current section
      const section: SectionListData<Item> = {
        title: title || distanceInWordsToNow(createdAt, { addSuffix: true }),
        data: Array.isArray(data) ? data.concat([item]) : [item],
      };

      map[key] = section;

      return map;
    }, {});

    // return list of sections sorted by descending date
    return Object.entries(sectionsMap)
      .sort((a, b) => parseInt(b[0], 10) - parseInt(a[0], 10))
      .map(([_, value]) => value);
  }, [items, getItemDate]);

export default useDateSections;
