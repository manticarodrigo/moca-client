import React, { useMemo } from 'react';
import { formatDistanceStrict } from 'date-fns';

import { UserState } from '@src/store/reducers/UserReducer';

import {
  RadiusLocationIcon,
  GenderIcon,
  CreditCardIcon,
  StatusIcon,
  RateIcon,
  InjuryIcon,
  QualificationIcon,
  Badge2Icon,
  BioIcon,
  InterestIcon,
} from '@src/components/icons';

import { Props as ProfileSection } from '@src/screens/ProfileScreen/ProfileListCard';

const SmallInjuryIcon = () => <InjuryIcon size={0.5} />;

const useProfileFields = (
  isTherapist: boolean,
  readonly: boolean,
  profile: UserState,
  onPressField: (key: keyof UserState) => () => void,
) => {
  const sections: ProfileSection[] = useMemo(() => {
    const {
      addresses = [],
      operationRadius = 10,
      status,
      reviewCount = 0,
      gender,
      bio,
      licenseNumber,
      certDate,
      certifications = [],
      preferredAilments = [],
      payments = [],
      awayDays = [],
      injuries = [],
    } = profile || {};

    const paymentsSubtitle = payments.length ? (
      (payments[0].paymentInfo.last4
        && `**** **** **** **** ${payments[0].paymentInfo.last4}`
      )
      || payments[0].paymentInfo.routingNumber
    ) : (isTherapist && 'Manage wallet') || 'Set Payment Info';

    const primaryAddress = addresses.find(({ primary }) => primary) || { street: '' };

    const therapistFirstRows: ProfileSection['rows'] = [
      {
        icon: RadiusLocationIcon,
        field: 'operationRadius',
        title: 'Service Area',
        subtitle: (operationRadius && `${operationRadius} Miles`)
          || (!readonly ? 'Add Radius' : 'N/A'),
        existingValue: !readonly && `${operationRadius}`,
        onPress: !readonly ? onPressField('operationRadius') : undefined,
      },
      {
        icon: StatusIcon,
        field: 'status',
        title: 'Status',
        subtitle: readonly && (status === 'A' ? 'Available' : 'Unavailable'),
        existingValue: !readonly ? status === 'A' : undefined,
        onPress: !readonly ? onPressField('status') : undefined,
      },
      {
        icon: StatusIcon,
        field: 'awayDays',
        title: 'Away Days',
        subtitle: `${awayDays.length} Scheduled Period(s)`,
        onPress: awayDays.length ? onPressField('awayDays') : undefined,
      },
      {
        icon: RateIcon,
        field: 'reviewCount',
        title: 'Reviews',
        subtitle: `${reviewCount.toString()} Review(s)`,
        onPress: reviewCount > 0 && onPressField('reviewCount'),
      },
    ];

    const patientFirstRows: ProfileSection['rows'] = [
      {
        icon: SmallInjuryIcon,
        field: 'injuries',
        title: 'My Injuries',
        subtitle: injuries.length
          ? `${injuries.length} injuries`
          : (!readonly && 'Add Injuries') || 'N/A',
        onPress: onPressField('injuries'),
      },
    ];

    let firstRows: ProfileSection['rows'] = [
      {
        icon: RadiusLocationIcon,
        field: 'addresses',
        title: 'Address',
        subtitle: primaryAddress.street || (!readonly ? 'Set active address' : 'N/A'),
        onPress: !readonly ? onPressField('addresses') : undefined,
      },
      ...(isTherapist ? therapistFirstRows : []),
      {
        icon: GenderIcon,
        field: 'gender',
        title: 'Gender',
        subtitle: (readonly && (gender === 'M' ? 'Male' : 'Female')) || undefined,
        existingValue: !readonly ? gender || '' : undefined,
        onPress: !readonly ? onPressField('gender') : undefined,
      },
      ...(!isTherapist ? patientFirstRows : []),
    ];

    // add filters to remove rows on readonly
    firstRows = readonly
      ? firstRows.filter(({ field }) => {
        switch (field) {
          case 'addresses':
            return false;
          case 'operationRadius':
            return false;
          case 'status':
            return false;
          case 'injuries':
            return false;
          default:
            return true;
        }
      })
      : firstRows;

    const middleRows: ProfileSection['rows'] = [
      {
        icon: BioIcon,
        field: 'bio',
        title: 'Personal Bio',
        subtitle: bio || (!readonly ? 'Set Personal Bio' : 'N/A'),
        onPress: !readonly ? onPressField('bio') : undefined,
      },
      {
        icon: Badge2Icon,
        field: 'licenseNumber',
        title: 'License Number',
        subtitle: licenseNumber || (!readonly ? 'Set License Number' : 'N/A'),
        onPress: (!licenseNumber && !readonly) ? onPressField('licenseNumber') : undefined,
      },
      {
        icon: InterestIcon,
        field: 'certDate',
        title: 'Years of Experience',
        subtitle: certDate ? formatDistanceStrict(new Date(certDate), new Date()) : undefined,
        existingValue: !certDate ? '' : undefined,
        onPress: (!certDate && !readonly) ? onPressField('certDate') : undefined,
      },
      {
        icon: QualificationIcon,
        field: 'preferredAilments',
        title: 'Preferred Treatment Areas',
        subtitle: preferredAilments.join(', ') || (!readonly ? 'Set Treatment Areas' : 'N/A'),
        onPress: !readonly ? onPressField('preferredAilments') : undefined,
      },
      {
        icon: QualificationIcon,
        field: 'certifications',
        title: 'Certifications',
        subtitle: certifications.length
          ? `${certifications.length} certification(s)`
          : (!readonly && 'Add Certifications') || 'N/A',
        onPress: onPressField('certifications'),
      },
    ];

    let lastRows: ProfileSection['rows'] = [
      {
        icon: CreditCardIcon,
        field: 'payments',
        title: 'Wallet',
        subtitle: paymentsSubtitle,
        onPress: !readonly ? onPressField('payments') : undefined,
      },
    ];

    // add filters to remove rows on readonly
    lastRows = readonly
      ? lastRows.filter(({ field }) => {
        switch (field) {
          case 'payments':
            return false;
          default:
            return true;
        }
      })
      : lastRows;

    const baseSections: ProfileSection[] = [
      {
        readonly,
        rows: firstRows,
      },
      ...(isTherapist ? [{ readonly, column: true, rows: middleRows }] : []),
      {
        readonly,
        rows: lastRows,
      },
    ];

    return baseSections;
  }, [readonly, profile]);

  return sections;
};

export default useProfileFields;
