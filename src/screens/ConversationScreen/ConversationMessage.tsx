
import React from 'react';

import { Message } from '@src/store/reducers/ConversationReducer';
import { UserSnippet } from '@src/services/openapi';

import MessageCard from '@src/components/MessageCard';
import AppointmentInfoCard from '@src/components/AppointmentInfoCard';
import AppointmentRequestCard from '@src/components/AppointmentRequestCard';

type Props = {
  message: Message;
  otherUser: UserSnippet;
  alignRight: boolean;
  onPressImage: (uri: string) => void;
};

const ConversationMessage = ({ message, otherUser, alignRight, onPressImage }: Props) => {
  const handlePressImage = () => onPressImage(message.content.image);

  if (message.type === 'appointment-request') {
    if (message.content.status === 'accepted') {
      return <AppointmentInfoCard message={message} otherUser={otherUser} />;
    }

    return <AppointmentRequestCard message={message} otherUser={otherUser} />;
  }

  return (
    <MessageCard
      message={message}
      alignRight={alignRight}
      onPressImage={handlePressImage}
    />
  );
};

export default ConversationMessage;
