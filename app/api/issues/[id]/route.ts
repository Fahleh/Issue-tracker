import { issueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { id } = await params;

  return await updateIssue(id, body);
}

const updateIssue = async (id: string, body: any) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedIssue);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to Update issue' },
      { status: 500 }
    );
  }
};
