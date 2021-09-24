import { useQuery } from 'react-query';
import { api } from './../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// "tipagem" de getUsers(): Promise devido a function ser async e tipo User[]
export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('users');

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });
  return users;
}

export function useUsers() {
  // a query é armazenada no cache
  // stale while revalidate
  return useQuery(
    'users',
    getUsers,
    // data remains stable for 5 seconds, then stale
    { staleTime: 1000 * 5 }
  );
}
