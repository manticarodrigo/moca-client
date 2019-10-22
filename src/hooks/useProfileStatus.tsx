import { useMemo } from 'react';

import { UserState } from '@src/store/reducers/UserReducer';

const useProfileStatus = (user: UserState) => useMemo(() => {
  const {
    type,
    // base
    gender,
    // therapist
    bio,
    prices,
    certDate,
    licenseNumber,
    operationRadius,
    payments,
  } = user;

  let profilePercent = 30;

  if (type === 'PA') {
    if (gender) profilePercent += 20;
    if (payments.length) profilePercent += 50;
  }

  if (type === 'PT') {
    if (gender) profilePercent += 5;
    if (bio) profilePercent += 5;
    if (prices.length) profilePercent += 10;
    if (certDate) profilePercent += 10;
    if (licenseNumber) profilePercent += 10;
    if (operationRadius) profilePercent += 10;
    if (payments) profilePercent += 10;
  }

  return profilePercent;
}, [user]);

export default useProfileStatus;
