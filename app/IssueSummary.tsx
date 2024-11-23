import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  statusCount: { open: number; inProgress: number; closed: number };
}

interface CardContainer {
  label: string;
  value: string;
  status: Status;
}
const IssueSummary = ({ statusCount: { open, inProgress, closed } }: Props) => {
  const containers = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
