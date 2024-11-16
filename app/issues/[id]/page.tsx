import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import Reactmarkdown from 'react-markdown';

interface Props {
  params: Promise<any>;
}
const IssueDetailsPage = async ({ params }: Props) => {
  const {id} = await params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  await delay(1000);

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <Reactmarkdown>{issue.description}</Reactmarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
