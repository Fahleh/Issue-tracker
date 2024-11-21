import { CustomLink, IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssuesToolbar from './IssuesToolbar';
import { Issue, Status } from '@prisma/client';
import Link from 'next/link';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';

interface FilterParams {
  status: Status;
  orderBy: keyof Issue;
  order: 'asc' | 'desc';
}

interface Props {
  searchParams: Promise<FilterParams>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const params = await searchParams;

  // prettier-ignore
  const { status, nextSortOrder, orderBy, sortOrderIcon } = useFilterAndSort(params);

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div>
      <IssuesToolbar />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Link
                  href={{
                    query: {
                      ...params,
                      orderBy: column.value,
                      order: nextSortOrder,
                    },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === params.orderBy && sortOrderIcon}
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
    </div>
  );
};

const useFilterAndSort = (searchParams: FilterParams) => {
  const statuses = Object.keys(Status);

  const result = searchParams.status;

  const status = statuses.includes(result) ? result : undefined;

  const currentSortOrder = searchParams.order || 'asc';
  const nextSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';

  const orderBy = searchParams.orderBy
    ? { [searchParams.orderBy]: nextSortOrder }
    : undefined;

  const sortOrderIcon =
    nextSortOrder === 'asc' ? (
      <ArrowUpIcon className="inline" />
    ) : (
      <ArrowDownIcon className="inline" />
    );

  return { status, nextSortOrder, orderBy, sortOrderIcon };
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
