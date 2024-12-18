import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { id } = await params;

  return await updateIssue(id, body);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  try {
    await prisma.issue.delete({
      where: { id: issue.id },
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete issue' },
      { status: 500 }
    );
  }
}

const updateIssue = async (id: string, body: any) => {
  const { title, description, status, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
  }

  // if (status !== typeof Status)

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title,
        description,
        status,
        assignedToUserId,
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
