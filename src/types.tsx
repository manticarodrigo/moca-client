type User = {
  id: number;
  username: string;
};

type Message = {
  text: string;
  user: number;
  createdAt: string;
};

type MessageMeta = {
  text: string;
  user: number;
  createdAt: string;
};

export type MessagePage = {
  next?: string;
  previous?: string;
  count?: number;
  messages: Message[];
  participants: User[];
};

export type Chat = {
  id: string;
  otherParticipants: User[];
  latestMessage: MessageMeta;
};
