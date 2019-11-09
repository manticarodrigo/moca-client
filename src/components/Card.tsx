import React, { useMemo } from 'react';

import {
  AddCardIcon,
  ArrowRightIcon,
  CheckedIcon,
  AmexIcon,
  MaestroIcon,
  MasterCardIcon,
  VisaIcon,
  ChangePasswordIcon,
  NotificationsIcon,
  BookmarkIcon,
  InviteFriendsIcon,
  TermsAndConditionsIcon,
  SupportAndFeedbackIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  BuildingIcon,
} from '@src/components/icons';

import Text from './Text';
import View from './View';

type CardProps = {
  type: string;
  title?: string;
  details?: string;
  arrow?: boolean;
  large?: boolean;
  children?: JSX.Element | JSX.Element[];
  onPress?: () => void;
  selected?: boolean;
}

const Card = ({ type, title, arrow, details, large, onPress, selected }: CardProps) => {
  const { icon, text } = useMemo(() => {
    switch (type) {
      case 'Unknown':
        return { icon: <MaestroIcon />, text: title || null };
      case 'American Express':
        return { icon: <AmexIcon />, text: title || null };
      case 'MasterCard':
        return { icon: <MasterCardIcon />, text: title || null };
      case 'Visa':
        return { icon: <VisaIcon />, text: title || null };
      case 'bankAccount':
        return { icon: <BuildingIcon />, text: title || null };
      case 'addCard':
        return { icon: <AddCardIcon />, text: 'Add New Stripe Account' };
      case 'changePassword':
        return { icon: <ChangePasswordIcon />, text: 'Change Password' };
      case 'notifications':
        return { icon: <NotificationsIcon />, text: 'Reminders / Notifications' };
      case 'bookmark':
        return { icon: <BookmarkIcon />, text: 'Bookmarked Therapist' };
      case 'inviteFriends':
        return { icon: <InviteFriendsIcon />, text: 'Invite Your Friends' };
      case 'supportAndFeedback':
        return { icon: <SupportAndFeedbackIcon />, text: 'Support & Feedback' };
      case 'frequentQuestions':
        return { icon: <SupportAndFeedbackIcon />, text: 'Frequently Asked Questions' };
      case 'TermsAndConditions':
        return { icon: <TermsAndConditionsIcon />, text: 'Terms & Conditions' };
      case 'join':
        return { icon: <SupportAndFeedbackIcon />, text: 'Take me to MOCA\'s Homepage' };
      case 'facebook':
        return { icon: <FacebookIcon />, text: 'Follow on Facebook' };
      case 'twitter':
        return { icon: <TwitterIcon />, text: 'Follow on Twitter' };
      case 'instagram':
        return { icon: <InstagramIcon />, text: 'Follow on Instagram' };
      default:
        return null;
    }
  }, [type, title]);

  return (
    <View
      row
      justifyBetween
      p={large ? 3 : 2}
      variant="borderBottom"
      width="100%"
      height={large ? 80 : 60}
      bgColor="white"
      onPress={onPress}
    >
      <View row>
        <View m={2}>
          {icon}
        </View>
        <View column justifyCenter={!details} mr={5} ml={3}>
          <Text variant={large ? 'semiBold' : 'regularDark'}>
            {text}
          </Text>
          {details && (
            <Text variant="light" size={2} color="grey" mt={1}>
              {details}
            </Text>
          )}
        </View>
      </View>
      {arrow
        && (
          <View m={3} pb={!large ? 3 : undefined}>
            <ArrowRightIcon />
          </View>
        )}
      {selected
        && (
          <View m={2}>
            <CheckedIcon />
          </View>
        )}
    </View>
  );
};

export default Card;
