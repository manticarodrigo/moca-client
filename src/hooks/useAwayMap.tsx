import { useMemo } from 'react';
import { format, eachDayOfInterval } from 'date-fns';

import { Leave } from '@src/services/openapi';

type AwayMap = { [key: string]: Leave[] }

const useAwayMap = (awayDays: Leave[]): AwayMap => useMemo(() => {
  const map = {};
  if (awayDays && Array.isArray(awayDays)) {
    awayDays.forEach((leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const range = eachDayOfInterval({ start, end });

      range.forEach((day) => {
        const key = format(day, 'yyyy-MM-dd');

        if (map[key]) {
          map[key].push(leave.id);
        } else {
          map[key] = [leave.id];
        }
      });
    });
  }
  return map;
}, [awayDays]);

export default useAwayMap;
