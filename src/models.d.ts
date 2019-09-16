declare type User = {
  id: string;
  username: string;
  imageUrl: string;
};

declare type Message = {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
};

declare type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
};
