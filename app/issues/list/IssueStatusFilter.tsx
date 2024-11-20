'use client';

import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

const IssueStatusFilter = () => {
  const router = useRouter();

  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const filterByStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;

    const query = status ? `?status=${status}` : '';
    router.push(`/issues/list${query} `);
  };

  return (
    <select
      onChange={filterByStatus}
      name="filter"
      id="filter-select"
      className="border-2 rounded-md p-1 bg"
      defaultValue="-"
    >
      <option value="-" disabled>
        Filter by status...
      </option>
      {statuses.map((status) => (
        <option key={status.value || '-'} value={status.value || ''}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default IssueStatusFilter;
