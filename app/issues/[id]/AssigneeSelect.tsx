'use client';

import { Skeleton } from '@/app/components';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((response) => response.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <select name="" id="" className="border-2 rounded-md p-1 bg">
      <option value="">Assign...</option>
      <option value="" disabled>
        Suggestions
      </option>
      {users?.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default AssigneeSelect;
