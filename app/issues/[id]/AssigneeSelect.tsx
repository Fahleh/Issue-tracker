'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChangeEvent } from 'react';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
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

  const assignIssue = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    axios.patch('/api/issues/' + issue.id, {
      assignedToUserId: value || null,
    });
  };

  return (
    <select
      onChange={assignIssue}
      defaultValue={issue.assignedToUserId || ''}
      name=""
      id=""
      className="border-2 rounded-md p-1 bg"
    >
      <option value="">Unassigned</option>
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
