import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';
import { cache } from 'react';

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;

  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: { params: Promise<any> }) {
  const { id } = await params;

  const issue = await fetchIssue(parseInt(id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default EditIssuePage;
