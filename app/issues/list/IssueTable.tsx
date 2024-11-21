import { CustomLink, IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order: 'asc' | 'desc';
  page: string;
}

type SortBy = 'asc' | 'desc';

interface Props {
  params: IssueQuery;
  issues: Issue[];
  sortBy: SortBy;
  sortOrder: SortBy;
}

const IssueTable = ({ params, issues, sortBy, sortOrder }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    ...params,
                    orderBy: column.value,
                    order: sortBy,
                  },
                }}
              >
                {column.label}
              </Link>
              {column.value === params.orderBy &&
                (sortOrder === 'asc' ? (
                  <ArrowUpIcon className="inline" />
                ) : (
                  <ArrowDownIcon className="inline" />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <CustomLink href={`${issue.id}`}>{issue.title}</CustomLink>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
