import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  statusCount: { open: number; inProgress: number; closed: number };
}

interface CardContainer {
  label: string;
  value: number;
  status: Status;
}
const IssueSummary = ({ statusCount: { open, inProgress, closed } }: Props) => {
  const containers: CardContainer[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="4" justify="between">
      {containers.map((container) => (
        <Link
          key={container.label}
          href={`/issues/list?status=${container.status}`}
          className="flex flex-col items-center text-md font-medium rounded-md hover:shadow-md hover:bg-zinc-300 mb-3"
        >
          <Card className="w-44 h-32 ">
            <Flex
              direction="column"
              gap="1"
              align="center"
              justify="center"
              className=" h-full"
            >
              {container.label}
              <Text size="8" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummary;
