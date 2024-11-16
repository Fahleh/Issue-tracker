import { Skeleton } from '@/app/components';
import { Card, Flex } from '@radix-ui/themes';

const LoadingIssueDetailsPage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default LoadingIssueDetailsPage;
