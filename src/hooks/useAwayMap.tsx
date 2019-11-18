import { useMemo } from 'react';
import { format, eachDayOfInterval } from 'date-fns';

import { AwayPeriod } from '@src/services/openapi';

type AwayMap = { [key: string]: AwayPeriod[] }

const useAwayMap = (awayDays: AwayPeriod[]): AwayMap => useMemo(() => {
  const map = {};
  if (awayDays && Array.isArray(awayDays)) {
    awayDays.forEach((period) => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const range = eachDayOfInterval({ start, end });

      range.forEach((day) => {
        const key = format(day, 'yyyy-MM-dd');

        if (map[key]) {
          map[key].push(period.id);
        } else {
          map[key] = [period.id];
        }
      });
    });
  }
  return map;
}, [awayDays]);

export default useAwayMap;
