import { useMemo } from 'react';
import { SectionListData } from 'react-native';
import { format, distanceInWordsToNow } from 'date-fns';

type SectionMap = {
  [key: string]: SectionListData<{ date?: Date; title?: string; data: Chat[] }>;
};

const useSections = (chats?: Chat[]) => useMemo(() => {
  const sectionsMap = (chats || []).reduce<SectionMap>((map, chat) => {
    // get current chat latest message timestamp
    const { createdAt } = chat.messages[chat.messages.length - 1];
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
      data: Array.isArray(data) ? data.concat([chat]) : [chat],
    };

    return map;
  }, {});

  // return list of sections sorted by descending date
  return Object.values(sectionsMap).sort((a, b) => b.date - a.date);
}, [chats]);

export default useSections;
