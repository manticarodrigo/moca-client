export type User = {
  id: string;
  username: string;
  imageUrl: string;
};

export type Message = {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
};

export type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
};
