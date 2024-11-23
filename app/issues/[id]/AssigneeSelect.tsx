'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChangeEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  const toastOptions = {
    success: {
      style: {
        background: '#32CD32',
        color: 'white',
      },
    },
    error: {
      style: {
        background: '#dc3545',
        color: 'white',
      },
    },
  };

  const assignIssue = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: value || null,
      })
      .then(() => toast.success(`Issue assigned successfully.`))
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <>
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
      <Toaster toastOptions={toastOptions} />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((response) => response.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
