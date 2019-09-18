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

declare type Qualifications = '';

declare type RegistrationInformation = {
  type?: string;
  name?: string;
  surname?: string;
  zipCode?: string;
  medicalId?: string;
  email?: string;
  password?: string;
  address?: {
    street: string;
    apartmentNumber: string;
    city: string;
    state: string;
  };
  qualifications?: Array<string, boolean>; // to be changed later [add all types of checkBox items]
};

declare type Chat = {
  id: string;
  participants: User[];
  messages: Message[];
};
