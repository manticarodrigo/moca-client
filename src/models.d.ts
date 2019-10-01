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

declare type RegistrationInformation = {
  type?: string;
  name?: string;
  surname?: string;
  medicalId?: string;
  email?: string;
  password?: string;
  addresses?: Array<string, string, string, string, string>;
  qualifications?: Array<string, boolean>; // to be changed later [add all types of checkBox items]
};

declare type Conversation = {
  id: string;
  participants: User[];
  messages: Message[];
};
