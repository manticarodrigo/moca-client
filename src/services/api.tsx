// import axios from 'axios';

import { Chat, MessagePage } from '@src/types';

// const api = axios.create({
//   baseURL: `http://localhost:8000/api/`,
//   headers: {
//     Authorization: 'Token a9886093415439ff273274c966c34f1dd35272d7',
//   },
// });

export const fetchChats = async () => {
  // const { data } = await api.get('chat/');

  const data: Chat[] = [
    {
      id: '1',
      otherParticipants: [
        {
          id: 1,
          username: 'Billy Bob',
        },
      ],
      latestMessage: {
        text: 'Hello world!',
        user: 1,
        createdAt: '18/11/2019',
      },
    },
  ];

  return data;
};

export const fetchChat = async (id: string) => {
  // const { data } = await api.get(`chat/${id}/`);

  const data: MessagePage = {
    messages: [
      {
        user: 1,
        text: 'Hello World!',
        createdAt: '18/11/2019',
      },
    ],
    participants: [
      {
        id: 1,
        username: 'Billy Bob',
      },
      {
        id: 2,
        username: 'Randy Thorne',
      },
    ],
  };

  return data;
};
