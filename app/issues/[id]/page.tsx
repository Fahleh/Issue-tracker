import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import delay from 'delay';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import IssueStatusToggleButton from './IssueStatusToggleButton';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailsPage = async ({ params }: RouteParams) => {
  const session = await getServerSession(authOptions);

  const { id } = await params;

  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  await delay(1000);

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
            <IssueStatusToggleButton issueId={issue.id} status={issue.status} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: RouteParams) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default IssueDetailsPage;
