import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';


const EditIssuePage = async ({ params }: { params: Promise<any> }) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: { params: Promise<any> }) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id

  }
}

export default EditIssuePage;
