import { useMemo } from 'react';
import { SectionListData } from 'react-native';
import { format, formatDistanceToNow, isToday } from 'date-fns';

type SectionMap<Item> = { [key: string]: SectionListData<Item> }

const useDateSections = <Item extends object>
  (
    items: Item[],
    getItemDate: (item: Item) => string,
  ) => useMemo(
    () => {
      const sectionsMap: SectionMap<Item> = items.reduce((map, item) => {
        // get current item timestamp
        const createdAt = new Date(getItemDate(item));
        // get current section key
        const key = format(createdAt, 'yyyyMMdd');
        // get current section props
        const { title = null, data = null } = map[key] || {};

        let newData = [];

        if (!Array.isArray(data)) {
          newData = [item];
        } else if (createdAt.getTime() > data[data.length - 1]) {
          newData = data.concat([item]);
        } else {
          newData = [item, ...data];
        }

        // assign new values to current section
        const section: SectionListData<Item> = {
          title: title || isToday(createdAt)
            ? 'Today'
            : formatDistanceToNow(createdAt, { addSuffix: true }),
          data: newData,
        };

        map[key] = section;

        return map;
      }, {});

      // return list of sections sorted by descending date
      return Object.entries(sectionsMap)
        .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
        .map(([_, value]) => value);
    }, [items, getItemDate],
  );

export default useDateSections;
