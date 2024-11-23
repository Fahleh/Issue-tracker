'use client';

import { Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();

  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const filterByStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;

    if (status) params.append('status', status);
    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!);

    const query = params.size ? '?' + params.toString() : '';
    router.push(`/issues/list${query} `);
  };

  return (
    <select
      onChange={filterByStatus}
      name="filter"
      id="filter-select"
      className="border-2 rounded-md p-1 w-16 md:w-fit"
      defaultValue={searchParams.get('status') || '-'}
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
