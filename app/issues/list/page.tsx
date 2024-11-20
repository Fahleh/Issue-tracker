import { CustomLink, IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssuesToolbar from './IssuesToolbar';
import { Status } from '@prisma/client';

interface Props {
  searchParams: Promise<{ status: Status }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.keys(Status);

  const result = (await searchParams).status;

  const status = statuses.includes(result) ? result : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div>
      <IssuesToolbar />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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

export const dynamic = 'force-dynamic';

export default IssuesPage;
