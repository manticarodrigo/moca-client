import { NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation';
import { theme } from '@src/theme';

export type Navigation = NavigationScreenProp<NavigationRoute, NavigationParams>;

type Theme = typeof theme;
type Colors = typeof theme.colors;

export type ThemeProps = {
  theme: Theme;
};

export type ThemeColors = keyof Colors;

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
