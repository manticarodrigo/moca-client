declare type User = {
  id: string;
  username: string;
  imageUrl: string;
};

declare type Message = {
  id: string;
  sender: string;
  text: string;
  attachmentURI?: string;
  createdAt: string;
};

declare type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
};
