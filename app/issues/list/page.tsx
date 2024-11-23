import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssuesToolbar from './IssuesToolbar';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';

interface Props {
  searchParams: Promise<IssueQuery>;
}

let lastSortOrder: string | undefined;

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const status = Object.keys(Status).includes(params.status)
    ? params.status
    : undefined;

  const where = { status };

  const validSortOrder = params.order && ['asc', 'desc'].includes(params.order);

  const sortOrder = validSortOrder ? params.order : 'asc';

  lastSortOrder = params.order ? sortOrder : undefined;

  const orderBy = columnNames.includes(params.orderBy)
    ? { [params.orderBy]: sortOrder }
    : undefined;

  const sortBy = lastSortOrder && sortOrder === 'asc' ? 'desc' : 'asc';

  const page = parseInt(params.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssuesToolbar />
      <IssueTable
        params={params}
        issues={issues}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};

export default IssuesPage;
