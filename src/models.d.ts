declare type Certification = {
  id: string;
  description: string;
  attachmentURI: string;
}

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
