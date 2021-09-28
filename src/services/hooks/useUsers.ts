import { useQuery, UseQueryOptions } from 'react-query';
import { api } from './../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

// "tipagem" de getUsers(): Promise devido a function ser async e tipo User[]
export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

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
  return { users, totalCount };
}

export function useUsers(page: number, options: UseQueryOptions) {
  // a query é armazenada no cache
  // stale while revalidate
  return useQuery(
    ['users', page],
    () => getUsers(page),
    // data remains stable for 10 minutes, then stale
    { staleTime: 1000 * 60 * 10, ...options }
  );
}
