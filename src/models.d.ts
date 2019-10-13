declare type User = {
  id?: string;
  username?: string;
  imageUrl?: string;
  type?: 'patient' | 'caregiver';
  personalBio?: string;
  yearsOfExperience?: string;
  gender?: 'Male' | 'Female' | 'Other';
  status?: 'available' | 'busy';
  licenseNumber?: string;
  serviceArea?: string;
  interests?: string;
  pricePerThirtyMinutes?: string;
  pricePerSixtyMinutes?: string;
  pricePerNintyMinutes?: string;
  evaluationPrice?: string;
  certifications?: Certification[];
  reviewsNumber?: number;
  rating? : number;
  licenseDate? : Date;
  qualifications?: Array<string, boolean>;
};

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
