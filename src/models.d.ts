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

declare type RegistrationInformation = {
  type?: string;
  name?: string;
  surname?: string;
  zipCode?: string;
  medicalId?: string;
  email?: string;
  address?: {
    street: string;
    apartment: string;
  };
};

declare type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
};
