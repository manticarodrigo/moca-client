import { subDays } from 'date-fns';

import { User, Chat, Message } from '@src/types';

const mockUsernames = ['Adam Smith', 'David Hume', 'Ayn Rand', 'Jeremy Bentham'];
const mockMessages = ['Hey!', 'How are you?', 'Doing well, and you?', 'Doing great!'];
export const mockImg = 'https://www.chaarat.com/wp-content/uploads/2017/08/placeholder-user.png';


const _genId = () => `id-${Math.random().toString(36).substr(2, 16)}`;

const _genDaysBefore = (days: number) => subDays(new Date(), days).toString();

const _genRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

const _genParticipant = (username: string): User => ({
  username,
  id: _genId(),
  imageUrl: mockImg,
});

const _genMessage = (text: string, userId: string): Message => ({
  text,
  userId,
  id: _genId(),
  createdAt: _genDaysBefore(_genRandomInt(16)),
});

const _genChat = (username: string, currentUser: User): Chat => {
  const participants = [
    currentUser,
    _genParticipant(username),
  ];

  const participantIds = participants.map((user) => user.id);
  const randomId = participantIds[_genRandomInt(participants.length - 1)];

  const messages = mockMessages.map((message) => _genMessage(message, randomId));

  return {
    id: _genId(),
    participants,
    messages,
  };
};

export const fetchChats = async (currentUser: User) => (
  mockUsernames.map((username) => _genChat(username, currentUser))
);
