'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>('/api/users');

      if (data) setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <select name="" id="" className='border-2 rounded-md p-1 bg'>
      <option value="">Assign...</option>
      {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
    </select>
    //  <p></p>
    // <Select.Root>
    //   <Select.Trigger />
    //   <Select.Content>
    //     <Select.Group>
    //       <Select.Item value="placeholder" disabled>
    //         Assign..
    //       </Select.Item>
    //       <Select.Label>Suggestions</Select.Label>
    //       {users.map((user) => (
    //         <Select.Item key={user.id} value={user.id}>
    //           {user.name}
    //         </Select.Item>
    //       ))}
    //     </Select.Group>
    //   </Select.Content>
    // </Select.Root>
  );
};

export default AssigneeSelect;
