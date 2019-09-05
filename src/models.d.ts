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

declare type RegistrationInfo = {
  type?: string;
  name?: string;
  surname?: string;
  zipCode?: string;
  medicalId?: string;
};

declare type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
};
